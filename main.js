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
const { uncache, nocache } = require('./lib/loader')
const yargs = require('yargs/yargs')
const { Low, JSONFile } = require('./lib/lowdb')
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc')
const { default: nebulamdConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers } = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(new JSONFile(`src/database.json`))

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? (global.loadDatabase()) : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    database: {},
    chats: {},
    game: {},
    settings: {},
    message: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

if (global.db) setInterval(async () => {
   if (global.db.data) await global.db.write()
}, 30 * 1000)

require('./nebula.js')
nocache('../nebula.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

let phoneNumber = typeof global.botnumber !== 'undefined' && global.botnumber ? String(global.botnumber) : null
let owner = JSON.parse(fs.readFileSync('./src/data/role/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

async function cleanupOldMessages(store, maxAgeHours = 24, maxMessagesPerChat = 100) {
    if (!store || typeof store.messages !== 'object') {
        console.log(color('[CLEANUP]', 'yellow'), 'Store not initialized or invalid');
        return;
    }

    const now = Date.now();
    const maxAgeMs = maxAgeHours * 60 * 60 * 1000;
    let totalCleaned = 0;
    let chatsCleaned = 0;

    try {
        for (const [jid, messages] of Object.entries(store.messages)) {
            if (!Array.isArray(messages)) continue;
            const oldMessagesCount = messages.filter(msg => {
                const msgAge = now - (msg.messageTimestamp ? msg.messageTimestamp * 1000 : now);
                return msgAge > maxAgeMs;
            }).length;

            if (messages.length > maxMessagesPerChat) {
                store.messages[jid] = messages.slice(-maxMessagesPerChat);
                totalCleaned += messages.length - maxMessagesPerChat;
                chatsCleaned++;
            } else if (oldMessagesCount > 0) {
                store.messages[jid] = messages.filter(msg => {
                    const msgAge = now - (msg.messageTimestamp ? msg.messageTimestamp * 1000 : now);
                    return msgAge <= maxAgeMs;
                });
                totalCleaned += oldMessagesCount;
                chatsCleaned++;
            }
        }

        if (totalCleaned > 0) {
            console.log(color('[CLEANUP]', 'green'), 
                `Cleaned ${totalCleaned} old messages from ${chatsCleaned} chats`);
        }
    } catch (err) {
        console.log(color('[CLEANUP ERROR]', 'red'), err.message);
    }
}

async function startSession() {
  const store = makeInMemoryStore({
    logger: pino().child({
      level: 'silent',
      stream: 'store'
    })
  })

  const { state, saveCreds } = await useMultiFileAuthState(`./session`)
  let { version, isLatest } = await fetchLatestBaileysVersion()
  const getMessage = async (key) => {
    if (store) {
      try {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message || undefined
      } catch (err) {
        try {
          const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
          return msg?.message || undefined
        } catch (e) {
          return { conversation: "ᴅᴇᴅɪᴄᴀᴛᴇᴅ ᴛᴏ Fᴀʀɪᴅᴀʜ🧝" }
        }
      }
    }
    return {
      conversation: "ᴅᴇᴅɪᴄᴀᴛᴇᴅ ᴛᴏ Fᴀʀɪᴅᴀʜ🧝"
    }
  }
  
  const connectionOptions = {
    version,
    isLatest,
    getMessage,
    keepAliveIntervalMs: 30000,
    printQRInTerminal: false,
    logger: pino({ level: "fatal" }),
    auth: state,
    browser: Browsers.windows('Firefox'), 
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    defaultQueryTimeoutMs: undefined,
  }

  const nebulamd = makeWASocket(connectionOptions)
  
  store.bind(nebulamd.ev)

  const CLEANUP_INTERVAL = 6 * 60 * 60 * 1000;
  setInterval(() => {
    cleanupOldMessages(store, 24, 100); 
  }, CLEANUP_INTERVAL);

  setTimeout(() => {
    cleanupOldMessages(store, 24, 100);
  }, 10000); 

  nebulamd.ev.on('creds.update', saveCreds)

  if (pairingCode && !nebulamd.authState?.creds?.registered) {
    if (useMobile) throw new Error('Cannot use pairing code with mobile api')

    let phoneNumberInput = phoneNumber
    if (!phoneNumberInput) {
      
      phoneNumberInput = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +2567*** : .`)))
      phoneNumberInput = phoneNumberInput.replace(/[^0-9]/g, '')
    } else {
  
      phoneNumberInput = phoneNumberInput.replace(/[^0-9]/g, '')
    }

    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumberInput.startsWith(v))) {
      console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number:")))
      
      if (!phoneNumber) {
        phoneNumberInput = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : .`)))
        phoneNumberInput = phoneNumberInput.replace(/[^0-9]/g, '')
      } else {
        
        process.exit(0)
      }
    }

    setTimeout(async () => {
      try {
        let code = await nebulamd.requestPairingCode(phoneNumberInput)
        code = code?.match(/.{1,4}/g)?.join("-") || code
        console.log(chalk.black(chalk.bgGreen(`Your nebula Pairing Code : `)), chalk.black(chalk.white(code)))
      } catch (err) {
        console.error('Failed to request pairing code:', err)
      }
    }, 3000)
  }

  nebulamd.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update
    try {
      if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
        if (reason === DisconnectReason.badSession) {
          console.log(`Bad Session File, Please Delete Session and Scan Again`);
          startSession()
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
          startSession();
        } else if (reason === DisconnectReason.connectionLost) {
          console.log("Connection Lost from Server, reconnecting...");
          startSession();
        } else if (reason === DisconnectReason.connectionReplaced) {
          console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
          startSession()
        } else if (reason === DisconnectReason.loggedOut) {
          console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
          startSession();
        } else if (reason === DisconnectReason.restartRequired) {
          console.log("Restart Required, Restarting...");
          startSession();
        } else if (reason === DisconnectReason.timedOut) {
          console.log("Connection TimedOut, Reconnecting...");
          startSession();
        } else nebulamd.end(`Unknown DisconnectReason: ${reason}|${connection}`)
      }
      if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
        console.log(color(`\n🌿Connecting...`, 'yellow'))
      }
      if (update.connection == "open" || update.receivedPendingNotifications == "true") {
        console.log(color(` `,'magenta'))
        console.log(color(`🌿Connected to => ` + JSON.stringify(nebulamd.user, null, 2), 'yellow'))
      

        try {
            await nebulamd.sendMessage(nebulamd.user.id, { 
                text: `

╭──⧼♛ *NEBULA MD V1* ♛ ⧽──≽
│┃友 🧝 Username: ${nebulamd.user.name}
│┃友 🧝 Platform: ${process.platform}
│┃友 🧝 Owner: Ridz Coder 
│┃友 🧝 Prefix: [ ${global.prefix || '.'} ]
│┃友 🧝 Mode: ${global.opts.mode || 'public'}
│┃友 🧝 Version: [ ${require('./package.json').version || '1.0.0'} ]
┕──────────────────────❒
> *ᴅᴇᴅɪᴄᴀᴛᴇᴅ ᴛᴏ Fᴀʀɪᴅᴀʜ🧝*` 
            }, { ephemeralExpiration: 20 });
        } catch (err) {
            console.log('Failed to send startup message:', err);
        }
      }
    } catch (err) {
      console.log('Error in Connection.update '+err)
      startSession()
    }
  })

  nebulamd.ev.on("messages.upsert",  () => { })

  nebulamd.ev.on('group-participants.update', async (anu) => {
    if (global.welcome){
      console.log(anu)
      try {
        let metadata = await nebulamd.groupMetadata(anu.id)
        let participants = anu.participants
        for (let num of participants) {
          try {
            ppuser = await nebulamd.profilePictureUrl(num, 'image')
          } catch (err) {
            ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
          }
          try {
            ppgroup = await nebulamd.profilePictureUrl(anu.id, 'image')
          } catch (err) {
            ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
          }
         
          memb = metadata.participants.length
          kayinzaWlcm = await getBuffer(ppuser)
          kayinzaLft = await getBuffer(ppuser)
          if (anu.action == 'add') {
            const kayinzabuffer = await getBuffer(ppuser)
            let kayinzaName = num
            const xtime = moment.tz('Africa/Kampala').format('HH:mm:ss')
            const xdate = moment.tz('Africa/Kampala').format('DD/MM/YYYY')
            const xmembers = metadata.participants.length
            kayinzabody = `
╭──⧼♛ *NEBULA MD WELCOME YOU 👋* ♛ ⧽──≽
│┃友  @${kayinzaName.split("@")[0]}  」
│┃友  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 
│┃友  ${metadata.subject}
│┃友  𝗠𝗲𝗺𝗯𝗲𝗿 : 
│┃友 ${xmembers}th
│┃友  𝗝𝗼𝗶𝗻𝗲𝗱 : 
│┃友${xtime} ${xdate}
┕────────────────────────≽
> *ᴅᴇᴅɪᴄᴀᴛᴇᴅ ᴛᴏ Fᴀʀɪᴅᴀʜ🧝*`
            let msgs = generateWAMessageFromContent(anu.id, {
              viewOnceMessage: {
                message: {
                  "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: kayinzabody
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: botname
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...await prepareWAMessageMedia({ image: kayinzaWlcm }, { upload: nebulamd.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{
                        "name": "quick_reply",
                        "buttonParamsJson": `{\"display_text\":\"Welcome 💐\",\"id\":\"\"}`
                      }],
                    }),
                    contextInfo: {
                      mentionedJid: [num],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363404529319592@newsletter',
                        newsletterName: ownername,
                        serverMessageId: 143
                      }
                    }
                  })
                }
              }
            }, {})
            nebulamd.relayMessage(anu.id, msgs.message, {})
          } else if (anu.action == 'remove') {
            const kayinzabuffer = await getBuffer(ppuser)
            const kayinzatime = moment.tz('Africa/Kampala').format('HH:mm:ss')
            const kayinzadate = moment.tz('Africa/Kampala').format('DD/MM/YYYY')
            let kayinzaName = num
            const kayinzamembers = metadata.participants.length
            kayinzabody = `
╭──⧼♛ *NEBULA MD SAYS GOODBYE* ♛ ⧽──≽
│┃友 @${kayinzaName.split("@")[0]}  」
│┃友  𝗟𝗲𝗳𝘁 
│┃友 ${metadata.subject}
│┃友  𝗠𝗲𝗺𝗯𝗲𝗿 : 
│┃友 ${kayinzamembers}th
│┃友  𝗧𝗶𝗺𝗲 : 
│┃友${kayinzatime} ${kayinzadate}
┕─────────────────────≽
   > *ᴅᴇᴅɪᴄᴀᴛᴇᴅ ᴛᴏ Fᴀʀɪᴅᴀʜ🧝*`
            let msgs = generateWAMessageFromContent(anu.id, {
              viewOnceMessage: {
                message: {
                  "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: kayinzabody
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: botname
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...await prepareWAMessageMedia({ image: kayinzaLft }, { upload: nebulamd.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{
                        "name": "quick_reply",
                        "buttonParamsJson": `{\"display_text\":\"Goodbye 👋\",\"id\":\"\"}`
                      }],
                    }),
                    contextInfo: {
                      mentionedJid: [num],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363404529319592@newsletter',
                        newsletterName: ownername,
                        serverMessageId: 143
                      }
                    }
                  })
                }
              }
            }, {})
            nebulamd.relayMessage(anu.id, msgs.message, {})
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  })

  
  nebulamd.ev.on('call', async (kayinzaPapa) => {
    if (global.anticall){
      console.log(kayinzaPapa)
      for (let kayinzaFucks of kayinzaPapa) {
        if (kayinzaFucks.isGroup == false) {
          if (kayinzaFucks.status == "offer") {
            let kayinzaBlokMsg = await nebulamd.sendTextWithMentions(kayinzaFucks.from, `*${nebulamd.user.name}* can't receive ${kayinzaFucks.isVideo ? `video` : `voice` } call. Sorry @${kayinzaFucks.from.split('@')[0]} you will be blocked. If called accidentally please contact the owner to be unblocked !`)
            nebulamd.sendContact(kayinzaFucks.from, owner, kayinzaBlokMsg)
            await sleep(8000)
            await nebulamd.updateBlockStatus(kayinzaFucks.from, "block")
          }
        }
      }
    }
  })

  // autostatus view
  nebulamd.ev.on('messages.upsert', async chatUpdate => {
    if (global.antiswview){
      mek = chatUpdate.messages[0]
      if (mek.key && mek.key.remoteJid === 'status@broadcast') {
        await nebulamd.readMessages([mek.key])
      }
    }
  })

  // admin event
  nebulamd.ev.on('group-participants.update', async (anu) => {
    if (global.adminevent){
      console.log(anu)
      try {
        let participants = anu.participants
        for (let num of participants) {
          try {
            ppuser = await nebulamd.profilePictureUrl(num, 'image')
          } catch (err) {
            ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
          }
          try {
            ppgroup = await nebulamd.profilePictureUrl(anu.id, 'image')
          } catch (err) {
            ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
          }
          if (anu.action == 'promote') {
            const kayinzatime = moment.tz('Africa/Kampala').format('HH:mm:ss')
            const kayinzadate = moment.tz('Africa/Kampala').format('DD/MM/YYYY')
            let kayinzaName = num
            kayinzabody = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @${kayinzaName.split("@")[0]}, you have been *promoted* to *admin* 🥳`
            nebulamd.sendMessage(anu.id,
              { text: kayinzabody,
                contextInfo:{
                  mentionedJid:[num],
                  "externalAdReply": {"showAdAttribution": true,
                    "containsAutoReply": true,
                    "title": ` ${global.botname}`,
                    "body": `${ownername}`,
                    "previewType": "PHOTO",
                    "thumbnailUrl": ``,
                    "thumbnail": kayinzaWlcm,
                    "sourceUrl": `${wagc}`}}})
          } else if (anu.action == 'demote') {
            const kayinzatime = moment.tz('Africa/Kampala').format('HH:mm:ss')
            const kayinzadate = moment.tz('Africa/Kampala').format('DD/MM/YYYY')
            let kayinzaName = num
            kayinzabody = `𝗢𝗼𝗽𝘀‼️ @${kayinzaName.split("@")[0]}, you have been *demoted* from *admin* 😬`
            nebulamd.sendMessage(anu.id,
              { text: kayinzabody,
                contextInfo:{
                  mentionedJid:[num],
                  "externalAdReply": {"showAdAttribution": true,
                    "containsAutoReply": true,
                    "title": ` ${global.botname}`,
                    "body": `${ownername}`,
                    "previewType": "PHOTO",
                    "thumbnailUrl": ``,
                    "thumbnail": kayinzaLft,
                    "sourceUrl": `${wagc}`}}})
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  })

  // detect group update
  nebulamd.ev.on("groups.update", async (json) => {
    if (global.groupevent) {
      try {
        console.log(json)
        const res = json[0]
        if (res.announce == true) {
          await sleep(2000)
          nebulamd.sendMessage(res.id, {
            text: `「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admins can send messages !`,
          })
        } else if (res.announce == false) {
          await sleep(2000)
          nebulamd.sendMessage(res.id, {
            text: `「 Group Settings Change 」\n\nThe group has been opened by admin, Now participants can send messages !`,
          })
        } else if (res.restrict == true) {
          await sleep(2000)
          nebulamd.sendMessage(res.id, {
            text: `「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !`,
          })
        } else if (res.restrict == false) {
          await sleep(2000)
          nebulamd.sendMessage(res.id, {
            text: `「 Group Settings Change 」\n\nGroup info has been opened, Now participants can edit group info !`,
          })
        } else if(!res.desc == ''){
          await sleep(2000)
          nebulamd.sendMessage(res.id, { 
            text: `「 Group Settings Change 」\n\n*Group description has been changed to*\n\n${res.desc}`,
          })
        } else {
          await sleep(2000)
          nebulamd.sendMessage(res.id, {
            text: `「 Group Settings Change 」\n\n*Group name has been changed to*\n\n*${res.subject}*`,
          })
        } 
      } catch (err) {
        console.log(err)
      }
    }
  })

  // respon cmd pollMessage
  async function getMessageFromStore(key){
    if (store) {
      const msg = await store.loadMessage(key.remoteJid, key.id)
      return msg?.message
    }
    return {
      conversation: "ᴅᴇᴅɪᴄᴀᴛᴇᴅ ᴛᴏ Fᴀʀɪᴅᴀʜ🧝"
    }
  }
  nebulamd.ev.on('messages.update', async chatUpdate => {
    for(const { key, update } of chatUpdate) {
      if(update.pollUpdates && key.fromMe) {
        const pollCreation = await getMessageFromStore(key)
        if (pollCreation) {
          const pollUpdate = await getAggregateVotesInPollMessage({
            message: pollCreation,
            pollUpdates: update.pollUpdates,
          })
          var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
          if (toCmd == undefined) return
          var prefCmd = xprefix+toCmd
          nebulamd.appenTextMessage(prefCmd, chatUpdate)
        }
      }
    }
  })

  nebulamd.ev.on('messages.upsert', async chatUpdate => {
    try {
      const mek = chatUpdate.messages[0]
      if (!mek.message) return
      mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
      if (mek.key && mek.key.remoteJid === 'status@broadcast' )
      if (!nebulamd.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
      if (mek.key.id && mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
      const m = smsg(nebulamd, mek, store)
      require("./nebula")(nebulamd, m, chatUpdate, store)
    } catch (err) {
      console.log(err)
    }
  })

  nebulamd.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
  }

  nebulamd.ev.on('contacts.update', update => {
    for (let contact of update) {
      let id = nebulamd.decodeJid(contact.id)
      if (store && store.contacts) store.contacts[id] = {
        id,
        name: contact.notify
      }
    }
  })

  nebulamd.getName = (jid, withoutContact = false) => {
    id = nebulamd.decodeJid(jid)
    withoutContact = nebulamd.withoutContact || withoutContact
    let v
    if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
      v = store.contacts[id] || {}
      if (!(v.name || v.subject)) v = nebulamd.groupMetadata(id) || {}
      resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
    })
    else v = id === '0@s.whatsapp.net' ? {
      id,
      name: 'WhatsApp'
    } : id === nebulamd.decodeJid(nebulamd.user.id) ?
      nebulamd.user :
      (store.contacts[id] || {})
    return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
  }

  nebulamd.sendContact = async (jid, kon, quoted = '', opts = {}) => {
    let list = []
    for (let i of kon) {
      list.push({
        displayName: await nebulamd.getName(i),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await nebulamd.getName(i)}\nFN:${await nebulamd.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
      })
    }
    nebulamd.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
  }

  nebulamd.public = true

  nebulamd.serializeM = (m) => smsg(nebulamd, m, store)

  nebulamd.sendText = (jid, text, quoted = '', options) => nebulamd.sendMessage(jid, {
    text: text,
    ...options
  }, {
    quoted,
    ...options
  })

  nebulamd.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await nebulamd.sendMessage(jid, {
      image: buffer,
      caption: caption,
      ...options
    }, {
      quoted
    })
  }

  nebulamd.sendTextWithMentions = async (jid, text, quoted, options = {}) => nebulamd.sendMessage(jid, {
    text: text,
    mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
    ...options
  }, {
    quoted
  })

  nebulamd.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options)
    } else {
      buffer = await imageToWebp(buff)
    }
    await nebulamd.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
      .then( response => {
        try { fs.unlinkSync(buffer) } catch {}
        return response
      })
  }

  nebulamd.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await nebulamd.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
  }

  nebulamd.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await nebulamd.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
  }

  nebulamd.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options)
    } else {
      buffer = await videoToWebp(buff)
    }
    await nebulamd.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
  }

  nebulamd.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    // save to file
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
  }

  nebulamd.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
      return nebulamd.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
    }
    let type = mime.split("/")[0]+"Message"
    if(mime === "application/pdf"){
      return nebulamd.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
    }
    if(mime.split("/")[0] === "image"){
      return nebulamd.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
    }
    if(mime.split("/")[0] === "video"){
      return nebulamd.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
    }
    if(mime.split("/")[0] === "audio"){
      return nebulamd.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
    }
  }

  nebulamd.getFile = async (PATH, save) => {
    let res
    let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
    let type = await FileType.fromBuffer(data) || {
      mime: 'application/octet-stream',
      ext: '.bin'
    }
    filename = path.join(__filename, './src/' + new Date * 1 + '.' + type.ext)
    if (data && save) fs.promises.writeFile(filename, data)
    return {
      res,
      filename,
      size: await getSizeMedia(data),
      ...type,
      data
    }
  }

  nebulamd.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    let type = await nebulamd.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;

    if (res && res.status !== 200 || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString())
        };
      } catch (e) {
        if (e.json) throw e.json;
      }
    }

    let opt = {
      filename
    };

    if (quoted) opt.quoted = quoted;
    if (!type) options.asDocument = true;

    let mtype = '',
      mimetype = type.mime,
      convert;

    if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
    else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
    else if (/video/.test(type.mime)) mtype = 'video';
    else if (/audio/.test(type.mime)) {
      convert = await (ptt ? toPTT : toAudio)(file, type.ext);
      file = convert.data;
      pathFile = convert.filename;
      mtype = 'audio';
      mimetype = 'audio/ogg; codecs=opus';
    } else mtype = 'document';

    if (options.asDocument) mtype = 'document';

    delete options.asSticker;
    delete options.asLocation;
    delete options.asVideo;
    delete options.asDocument;
    delete options.asImage;

    let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
    let m;

    try {
      m = await nebulamd.sendMessage(jid, message, { ...opt, ...options });
    } catch (e) {
      m = null;
    } finally {
      if (!m) m = await nebulamd.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
      file = null;
      return m;
    }
  }

  nebulamd.cMod = (jid, copy, text = '', sender = nebulamd.user.id, options = {}) => {
    let mtype = Object.keys(copy.message)[0]
    let isEphemeral = mtype === 'ephemeralMessage'
    if (isEphemeral) {
      mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
    let content = msg[mtype]
    if (typeof content === 'string') msg[mtype] = text || content
    else if (content.caption) content.caption = text || content.caption
    else if (content.text) content.text = text || content.text
    if (typeof content !== 'string') msg[mtype] = {
      ...content,
      ...options
    }
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
    else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
    copy.key.remoteJid = jid
    copy.key.fromMe = sender === nebulamd.user.id

    return proto.WebMessageInfo.fromObject(copy)
  }

  nebulamd.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
    let types = await nebulamd.getFile(path, true)
    let { mime, ext, res, data, filename } = types
    if (res && res.status !== 200 || data.length <= 65536) {
      try { throw { json: JSON.parse(data.toString()) } }
      catch (e) { if (e.json) throw e.json }
    }
    let type = '', mimetype = mime, pathFile = filename
    if (options.asDocument) type = 'document'
    if (options.asSticker || /webp/.test(mime)) {
      let { writeExif } = require('./lib/exif')
      let media = { mimetype: mime, data }
      pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
      await fs.promises.unlink(filename)
      type = 'sticker'
      mimetype = 'image/webp'
    }
    else if (/image/.test(mime)) type = 'image'
    else if (/video/.test(mime)) type = 'video'
    else if (/audio/.test(mime)) type = 'audio'
    else type = 'document'
    await nebulamd.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
    return fs.promises.unlink(pathFile)
  }

  nebulamd.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
      message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
      vtype = Object.keys(message.message.viewOnceMessage.message)[0]
      delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
      delete message.message.viewOnceMessage.message[vtype].viewOnce
      message.message = {
        ...message.message.viewOnceMessage.message
      }
    }
    let mtype = Object.keys(message.message)[0]
    let content = await generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = {}
    if (mtype != "conversation") context = message.message[mtype].contextInfo
    content[ctype].contextInfo = {
      ...context,
      ...content[ctype].contextInfo
    }
    const waMessage = await generateWAMessageFromContent(jid, content, options ? {
      ...content[ctype],
      ...options,
      ...(options.contextInfo ? {
        contextInfo: {
          ...content[ctype].contextInfo,
          ...options.contextInfo
        }
      } : {})
    } : {})
    await nebulamd.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
    return waMessage
  }

  nebulamd.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return nebulamd.sendMessage(jid, { poll: { name, values, selectableCount }}) }

  nebulamd.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
  }

  nebulamd.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
  }

  return nebulamd
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})

startSession().catch(err => {
  console.error('Failed to start session:', err)
})

process.on('uncaughtexception', function (err) {
  let e = String(err)
  if (e.includes("conflict")) return
  if (e.includes("Socket connection timeout")) return
  if (e.includes("not-authorized")) return
  if (e.includes("already-exists")) return
  if (e.includes("rate-overlimit")) return
  if (e.includes("Connection Closed")) return
  if (e.includes("Timed Out")) return
  if (e.includes("Value not found")) return
  console.log('Caught exception: ', err)
})