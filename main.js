require('./settings')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const { color } = require('./lib/color')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const _ = require('lodash')
const { nocache } = require('./lib/loader')
const yargs = require('yargs/yargs')
const { Low, JSONFile } = require('./lib/lowdb')
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, getBuffer, getSizeMedia, sleep } = require('./lib/myfunc')
const {
  default: makeWASocket,
  delay,
  PHONENUMBER_MCC,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  Browsers,
} = require('@whiskeysockets/baileys')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (q) => new Promise(res => rl.question(q, res))

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(new JSONFile(`src/database.json`))

global.loadDatabase = async () => {
  if (global.db.data) return
  await global.db.read()
  global.db.data = {
    users: {},
    chats: {},
    settings: {},
    ...(global.db.data || {})
  }
}
loadDatabase()

setInterval(async () => {
  if (global.db.data) await global.db.write()
}, 30 * 1000)

require('./nexwrld.js')
nocache('../nexwrld.js') // 🔕 no log anymore

/* ---------------- PAIRING FIX ---------------- */
let phoneNumber = null
const pairingCode = process.argv.includes('--pairing-code')
const useMobile = process.argv.includes('--mobile')
/* --------------------------------------------- */

async function startSession () {
  const store = makeInMemoryStore({ logger: pino({ level: 'silent' }) })
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    browser: Browsers.windows('Firefox'),
    logger: pino({ level: 'fatal' }),
    printQRInTerminal: false,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true
  })

  store.bind(sock.ev)
  sock.ev.on('creds.update', saveCreds)

  /* -------- PAIRING INPUT (NO OWNER AUTO) -------- */
  if (pairingCode && !sock.authState.creds.registered) {
    if (useMobile) throw new Error('Cannot use pairing code with mobile api')

    let input = await question(
      chalk.greenBright('Enter WhatsApp number (with country code): ')
    )
    input = input.replace(/[^0-9]/g, '')

    if (!Object.keys(PHONENUMBER_MCC).some(v => input.startsWith(v))) {
      console.log(chalk.red('Invalid country code'))
      process.exit(1)
    }

    setTimeout(async () => {
      const code = await sock.requestPairingCode(input)
      console.log(chalk.bgGreen.black('PAIR CODE:'), chalk.white(code.match(/.{1,4}/g).join('-')))
    }, 2000)
  }
  /* ---------------------------------------------- */

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log(color('🌿 Connected', 'green'))
    }

    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
      if (reason !== DisconnectReason.loggedOut) startSession()
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const m = smsg(sock, msg, store)
    require('./nexwrld')(sock, m, messages, store)
  })

  return sock
}

startSession()

process.on('uncaughtException', err => {
  if (!String(err).includes('Timed Out')) console.log(err)
})