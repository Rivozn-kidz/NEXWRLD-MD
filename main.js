require('./settings')

const fs = require('fs')
const path = require('path')
const pino = require('pino')
const chalk = require('chalk')
const axios = require('axios')
const _ = require('lodash')
const moment = require('moment-timezone')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const NodeCache = require('node-cache')
const readline = require('readline')
const yargs = require('yargs/yargs')

const { Boom } = require('@hapi/boom')
const { Low, JSONFile } = require('./lib/lowdb')
const { color } = require('./lib/color')
const { nocache } = require('./lib/loader')
const { smsg, getBuffer, getSizeMedia, sleep } = require('./lib/myfunc')

const {
 default: makeWASocket,
 useMultiFileAuthState,
 fetchLatestBaileysVersion,
 DisconnectReason,
 Browsers,
 proto,
 generateForwardMessageContent,
 generateWAMessageFromContent,
 downloadContentFromMessage
} = require('@whiskeysockets/baileys')

/* ================= DATABASE ================= */

global.db = new Low(new JSONFile('./src/database.json'))
global.loadDatabase = async () => {
 if (global.db.data) return
 await global.db.read()
 global.db.data ||= { users:{}, chats:{}, settings:{} }
}
loadDatabase()

setInterval(async () => {
 if (global.db.data) await global.db.write()
}, 30_000)

/* ================= CLI ================= */

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = q => new Promise(r => rl.question(q, r))

/* ================= SOCKET ================= */

async function startSession () {
 const store = new NodeCache()

 const { state, saveCreds } = await useMultiFileAuthState('./session')
 const { version } = await fetchLatestBaileysVersion()

 const sock = makeWASocket({
  version,
  auth: state,
  browser: Browsers.windows('Firefox'),
  logger: pino({ level: 'silent' }),
  printQRInTerminal: false
 })

 sock.ev.on('creds.update', saveCreds)

 /* ============ CONNECTION ============ */

 sock.ev.on('connection.update', async (u) => {
  const { connection, lastDisconnect } = u

  if (connection === 'close') {
   const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
   console.log('Disconnected:', reason)
   startSession()
  }

  if (connection === 'open') {
   console.log(color('🌿 CONNECTED SUCCESSFULLY', 'green'))
   await sock.sendMessage(sock.user.id, {
    text: `╭── NEXWRLD-MD
├ User: ${sock.user.name}
├ Platform: ${process.platform}
└ Connected`
   })
  }
 })

 /* ============ MESSAGES ============ */

 sock.ev.on('messages.upsert', async ({ messages }) => {
  try {
   const m = messages[0]
   if (!m.message) return
   const msg = smsg(sock, m)
   require('./nexwrld')(sock, msg)
  } catch (e) {
   console.log(e)
  }
 })

 /* ============ GROUP EVENTS ============ */

 sock.ev.on('group-participants.update', async (anu) => {
  try {
   if (!global.welcome) return
   const meta = await sock.groupMetadata(anu.id)
   const user = anu.participants[0]
   const name = user.split('@')[0]

   const text =
    anu.action === 'add'
     ? `👋 Welcome @${name} to *${meta.subject}*`
     : `👋 Goodbye @${name}`

   await sock.sendMessage(anu.id, {
    text,
    mentions: [user]
   })
  } catch {}
 })

 /* ============ CALL BLOCK ============ */

 sock.ev.on('call', async (calls) => {
  if (!global.anticall) return
  for (const c of calls) {
   if (c.status === 'offer') {
    await sock.sendMessage(c.from, {
     text: `❌ Calls not allowed. You will be blocked.`
    })
    await sleep(5000)
    await sock.updateBlockStatus(c.from, 'block')
   }
  }
 })

 /* ============ HELPERS ============ */

 sock.decodeJid = jid =>
  jid?.includes(':')
   ? jid.split(':')[0] + '@' + jid.split('@')[1]
   : jid

 sock.getName = jid =>
  PhoneNumber('+' + jid.replace('@s.whatsapp.net','')).getNumber('international')

 sock.sendText = (jid, text, quoted) =>
  sock.sendMessage(jid, { text }, { quoted })

 sock.sendImage = async (jid, img, cap='', quoted) => {
  const buff = Buffer.isBuffer(img) ? img : await getBuffer(img)
  return sock.sendMessage(jid, { image: buff, caption: cap }, { quoted })
 }

 return sock
}

/* ================= HOT RELOAD ================= */

nocache('./nexwrld.js', () =>
 console.log(color('[ UPDATE ] nexwrld.js', 'green'))
)

/* ================= START ================= */

startSession().catch(console.error)

process.on('uncaughtException', err => {
 if (String(err).includes('conflict')) return
 console.log('ERROR:', err)
})