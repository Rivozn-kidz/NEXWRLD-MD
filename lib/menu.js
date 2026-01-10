const chalk = require('chalk')
const fs = require('fs')

global.allmenu = (prefix, hituet) => {
return` 
╭──⧼♛🧝 OWNER MENU🧝 ♛ ⧽──≽
│┃友 ${prefix}autoread 
│┃友 ${prefix}autobio 
│┃友 ${prefix}autotype 
│┃友 ${prefix}unavailable 
│┃友 ${prefix}autorecord 
│┃友 ${prefix}autorecordtype 
│┃友 ${prefix}autoswview 
│┃友 ${prefix}setautoblock 
│┃友 ${prefix}setantiforeign 
│┃友 ${prefix}autoblock 
│┃友 ${prefix}onlygc 
│┃友 ${prefix}onlypc 
│┃友 ${prefix}onlyindia 
│┃友 ${prefix}onlyindo 
│┃友 ${prefix}anticall 
│┃友 ${prefix}self 
│┃友 ${prefix}public 
│┃友 ${prefix}join 
│┃友 ${prefix}poll 
│┃友 ${prefix}spam 
│┃友 ${prefix}bc 
│┃友 ${prefix}bcgroup 
│┃友 ${prefix}setreply 
│┃友 ${prefix}setprefix 
│┃友 ${prefix}addlimit 
│┃友 ${prefix}dellimit 
│┃友 ${prefix}resethit 
│┃友 ${prefix}resetuser 
│┃友 ${prefix}creategc 
│┃友 ${prefix}setexif 
│┃友 ${prefix}userjid 
│┃友 ${prefix}setbotbio 
│┃友 ${prefix}delppbot 
│┃友 ${prefix}shutdown 
│┃友 ${prefix}setppbot 
│┃友 ${prefix}addprem 
│┃友 ${prefix}delprem 
│┃友 ${prefix}addowner 
│┃友 ${prefix}delowner 
│┃友 ${prefix}addvn 
│┃友 ${prefix}addapk 
│┃友 ${prefix}addzip 
│┃友 ${prefix}addpdf 
│┃友 ${prefix}delapk 
│┃友 ${prefix}delzip 
│┃友 ${prefix}delpdf 
│┃友 ${prefix}delvn 
│┃友 ${prefix}addsticker 
│┃友 ${prefix}delsticker 
│┃友 ${prefix}addimage 
│┃友 ${prefix}delimage 
│┃友 ${prefix}addvideo 
│┃友 ${prefix}delvideo 
│┃友 ${prefix}addtitle 
│┃友 ${prefix}deltitle 
│┃友 ${prefix}upswtext 
│┃友 ${prefix}upswvideo 
│┃友 ${prefix}upswimage 
│┃友 ${prefix}upswaudio 
│┃友 ${prefix}autosticker 
│┃友 ${prefix}block 
│┃友 ${prefix}unblock 
│┃友 ${prefix}leavegc 
│┃友 ${prefix}pushcontact 
│┃友 ${prefix}pushcontactv2 
│┃友 ${prefix}pushcontactv3 
│┃友 ${prefix}jpm 
│┃友 ${prefix}post 
│┃友 ${prefix}clearall 
│┃友 ${prefix}pinchat 
│┃友 ${prefix}unpinchat 
╰─────────────────────≽

╭──⧼♛🧝 GROUP MENU 🧝♛ ⧽──≽
│┃友 ${prefix}antibot 
│┃友 ${prefix}antiviewonce 
│┃友 ${prefix}readviewonce 
│┃友 ${prefix}welcome 
│┃友 ${prefix}adminevent 
│┃友 ${prefix}groupevent 
│┃友 ${prefix}antiforeign 
│┃友 ${prefix}antimedia 
│┃友 ${prefix}antiaudio 
│┃友 ${prefix}antivideo 
│┃友 ${prefix}antiimage 
│┃友 ${prefix}antidocument 
│┃友 ${prefix}antilocation 
│┃友 ${prefix}anticontact 
│┃友 ${prefix}antisticker 
│┃友 ${prefix}antipoll 
│┃友 ${prefix}antilink 
│┃友 ${prefix}antilinkgc 
│┃友 ${prefix}antipromotion 
│┃友 ${prefix}antivirtex 
│┃友 ${prefix}grouplink 
│┃友 ${prefix}listadmin 
│┃友 ${prefix}invite 
│┃友 ${prefix}ephemeral 
│┃友 ${prefix}delete 
│┃友 ${prefix}setppgroup 
│┃友 ${prefix}delppgroup 
│┃友 ${prefix}setnamegc 
│┃友 ${prefix}setdesc 
│┃友 ${prefix}add 
│┃友 ${prefix}kick 
│┃友 ${prefix}promote 
│┃友 ${prefix}demote 
│┃友 ${prefix}kickall 
│┃友 ${prefix}promoteall 
│┃友 ${prefix}demoteall 
│┃友 ${prefix}getcontact 
│┃友 ${prefix}savecontact 
│┃友 ${prefix}sendcontact 
│┃友 ${prefix}contactag 
│┃友 ${prefix}hidetag 
│┃友 ${prefix}totag 
│┃友 ${prefix}tagall 
│┃友 ${prefix}editinfo 
│┃友 ${prefix}opentime 
│┃友 ${prefix}closetime 
│┃友 ${prefix}resetlink 
│┃友 ${prefix}getbio 
│┃友 ${prefix}vote 
│┃友 ${prefix}upvote 
│┃友 ${prefix}downvote 
│┃友 ${prefix}checkvote 
│┃友 ${prefix}delvote 
│┃友 ${prefix}antivirus 
│┃友 ${prefix}antitoxic 
│┃友 ${prefix}nsfw 
│┃友 ${prefix}react 
│┃友 ${prefix}getjoinrequest 
╰─────────────────────≽

╭──⧼♛🧝 SEARCH MENU 🧝♛ ⧽──≽
│┃友 ${prefix}google 
│┃友 ${prefix}wikipedia 
│┃友 ${prefix}ytsearch 
│┃友 ${prefix}xnxxsearch 
│┃友 ${prefix}xvideosearch 
│┃友 ${prefix}apksearch 
│┃友 ${prefix}stickersearch 
│┃友 ${prefix}imdb 
│┃友 ${prefix}wanumber 
│┃友 ${prefix}friend 
│┃友 ${prefix}lyrics 
╰─────────────────────≽

╭──⧼♛🧝 DOWNLOAD MENU 🧝♛ ⧽──≽
│┃友 ${prefix}xnxxdl 
│┃友 ${prefix}xvideodl 
│┃友 ${prefix}itunes 
│┃友 ${prefix}play 
│┃友 ${prefix}play3
│┃友 ${prefix}play2 
│┃友 ${prefix}ytmp4 
│┃友 ${prefix}tiktok 
│┃友 ${prefix}tiktokaudio 
│┃友 ${prefix}tiktokvideo 
│┃友 ${prefix}tiktokslide 
│┃友 ${prefix}igvideo 
│┃友 ${prefix}igimage 
│┃友 ${prefix}facebook 
│┃友 ${prefix}twitter 
│┃友 ${prefix}capcut 
│┃友 ${prefix}apk 
│┃友 ${prefix}mega 
│┃友 ${prefix}mediafire 
│┃友 ${prefix}google 
│┃友 ${prefix}gimage 
│┃友 ${prefix}weather 
│┃友 ${prefix}spotify 
│┃友 ${prefix}gitclone 
│┃友 ${prefix}happymod 
│┃友 ${prefix}gdrive 
│┃友 ${prefix}pinterest 
│┃友 ${prefix}ringtone 
│┃友 ${prefix}autodownload 
╰─────────────────────≽

╭──⧼♛🧝 CONVERT MENU 🧝♛ ⧽──≽
│┃友 ${prefix}obfuscate 
│┃友 ${prefix}styletext 
│┃友 ${prefix}fliptext 
│┃友 ${prefix}tts 
│┃友 ${prefix}say 
│┃友 ${prefix}togif 
│┃友 ${prefix}toqr 
│┃友 ${prefix}bass 
│┃友 ${prefix}blown 
│┃友 ${prefix}deep 
│┃友 ${prefix}earrape 
│┃友 ${prefix}fast 
│┃友 ${prefix}fat 
│┃友 ${prefix}nightcore 
│┃友 ${prefix}reverse 
│┃友 ${prefix}robot 
│┃友 ${prefix}slow 
│┃友 ${prefix}smooth 
│┃友 ${prefix}squirrel 
│┃友 ${prefix}tinyurl 
│┃友 ${prefix}tovn 
│┃友 ${prefix}toaudio 
│┃友 ${prefix}tomp3 
│┃友 ${prefix}tomp4
│┃友 ${prefix}toimg 
│┃友 ${prefix}toonce 
│┃友 ${prefix}sticker 
│┃友 ${prefix}smeme 
│┃友 ${prefix}smeta 
│┃友 ${prefix}take 
│┃友 ${prefix}emoji 
│┃友 ${prefix}volaudio 
│┃友 ${prefix}volvideo 
│┃友 ${prefix}ebinary 
│┃友 ${prefix}dbinary 
│┃友 ${prefix}ssweb 
│┃友 ${prefix}quoted 
│┃友 ${prefix}translate 
╰─────────────────────≽

╭──⧼♛🧝 LIST MENU 🧝♛ ⧽──≽
│┃友 ${prefix}listprem 
│┃友 ${prefix}listowner 
│┃友 ${prefix}liststicker 
│┃友 ${prefix}listimage 
│┃友 ${prefix}listvideo 
│┃友 ${prefix}listvn 
│┃友 ${prefix}listapk 
│┃友 ${prefix}listzip 
│┃友 ${prefix}listpdf 
│┃友 ${prefix}listbadword 
│┃友 ${prefix}listpc 
│┃友 ${prefix}listgc 
╰─────────────────────≽

╭──⧼♛🧝 RANDOM PHOTO 🧝♛ ⧽──≽
│┃友 ${prefix}aesthetic 
│┃友 ${prefix}coffee 
│┃友 ${prefix}wikimedia 
│┃友 ${prefix}wallpaper 
│┃友 ${prefix}art 
│┃友 ${prefix}bts 
│┃友 ${prefix}dogwoof 
│┃友 ${prefix}catmeow 
│┃友 ${prefix}lizardpic 
│┃友 ${prefix}goosebird 
│┃友 ${prefix}8ballpool 
│┃友 ${prefix}cosplay 
│┃友 ${prefix}hacker 
│┃友 ${prefix}cyber 
│┃友 ${prefix}gamewallpaper 
│┃友 ${prefix}islamic 
│┃友 ${prefix}jennie 
│┃友 ${prefix}jiso 
│┃友 ${prefix}satanic 
│┃友 ${prefix}justina 
│┃友 ${prefix}cartoon 
│┃友 ${prefix}pentol 
│┃友 ${prefix}cat 
│┃友 ${prefix}kpop 
│┃友 ${prefix}exo 
│┃友 ${prefix}lisa 
│┃友 ${prefix}space 
│┃友 ${prefix}car 
│┃友 ${prefix}technology 
│┃友 ${prefix}bike 
│┃友 ${prefix}shortquote 
│┃友 ${prefix}antiwork 
│┃友 ${prefix}hacking 
│┃友 ${prefix}boneka 
│┃友 ${prefix}rose 
│┃友 ${prefix}ryujin 
│┃友 ${prefix}ulzzangboy 
│┃友 ${prefix}ulzzanggirl 
│┃友 ${prefix}wallml 
│┃友 ${prefix}wallphone 
│┃友 ${prefix}mountain 
│┃友 ${prefix}goose 
│┃友 ${prefix}profilepic 
│┃友 ${prefix}couplepp 
│┃友 ${prefix}programming 
│┃友 ${prefix}pubg 
│┃友 ${prefix}blackpink 
│┃友 ${prefix}randomboy   
│┃友 ${prefix}randomgirl 
│┃友 ${prefix}hijab   
│┃友 ${prefix}chinese 
│┃友 ${prefix}indo 
│┃友 ${prefix}japanese 
│┃友 ${prefix}korean 
│┃友 ${prefix}malay 
│┃友 ${prefix}thai 
│┃友 ${prefix}vietnamese 
╰─────────────────────≽

╭──⧼♛🧝 RANDOM VIDEO 🧝♛ ⧽──≽
│┃友 ${prefix}tiktokgirl 
│┃友 ${prefix}tiktoknukthy 
│┃友 ${prefix}tiktokkayes 
│┃友 ${prefix}tiktokpanrika 
│┃友 ${prefix}tiktoknotnot 
│┃友 ${prefix}tiktokghea 
│┃友 ${prefix}tiktoksantuy 
│┃友 ${prefix}tiktokbocil 
╰─────────────────────≽

╭──⧼♛ Stalker ♛ ⧽──≽
│┃友 ${prefix}tiktokstalk 
│┃友 ${prefix}mlstalk 
│┃友 ${prefix}npmstalk 
│┃友 ${prefix}ghstalk 
╰─────────────────────≽

╭──⧼♛🧝 AI MENU 🧝♛ ⧽──≽
│┃友 ${prefix}animate 
│┃友 ${prefix}diffusion-anime 
│┃友 ${prefix}bingai 
│┃友 ${prefix}blackboxai 
│┃友 ${prefix}travel-assistant 
│┃友 ${prefix}guru-ai 
│┃友 ${prefix}emi-ai 
│┃友 ${prefix}claude-ai 
│┃友 ${prefix}costume-ai 
│┃友 ${prefix}herc-ai 
│┃友 ${prefix}hercaiv1 
│┃友 ${prefix}hercai-cartoon 
│┃友 ${prefix}hercai-animefy 
│┃友 ${prefix}hercai-lexica 
│┃友 ${prefix}hercai-prodia 
│┃友 ${prefix}hercai-simurg 
│┃友 ${prefix}hercai-raava 
│┃友 ${prefix}hercai-shonin 
│┃友 ${prefix}realistic 
│┃友 ${prefix}3dmodel 
│┃友 ${prefix}openai-indo 
│┃友 ${prefix}indo-ai 
│┃友 ${prefix}diffusion 
│┃友 ${prefix}photoleap 
│┃友 ${prefix}openai 
│┃友 ${prefix}dalle 
│┃友 ${prefix}ai 
│┃友 ${prefix}remini 
│┃友 ${prefix}simi 
│┃友 ${prefix}removebg 
│┃友 ${prefix}tozombie 
│┃友 ${prefix}toanime 
╰─────────────────────≽

╭──⧼♛🧝 GAME MENU🧝♛ ⧽──≽
│┃友 ${prefix}truth 
│┃友 ${prefix}dare 
│┃友 ${prefix}suit 
│┃友 ${prefix}tictactoe 
│┃友 ${prefix}math 
╰─────────────────────≽

╭──⧼♛🧝 FUN MENU 🧝♛ ⧽──≽
│┃友 ${prefix}define 
│┃友 ${prefix}readmore 
│┃友 ${prefix}fact 
│┃友 ${prefix}couple 
│┃友 ${prefix}soulmate 
│┃友 ${prefix}stupidcheck 
│┃友 ${prefix}handsomecheck 
│┃友 ${prefix}uncleancheck 
│┃友 ${prefix}hotcheck 
│┃友 ${prefix}smartcheck 
│┃友 ${prefix}greatcheck 
│┃友 ${prefix}evilcheck 
│┃友 ${prefix}dogcheck 
│┃友 ${prefix}coolcheck 
│┃友 ${prefix}waifucheck 
│┃友 ${prefix}awesomecheck 
│┃友 ${prefix}gaycheck 
│┃友 ${prefix}cutecheck 
│┃友 ${prefix}lesbiancheck 
│┃友 ${prefix}hornycheck 
│┃友 ${prefix}prettycheck 
│┃友 ${prefix}lovelycheck 
│┃友 ${prefix}uglycheck 
│┃友 ${prefix}pick 
│┃友 ${prefix}pickupline 
│┃友 ${prefix}quotes 
│┃友 ${prefix}can 
│┃友 ${prefix}is 
│┃友 ${prefix}when 
│┃友 ${prefix}where 
│┃友 ${prefix}what 
│┃友 ${prefix}how 
│┃友 ${prefix}rate 
│┃友 ${prefix}cry 
│┃友 ${prefix}kill 
│┃友 ${prefix}hug 
│┃友 ${prefix}pat 
│┃友 ${prefix}lick  
│┃友 ${prefix}kiss 
│┃友 ${prefix}bite 
│┃友 ${prefix}yeet 
│┃友 ${prefix}bully 
│┃友 ${prefix}bonk 
│┃友 ${prefix}wink 
│┃友 ${prefix}poke 
│┃友 ${prefix}nom 
│┃友 ${prefix}slap 
│┃友 ${prefix}smile  
│┃友 ${prefix}wave 
│┃友 ${prefix}awoo 
│┃友 ${prefix}blush 
│┃友 ${prefix}smug 
│┃友 ${prefix}glomp  
│┃友 ${prefix}happy 
│┃友 ${prefix}dance 
│┃友 ${prefix}cringe 
│┃友 ${prefix}cuddle 
│┃友 ${prefix}highfive  
│┃友 ${prefix}handhold 
│┃友 ${prefix}spank 
│┃友 ${prefix}tickle 
│┃友 ${prefix}feed 
│┃友 ${prefix}checkme 
╰─────────────────────≽

╭──⧼♛🧝 STICKER MENU 🧝♛ ⧽──≽
│┃友 ${prefix}goose 
│┃友 ${prefix}woof 
│┃友 ${prefix}8ball 
│┃友 ${prefix}lizard 
│┃友 ${prefix}meow 
│┃友 ${prefix}gura 
│┃友 ${prefix}telestick 
│┃友 ${prefix}ttp 
╰─────────────────────≽

╭──⧼♛🧝 ANIME MENU 🧝♛ ⧽──≽
│┃友 ${prefix}stickhandhold 
│┃友 ${prefix}stickshinobu 
│┃友 ${prefix}stickcuddle 
│┃友 ${prefix}stickhighfive 
│┃友 ${prefix}stickdance 
│┃友 ${prefix}stickcringe 
│┃友 ${prefix}stickhappy 
│┃友 ${prefix}stickglomp 
│┃友 ${prefix}sticksmug 
│┃友 ${prefix}stickblush 
│┃友 ${prefix}stickawoo 
│┃友 ${prefix}stickwave 
│┃友 ${prefix}sticksmile 
│┃友 ${prefix}stickslap 
│┃友 ${prefix}stickpoke 
│┃友 ${prefix}stickwink 
│┃友 ${prefix}stickbonk 
│┃友 ${prefix}stickbully 
│┃友 ${prefix}stickyeet 
│┃友 ${prefix}stickbike 
│┃友 ${prefix}stickkiss 
│┃友 ${prefix}sticklick 
│┃友 ${prefix}stickpat 
│┃友 ${prefix}stickhug 
│┃友 ${prefix}stickkill 
│┃友 ${prefix}stickcry 
│┃友 ${prefix}stickspank 
│┃友 ${prefix}sticktickle 
│┃友 ${prefix}traceanime 
│┃友 ${prefix}akira 
│┃友 ${prefix}akiyama 
│┃友 ${prefix}ana 
│┃友 ${prefix}asuna 
│┃友 ${prefix}ayuzawa 
│┃友 ${prefix}boruto 
│┃友 ${prefix}chiho 
│┃友 ${prefix}chitoge 
│┃友 ${prefix}cosplayloli 
│┃友 ${prefix}cosplaysagiri 
│┃友 ${prefix}deidara 
│┃友 ${prefix}doraemon 
│┃友 ${prefix}elaina 
│┃友 ${prefix}emilia 
│┃友 ${prefix}erza 
│┃友 ${prefix}gremory 
│┃友 ${prefix}hestia 
│┃友 ${prefix}husbu 
│┃友 ${prefix}inori 
│┃友 ${prefix}isuzu 
│┃友 ${prefix}itachi 
│┃友 ${prefix}itori 
│┃友 ${prefix}kaga 
│┃友 ${prefix}kagura 
│┃友 ${prefix}kakasih 
│┃友 ${prefix}kaori 
│┃友 ${prefix}keneki 
│┃友 ${prefix}kotori 
│┃友 ${prefix}kurumi 
│┃友 ${prefix}loli 
│┃友 ${prefix}loli2 
│┃友 ${prefix}madara 
│┃友 ${prefix}megumin 
│┃友 ${prefix}mikasa 
│┃友 ${prefix}mikey 
│┃友 ${prefix}miku 
│┃友 ${prefix}minato 
│┃友 ${prefix}naruto 
│┃友 ${prefix}neko 
│┃友 ${prefix}nekonime 
│┃友 ${prefix}nezuko 
│┃友 ${prefix}onepiece 
│┃友 ${prefix}pokemon 
│┃友 ${prefix}randomnime 
│┃友 ${prefix}randomnime2 
│┃友 ${prefix}rize 
│┃友 ${prefix}sagiri 
│┃友 ${prefix}sakura 
│┃友 ${prefix}sasuke 
│┃友 ${prefix}shina 
│┃友 ${prefix}shinka 
│┃友 ${prefix}shinomiya 
│┃友 ${prefix}shizuka 
│┃友 ${prefix}shota 
│┃友 ${prefix}tejina 
│┃友 ${prefix}toukachan 
│┃友 ${prefix}tsunade 
│┃友 ${prefix}waifu 
│┃友 ${prefix}waifu2 
│┃友 ${prefix}animewall 
│┃友 ${prefix}yotsuba 
│┃友 ${prefix}yuki 
│┃友 ${prefix}yulibocil 
│┃友 ${prefix}yumeko 
│┃友 ${prefix}8ball 
│┃友 ${prefix}animeawoo 
│┃友 ${prefix}animemegumin 
│┃友 ${prefix}animeshinobu 
│┃友 ${prefix}animehandhold 
│┃友 ${prefix}animehighfive 
│┃友 ${prefix}animecringe 
│┃友 ${prefix}animedance 
│┃友 ${prefix}animehappy 
│┃友 ${prefix}animeglomp 
│┃友 ${prefix}animeblush 
│┃友 ${prefix}animesmug 
│┃友 ${prefix}animewave 
│┃友 ${prefix}animesmille 
│┃友 ${prefix}animepoke 
│┃友 ${prefix}animewink 
│┃友 ${prefix}animebonk 
│┃友 ${prefix}animebully 
│┃友 ${prefix}animeyeet 
│┃友 ${prefix}animebite 
│┃友 ${prefix}animelick 
│┃友 ${prefix}animekill 
│┃友 ${prefix}animecry 
│┃友 ${prefix}animewlp 
│┃友 ${prefix}animekiss 
│┃友 ${prefix}animehug 
│┃友 ${prefix}animeneko 
│┃友 ${prefix}animepat 
│┃友 ${prefix}animeslap 
│┃友 ${prefix}animecuddle 
│┃友 ${prefix}animewaifu 
│┃友 ${prefix}animenom 
│┃友 ${prefix}animefoxgirl 
│┃友 ${prefix}animegecg 
│┃友 ${prefix}animetickle 
│┃友 ${prefix}animefeed 
│┃友 ${prefix}animeavatar 
│┃友 ${prefix}anime 
│┃友 ${prefix}avatar 
│┃友 ${prefix}shinobu 
│┃友 ${prefix}fox_girl 
│┃友 ${prefix}gecg 
╰─────────────────────≽

╭──⧼♛🧝 ANIME NSFW 🧝♛ ⧽──≽
│┃友 ${prefix}hentai 
│┃友 ${prefix}gifblowjob 
│┃友 ${prefix}hentaivid 
│┃友 ${prefix}hneko 
│┃友 ${prefix}nwaifu 
│┃友 ${prefix}animespank 
│┃友 ${prefix}trap 
│┃友 ${prefix}blowjob 
│┃友 ${prefix}cuckold 
│┃友 ${prefix}milf 
│┃友 ${prefix}eba 
│┃友 ${prefix}pussy 
│┃友 ${prefix}yuri 
│┃友 ${prefix}zettai 
╰─────────────────────≽

╭──⧼♛🧝 DATABASE MENU 🧝♛ ⧽──≽
│┃友 ${prefix}setcmd 
│┃友 ${prefix}delcmd 
│┃友 ${prefix}listcmd 
│┃友 ${prefix}lockcmd 
│┃友 ${prefix}addmsg 
│┃友 ${prefix}delmsg 
│┃友 ${prefix}getmsg 
│┃友 ${prefix}listmsg 
╰─────────────────────≽

╭──⧼♛🧝STORE MENU 🧝♛ ⧽──≽
│┃友 ${prefix}list 
│┃友 ${prefix}store 
│┃友 ${prefix}shop 
│┃友 ${prefix}addlist 
│┃友 ${prefix}dellist 
╰─────────────────────≽

╭──⧼♛🧝 RELIGON MENU 🧝♛ ⧽──≽
│┃友 ${prefix}bible 
│┃友 ${prefix}quran 
│┃友 ${prefix}gita 
╰─────────────────────≽

╭──⧼♛🧝 OTHER MENU 🧝♛ ⧽──≽
│┃友 ${prefix}update 
│┃友 ${prefix}ping  
│┃友 ${prefix}myip 
│┃友 ${prefix}repo 
│┃友 ${prefix}reportbug 
│┃友 ${prefix}idgroup 
│┃友 ${prefix}owner 
│┃友 ${prefix}rentbot 
│┃友 ${prefix}donate 
│┃友 ${prefix}runtime 
│┃友 ${prefix}checkaccount 
╰─────────────────────≽
`}

global.animemenu = (prefix) => {
return ` 
╭──⧼♛🧝 ANIME MENU 🧝♛ ⧽──≽
│┃友 ${prefix}stickhandhold 
│┃友 ${prefix}stickshinobu 
│┃友 ${prefix}stickcuddle 
│┃友 ${prefix}stickhighfive 
│┃友 ${prefix}stickdance 
│┃友 ${prefix}stickcringe 
│┃友 ${prefix}stickhappy 
│┃友 ${prefix}stickglomp 
│┃友 ${prefix}sticksmug 
│┃友 ${prefix}stickblush 
│┃友 ${prefix}stickawoo 
│┃友 ${prefix}stickwave 
│┃友 ${prefix}sticksmile 
│┃友 ${prefix}stickslap 
│┃友 ${prefix}stickpoke 
│┃友 ${prefix}stickwink 
│┃友 ${prefix}stickbonk 
│┃友 ${prefix}stickbully 
│┃友 ${prefix}stickyeet 
│┃友 ${prefix}stickbike 
│┃友 ${prefix}stickkiss 
│┃友 ${prefix}sticklick 
│┃友 ${prefix}stickpat 
│┃友 ${prefix}stickhug 
│┃友 ${prefix}stickkill 
│┃友 ${prefix}stickcry 
│┃友 ${prefix}stickspank 
│┃友 ${prefix}sticktickle 
│┃友 ${prefix}traceanime 
│┃友 ${prefix}akira 
│┃友 ${prefix}akiyama 
│┃友 ${prefix}ana 
│┃友 ${prefix}asuna 
│┃友 ${prefix}ayuzawa 
│┃友 ${prefix}boruto 
│┃友 ${prefix}chiho 
│┃友 ${prefix}chitoge 
│┃友 ${prefix}cosplayloli 
│┃友 ${prefix}cosplaysagiri 
│┃友 ${prefix}deidara 
│┃友 ${prefix}doraemon 
│┃友 ${prefix}elaina 
│┃友 ${prefix}emilia 
│┃友 ${prefix}erza 
│┃友 ${prefix}gremory 
│┃友 ${prefix}hestia 
│┃友 ${prefix}husbu 
│┃友 ${prefix}inori 
│┃友 ${prefix}isuzu 
│┃友 ${prefix}itachi 
│┃友 ${prefix}itori 
│┃友 ${prefix}kaga 
│┃友 ${prefix}kagura 
│┃友 ${prefix}kakasih 
│┃友 ${prefix}kaori 
│┃友 ${prefix}keneki 
│┃友 ${prefix}kotori 
│┃友 ${prefix}kurumi 
│┃友 ${prefix}loli 
│┃友 ${prefix}loli2 
│┃友 ${prefix}madara 
│┃友 ${prefix}megumin 
│┃友 ${prefix}mikasa 
│┃友 ${prefix}mikey 
│┃友 ${prefix}miku 
│┃友 ${prefix}minato 
│┃友 ${prefix}naruto 
│┃友 ${prefix}neko 
│┃友 ${prefix}nekonime 
│┃友 ${prefix}nezuko 
│┃友 ${prefix}onepiece 
│┃友 ${prefix}pokemon 
│┃友 ${prefix}randomnime 
│┃友 ${prefix}randomnime2 
│┃友 ${prefix}rize 
│┃友 ${prefix}sagiri 
│┃友 ${prefix}sakura 
│┃友 ${prefix}sasuke 
│┃友 ${prefix}shina 
│┃友 ${prefix}shinka 
│┃友 ${prefix}shinomiya 
│┃友 ${prefix}shizuka 
│┃友 ${prefix}shota 
│┃友 ${prefix}tejina 
│┃友 ${prefix}toukachan 
│┃友 ${prefix}tsunade 
│┃友 ${prefix}waifu 
│┃友 ${prefix}waifu2 
│┃友 ${prefix}animewall 
│┃友 ${prefix}yotsuba 
│┃友 ${prefix}yuki 
│┃友 ${prefix}yulibocil 
│┃友 ${prefix}yumeko 
│┃友 ${prefix}8ball 
│┃友 ${prefix}feed 
│┃友 ${prefix}animeawoo 
│┃友 ${prefix}animemegumin 
│┃友 ${prefix}animeshinobu 
│┃友 ${prefix}animehandhold 
│┃友 ${prefix}animehighfive 
│┃友 ${prefix}animecringe 
│┃友 ${prefix}animedance 
│┃友 ${prefix}animehappy 
│┃友 ${prefix}animeglomp 
│┃友 ${prefix}animeblush 
│┃友 ${prefix}animesmug 
│┃友 ${prefix}animewave 
│┃友 ${prefix}animesmille 
│┃友 ${prefix}animepoke 
│┃友 ${prefix}animewink 
│┃友 ${prefix}animebonk 
│┃友 ${prefix}animebully 
│┃友 ${prefix}animeyeet 
│┃友 ${prefix}animebite 
│┃友 ${prefix}animelick 
│┃友 ${prefix}animekill 
│┃友 ${prefix}animecry 
│┃友 ${prefix}animewlp 
│┃友 ${prefix}animekiss 
│┃友 ${prefix}animehug 
│┃友 ${prefix}animeneko 
│┃友 ${prefix}animepat 
│┃友 ${prefix}animeslap 
│┃友 ${prefix}animecuddle 
│┃友 ${prefix}animewaifu 
│┃友 ${prefix}animenom 
│┃友 ${prefix}animefoxgirl 
│┃友 ${prefix}animegecg 
│┃友 ${prefix}animetickle 
│┃友 ${prefix}animefeed 
│┃友 ${prefix}animeavatar 
│┃友 ${prefix}anime 
│┃友 ${prefix}animequote 
│┃友 ${prefix}avatar 
│┃友 ${prefix}shinobu 
│┃友 ${prefix}fox_girl 
│┃友 ${prefix}gecg 
╰─────────────────────≽
`}

global.ownermenu = (prefix) => {
return ` 
╭──⧼♛🧝 OWNER MENU 🧝♛ ⧽──≽
│┃友 ${prefix}autoread 
│┃友 ${prefix}autobio 
│┃友 ${prefix}autotype 
│┃友 ${prefix}unavailable 
│┃友 ${prefix}autorecord 
│┃友 ${prefix}autorecordtype 
│┃友 ${prefix}autoswview 
│┃友 ${prefix}setautoblock 
│┃友 ${prefix}setantiforeign 
│┃友 ${prefix}autoblock 
│┃友 ${prefix}onlygc 
│┃友 ${prefix}onlypc 
│┃友 ${prefix}onlyindia 
│┃友 ${prefix}onlyindo 
│┃友 ${prefix}anticall 
│┃友 ${prefix}self 
│┃友 ${prefix}public 
│┃友 ${prefix}join 
│┃友 ${prefix}poll 
│┃友 ${prefix}spam 
│┃友 ${prefix}bc 
│┃友 ${prefix}bcgroup  
│┃友 ${prefix}setreply 
│┃友 ${prefix}setprefix 
│┃友 ${prefix}addlimit 
│┃友 ${prefix}dellimit 
│┃友 ${prefix}resethit 
│┃友 ${prefix}resetuser 
│┃友 ${prefix}creategc 
│┃友 ${prefix}userjid 
│┃友 ${prefix}setexif 
│┃友 ${prefix}setbotbio 
│┃友 ${prefix}delppbot 
│┃友 ${prefix}shutdown 
│┃友 ${prefix}setppbot 
│┃友 ${prefix}addprem 
│┃友 ${prefix}delprem 
│┃友 ${prefix}addowner 
│┃友 ${prefix}delowner 
│┃友 ${prefix}addvn 
│┃友 ${prefix}addapk 
│┃友 ${prefix}addzip 
│┃友 ${prefix}addpdf 
│┃友 ${prefix}delapk 
│┃友 ${prefix}delzip 
│┃友 ${prefix}delpdf 
│┃友 ${prefix}delvn 
│┃友 ${prefix}addsticker 
│┃友 ${prefix}delsticker 
│┃友 ${prefix}addimage 
│┃友 ${prefix}delimage 
│┃友 ${prefix}addvideo 
│┃友 ${prefix}delvideo 
│┃友 ${prefix}addtitle 
│┃友 ${prefix}deltitle 
│┃友 ${prefix}upswtext 
│┃友 ${prefix}upswvideo 
│┃友 ${prefix}upswimage 
│┃友 ${prefix}upswaudio 
│┃友 ${prefix}autosticker 
│┃友 ${prefix}block 
│┃友 ${prefix}unblock 
│┃友 ${prefix}leavegc 
│┃友 ${prefix}pushcontact 
│┃友 ${prefix}pushcontactv2 
│┃友 ${prefix}pushcontactv3 
│┃友 ${prefix}jpm 
│┃友 ${prefix}post 
│┃友 ${prefix}clearall 
│┃友 ${prefix}pinchat 
│┃友 ${prefix}unpinchat 
╰─────────────────────≽
`}

global.othermenu = (prefix) => {
return ` 
╭──⧼♛🧝 OTHER MENU 🧝♛ ⧽──≽
│┃友 ${prefix}ping 
│┃友 ${prefix}myip 
│┃友 ${prefix}repo 
│┃友 ${prefix}reportbug 
│┃友 ${prefix}idgroup 
│┃友 ${prefix}owner 
│┃友 ${prefix}rentbot 
│┃友 ${prefix}donate 
│┃友 ${prefix}checkaccount 
│┃友 ${prefix}runtime 
╰─────────────────────≽
`}

global.downloadmenu = (prefix) => {
return ` 
╭──⧼♛🧝 DOWNLOAD MENU 🧝♛ ⧽──≽
│┃友 ${prefix}xnxxdl 
│┃友 ${prefix}xvideodl 
│┃友 ${prefix}itunes 
│┃友 ${prefix}play 
│┃友 ${prefix}play2
│┃友 ${prefix}play3 
│┃友 ${prefix}ytmp4 
│┃友 ${prefix}tiktok 
│┃友 ${prefix}tiktokaudio 
│┃友 ${prefix}tiktokvideo 
│┃友 ${prefix}tiktokslide 
│┃友 ${prefix}igvideo 
│┃友 ${prefix}igimage 
│┃友 ${prefix}facebook 
│┃友 ${prefix}twitter 
│┃友 ${prefix}capcut 
│┃友 ${prefix}apk 
│┃友 ${prefix}mega 
│┃友 ${prefix}mediafire 
│┃友 ${prefix}google 
│┃友 ${prefix}gimage 
│┃友 ${prefix}weather 
│┃友 ${prefix}spotify 
│┃友 ${prefix}gitclone 
│┃友 ${prefix}happymod 
│┃友 ${prefix}gdrive 
│┃友 ${prefix}pinterest 
│┃友 ${prefix}ringtone 
│┃友 ${prefix}autodownload 
╰─────────────────────≽
`}

global.groupmenu = (prefix) => {
return ` 
╭──⧼♛🧝 GROUP MENU 🧝♛ ⧽──≽
│┃友 ${prefix}antibot 
│┃友 ${prefix}readviewonce 
│┃友 ${prefix}antiviewonce 
│┃友 ${prefix}welcome 
│┃友 ${prefix}adminevent 
│┃友 ${prefix}groupevent 
│┃友 ${prefix}antiforeign 
│┃友 ${prefix}antimedia 
│┃友 ${prefix}antiaudio 
│┃友 ${prefix}antivideo 
│┃友 ${prefix}antiimage 
│┃友 ${prefix}antidocument 
│┃友 ${prefix}antilocation 
│┃友 ${prefix}anticontact 
│┃友 ${prefix}antisticker 
│┃友 ${prefix}antipoll 
│┃友 ${prefix}antilink 
│┃友 ${prefix}antilinkgc 
│┃友 ${prefix}antipromotion 
│┃友 ${prefix}antivirtex 
│┃友 ${prefix}grouplink 
│┃友 ${prefix}listadmin 
│┃友 ${prefix}invite 
│┃友 ${prefix}ephemeral 
│┃友 ${prefix}delete 
│┃友 ${prefix}setppgroup 
│┃友 ${prefix}delppgroup 
│┃友 ${prefix}setnamegc 
│┃友 ${prefix}setdesc 
│┃友 ${prefix}add 
│┃友 ${prefix}kick 
│┃友 ${prefix}promote 
│┃友 ${prefix}demote 
│┃友 ${prefix}kickall 
│┃友 ${prefix}promoteall 
│┃友 ${prefix}demoteall 
│┃友 ${prefix}getcontact 
│┃友 ${prefix}savecontact 
│┃友 ${prefix}sendcontact 
│┃友 ${prefix}contactag 
│┃友 ${prefix}hidetag 
│┃友 ${prefix}totag 
│┃友 ${prefix}tagall 
│┃友 ${prefix}editinfo 
│┃友 ${prefix}opentime 
│┃友 ${prefix}closetime 
│┃友 ${prefix}resetlink 
│┃友 ${prefix}getbio 
│┃友 ${prefix}vote 
│┃友 ${prefix}upvote 
│┃友 ${prefix}downvote 
│┃友 ${prefix}checkvote 
│┃友 ${prefix}delvote 
│┃友 ${prefix}antivirus 
│┃友 ${prefix}antitoxic 
│┃友 ${prefix}nsfw 
│┃友 ${prefix}react 
│┃友 ${prefix}getjoinrequest 
╰─────────────────────≽
`}

global.funmenu = (prefix) => {
return ` 
╭──⧼♛🧝 FUN MENU 🧝♛ ⧽──≽
│┃友 ${prefix}define 
│┃友 ${prefix}readmore 
│┃友 ${prefix}fact 
│┃友 ${prefix}couple 
│┃友 ${prefix}soulmate 
│┃友 ${prefix}stupidcheck 
│┃友 ${prefix}handsomecheck 
│┃友 ${prefix}uncleancheck 
│┃友 ${prefix}hotcheck 
│┃友 ${prefix}smartcheck 
│┃友 ${prefix}greatcheck 
│┃友 ${prefix}evilcheck 
│┃友 ${prefix}dogcheck 
│┃友 ${prefix}coolcheck 
│┃友 ${prefix}waifucheck 
│┃友 ${prefix}awesomecheck 
│┃友 ${prefix}gaycheck 
│┃友 ${prefix}cutecheck 
│┃友 ${prefix}lesbiancheck 
│┃友 ${prefix}hornycheck 
│┃友 ${prefix}prettycheck 
│┃友 ${prefix}lovelycheck 
│┃友 ${prefix}uglycheck 
│┃友 ${prefix}pick 
│┃友 ${prefix}pickupline 
│┃友 ${prefix}quotes 
│┃友 ${prefix}can 
│┃友 ${prefix}is 
│┃友 ${prefix}when 
│┃友 ${prefix}where 
│┃友 ${prefix}what 
│┃友 ${prefix}how 
│┃友 ${prefix}rate 
│┃友 ${prefix}cry 
│┃友 ${prefix}kill 
│┃友 ${prefix}hug 
│┃友 ${prefix}pat 
│┃友 ${prefix}lick  
│┃友 ${prefix}kiss 
│┃友 ${prefix}bite 
│┃友 ${prefix}yeet 
│┃友 ${prefix}bully 
│┃友 ${prefix}bonk 
│┃友 ${prefix}wink 
│┃友 ${prefix}poke 
│┃友 ${prefix}nom 
│┃友 ${prefix}slap 
│┃友 ${prefix}smile  
│┃友 ${prefix}wave 
│┃友 ${prefix}awoo 
│┃友 ${prefix}blush 
│┃友 ${prefix}smug 
│┃友 ${prefix}glomp  
│┃友 ${prefix}happy 
│┃友 ${prefix}dance 
│┃友 ${prefix}cringe ??
│┃友 ${prefix}cuddle 
│┃友 ${prefix}highfive  
│┃友 ${prefix}handhold 
│┃友 ${prefix}spank 
│┃友 ${prefix}tickle 
│┃友 ${prefix}feed 
│┃友 ${prefix}checkme  
╰─────────────────────≽
`}

global.stalkermenu = (prefix) => {
return ` 
╭──⧼♛🧝 STALKER MENU 🧝♛ ⧽──≽
│┃友 ${prefix}tiktokstalk 
│┃友 ${prefix}mlstalk 
│┃友 ${prefix}npmstalk 
│┃友 ${prefix}ghstalk 
╰─────────────────────≽
`}

global.stickermenu = (prefix) => {
return ` 
╭──⧼♛🧝 STICKER MENU 🧝♛ ⧽──≽
│┃友 ${prefix}goose 
│┃友 ${prefix}woof 
│┃友 ${prefix}8ball 
│┃友 ${prefix}lizard 
│┃友 ${prefix}meow 
│┃友 ${prefix}gura 
│┃友 ${prefix}telestick 
│┃友 ${prefix}ttp 
╰─────────────────────≽
`}

global.databasemenu = (prefix) => {
return ` 
╭──⧼♛🧝 DATABASE MENU🧝♛ ⧽──≽
│┃友 ${prefix}setcmd 
│┃友 ${prefix}delcmd 
│┃友 ${prefix}listcmd 
│┃友 ${prefix}lockcmd 
│┃友 ${prefix}addmsg 
│┃友 ${prefix}delmsg 
│┃友 ${prefix}getmsg 
│┃友 ${prefix}listmsg 
╰─────────────────────≽
`}

global.storemenu = (prefix) => {
return ` 
╭──⧼♛ 🧝 STORE MENU 🧝 ♛ ⧽──≽
│┃友 ${prefix}list 
│┃友 ${prefix}store 
│┃友 ${prefix}shop 
│┃友 ${prefix}addlist 
│┃友 ${prefix}dellist 
╰─────────────────────≽
`}

global.aimenu = (prefix) => {
return ` 
╭──⧼♛🧝 AI MENU 🧝 ♛ ⧽──≽
│┃友 ${prefix}animate 
│┃友 ${prefix}diffusion-anime 
│┃友 ${prefix}bingai 
│┃友 ${prefix}blackboxai 
│┃友 ${prefix}travel-assistant 
│┃友 ${prefix}guru-ai 
│┃友 ${prefix}emi-ai 
│┃友 ${prefix}claude-ai 
│┃友 ${prefix}costume-ai 
│┃友 ${prefix}herc-ai 
│┃友 ${prefix}hercaiv1 
│┃友 ${prefix}hercai-cartoon 
│┃友 ${prefix}hercai-animefy 
│┃友 ${prefix}hercai-lexica 
│┃友 ${prefix}hercai-prodia 
│┃友 ${prefix}hercai-simurg 
│┃友 ${prefix}hercai-raava 
│┃友 ${prefix}hercai-shonin 
│┃友 ${prefix}realistic 
│┃友 ${prefix}3dmodel 
│┃友 ${prefix}openai-indo 
│┃友 ${prefix}indo-ai 
│┃友 ${prefix}diffusion 
│┃友 ${prefix}photoleap 
│┃友 ${prefix}openai 
│┃友 ${prefix}dalle 
│┃友 ${prefix}ai 
│┃友 ${prefix}remini 
│┃友 ${prefix}simi 
│┃友 ${prefix}removebg 
│┃友 ${prefix}tozombie 
│┃友 ${prefix}toanime 
╰─────────────────────≽
`}

global.randphotomenu = (prefix) => {
return ` 
╭──⧼♛🧝 RANDOM PHOTO 🧝♛ ⧽──≽
│┃友 ${prefix}aesthetic 
│┃友 ${prefix}coffee 
│┃友 ${prefix}wikimedia 
│┃友 ${prefix}wallpaper 
│┃友 ${prefix}art 
│┃友 ${prefix}bts 
│┃友 ${prefix}dogwoof 
│┃友 ${prefix}catmeow 
│┃友 ${prefix}lizardpic 
│┃友 ${prefix}goosebird 
│┃友 ${prefix}8ballpool 
│┃友 ${prefix}cosplay 
│┃友 ${prefix}hacker 
│┃友 ${prefix}cyber 
│┃友 ${prefix}gamewallpaper 
│┃友 ${prefix}islamic 
│┃友 ${prefix}jennie 
│┃友 ${prefix}jiso 
│┃友 ${prefix}satanic 
│┃友 ${prefix}justina 
│┃友 ${prefix}cartoon 
│┃友 ${prefix}pentol 
│┃友 ${prefix}cat 
│┃友 ${prefix}kpop 
│┃友 ${prefix}exo 
│┃友 ${prefix}lisa 
│┃友 ${prefix}space 
│┃友 ${prefix}car 
│┃友 ${prefix}technology 
│┃友 ${prefix}bike 
│┃友 ${prefix}shortquote 
│┃友 ${prefix}antiwork 
│┃友 ${prefix}hacking 
│┃友 ${prefix}boneka 
│┃友 ${prefix}rose 
│┃友 ${prefix}ryujin 
│┃友 ${prefix}ulzzangboy 
│┃友 ${prefix}ulzzanggirl 
│┃友 ${prefix}wallml 
│┃友 ${prefix}wallphone 
│┃友 ${prefix}mountain 
│┃友 ${prefix}goose 
│┃友 ${prefix}profilepic 
│┃友 ${prefix}couplepp 
│┃友 ${prefix}programming 
│┃友 ${prefix}pubg 
│┃友 ${prefix}blackpink 
│┃友 ${prefix}randomboy   
│┃友 ${prefix}randomgirl 
│┃友 ${prefix}hijab   
│┃友 ${prefix}chinese 
│┃友 ${prefix}indo 
│┃友 ${prefix}japanese 
│┃友 ${prefix}korean 
│┃友 ${prefix}malay 
│┃友 ${prefix}thai 
│┃友 ${prefix}vietnamese 
╰─────────────────────≽
`}

global.randvideomenu = (prefix) => {
return ` 
╭──⧼♛🧝 RANDOM VIDEO 🧝♛ ⧽──≽
│┃友 ${prefix}tiktokgirl 
│┃友 ${prefix}tiktoknukthy 
│┃友 ${prefix}tiktokkayes 
│┃友 ${prefix}tiktokpanrika 
│┃友 ${prefix}tiktoknotnot 
│┃友 ${prefix}tiktokghea 
│┃友 ${prefix}tiktoksantuy 
│┃友 ${prefix}tiktokbocil 
╰─────────────────────≽
`}

global.nsfwmenu = (prefix) => {
return ` 
╭──⧼♛🧝 ANIME NSFW 🧝♛ ⧽──≽
│┃友 ${prefix}hentai 
│┃友 ${prefix}gifblowjob 
│┃友 ${prefix}hentaivid 
│┃友 ${prefix}hneko 
│┃友 ${prefix}nwaifu 
│┃友 ${prefix}animespank 
│┃友 ${prefix}trap 
│┃友 ${prefix}blowjob 
│┃友 ${prefix}cuckold 
│┃友 ${prefix}milf 
│┃友 ${prefix}eba 
│┃友 ${prefix}pussy 
│┃友 ${prefix}yuri 
│┃友 ${prefix}zettai 
╰─────────────────────≽
`}

global.gamemenu = (prefix) => {
return ` 
╭──⧼♛🧝 GAME MENU🧝♛ ⧽──≽
│┃友 ${prefix}truth 
│┃友 ${prefix}dare 
│┃友 ${prefix}suit 
│┃友 ${prefix}tictactoe 
│┃友 ${prefix}math 
╰─────────────────────≽
`}

global.religionmenu = (prefix) => {
return ` 
╭──⧼♛🧝 RELIGON MENU 🧝♛ ⧽──≽
│┃友 ${prefix}bible 
│┃友 ${prefix}quran 
│┃友 ${prefix}gita 
╰─────────────────────≽
`}

global.searchmenu = (prefix) => {
return ` 
╭──⧼♛🧝 SEARCH MENU 🧝♛ ⧽──≽
│┃友 ${prefix}google 
│┃友 ${prefix}wikipedia 
│┃友 ${prefix}ytsearch 
│┃友 ${prefix}xnxxsearch 
│┃友 ${prefix}xvideosearch 
│┃友 ${prefix}apksearch 
│┃友 ${prefix}stickersearch 
│┃友 ${prefix}imdb 
│┃友 ${prefix}wanumber 
│┃友 ${prefix}friend 
│┃友 ${prefix}lyrics 
╰─────────────────────≽
`}

global.convertmenu = (prefix) => {
return ` 
╭──⧼♛ 🧝CONVERT MENU 🧝♛ ⧽──≽
│┃友 ${prefix}obfuscate 
│┃友 ${prefix}styletext 
│┃友 ${prefix}fliptext 
│┃友 ${prefix}tts 
│┃友 ${prefix}say 
│┃友 ${prefix}togif 
│┃友 ${prefix}toqr 
│┃友 ${prefix}bass 
│┃友 ${prefix}blown 
│┃友 ${prefix}deep 
│┃友 ${prefix}earrape 
│┃友 ${prefix}fast 
│┃友 ${prefix}fat 
│┃友 ${prefix}nightcore 
│┃友 ${prefix}reverse 
│┃友 ${prefix}robot 
│┃友 ${prefix}slow 
│┃友 ${prefix}smooth 
│┃友 ${prefix}squirrel 
│┃友 ${prefix}tinyurl 
│┃友 ${prefix}tovn 
│┃友 ${prefix}toaudio 
│┃友 ${prefix}tomp3 
│┃友 ${prefix}tomp4
│┃友 ${prefix}toimg 
│┃友 ${prefix}toonce 
│┃友 ${prefix}sticker 
│┃友 ${prefix}smeme 
│┃友 ${prefix}smeta 
│┃友 ${prefix}take 
│┃友 ${prefix}emoji 
│┃友 ${prefix}volaudio 
│┃友 ${prefix}volvideo 
│┃友 ${prefix}ebinary 
│┃友 ${prefix}dbinary 
│┃友 ${prefix}ssweb 
│┃友 ${prefix}quoted 
│┃友 ${prefix}translate 
╰─────────────────────≽
`}

global.listmenu = (prefix) => {
return `
╭──⧼♛🧝 LIST MENU 🧝 ♛ ⧽──≽
│┃友 ${prefix}listprem 
│┃友 ${prefix}listowner 
│┃友 ${prefix}liststicker 
│┃友 ${prefix}listimage 
│┃友 ${prefix}listvideo 
│┃友 ${prefix}listvn 
│┃友 ${prefix}listapk 
│┃友 ${prefix}listzip 
│┃友 ${prefix}listpdf 
│┃友 ${prefix}listbadword 
│┃友 ${prefix}listpc 
│┃友 ${prefix}listgc 
╰─────────────────────≽
`}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})