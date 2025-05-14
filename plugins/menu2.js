const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../config");

adams({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "🌅Good Morning, the sun is up, the day is yours 🌄";
    if (hour >= 12 && hour < 18) {
        greeting = "🌄Good afternnon! Stay energized! 🌿";
    } else if (hour >= 18) {
        greeting = "🌇Good Everning! Hope you had a great day! 🌙";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Night 🌙 let the night settle in, but keep your dreams wide awake 🌌";
    }

    // Generate commands list
    let commandList = "\n\nAvailable Commands";
    for (let category in coms) {
        commandList += `\n\n*${category}*\n`;
        commandList += coms[category].map((cmd) => `- ${prefixe}${cmd}`).join("\n");
    }

    let infoMsg = `
╭────✧〈 *Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ* 〉 ✧───◆
┴╭─────────────❍
┃🤖│ʙᴏᴛ ɴᴀᴍᴇ: *Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ*
┃👑│ʙᴏᴛ ᴜsᴇʀ: *${nomAuteurMessage}*
┃📡│ᴍᴏᴅᴇ: *${mode}*
┃🪙│ᴘʀᴇғɪx: *[ ${prefixe} ]*
┃🖥️│ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
┃📆│ᴅᴀᴛᴇ: *${date}*
┃⏳│ᴛɪᴍᴇ: *${temps}*
┃⚙️│ᴄᴏᴍᴍᴀɴᴅs: *${cm.length}*
┃🧬│ᴄᴀᴘᴀᴄɪᴛʏ: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┬╰──────────────☹︎
╰─── ···▸Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ··──◆❍`

🌟 *${greeting}* 🌟


‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎

${commandList}`;

    // Two sets of images to display randomly
    const extraImages1 = [
        "https://files.catbox.moe/3hrxbh.jpg",
        "https://files.catbox.moe/w6mzc7.jpg",
        "https://files.catbox.moe/blm95h.jpg"
    ];

    const extraImages2 = [
        "https://files.catbox.moe/3hrxbh.jpg",
        "https://files.catbox.moe/w6mzc7.jpg",
        "https://files.catbox.moe/blm95h.jpg"
    ];

    // Randomly select which menu to show
    const isOriginalMenu = Math.random() > 0.5; // 50% chance for either menu

    let mediaUrl, thumbnail, renderType;
    if (isOriginalMenu) {
        mediaUrl = mybotpic(); // Use bot’s original picture
        thumbnail = extraImages1[Math.floor(Math.random() * extraImages1.length)];
        renderType = "renderLargerThumbnail";
    } else {
        mediaUrl = extraImages2[Math.floor(Math.random() * extraImages2.length)];
        thumbnail = mediaUrl; // Use the same image as media
        renderType = "renderSmallThumbnail";
    }

    try {
        if (mediaUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: mediaUrl },
                caption: infoMsg,
                footer: "*Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ*, developed by Ⴊl𐌀Ꮳk𐌕𐌀ႲႲჄ",
                gifPlayback: true,
                contextInfo: {
                    externalAdReply: {
                        title: "Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ",
                        body: "Tap here to Join our official channel!",
                        mediaType: 1,
                        thumbnailUrl: thumbnail,
                        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                image: { url: mediaUrl },
                caption: infoMsg,
                footer: "*Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ*, developed by Ⴊl𐌀Ꮳk𐌕𐌀ႲႲჄ",
                contextInfo: {
                    externalAdReply: {
                        title: "Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ",
                        body: "Tap here to Join our official channel!",
                        mediaType: 1,
                        thumbnailUrl: thumbnail,
                        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        }
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
    }

    // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/jrfk1n.mp3",
        "https://files.catbox.moe/jgrfm3.mp3",
        "https://files.catbox.moe/xwn7ix.mp3",
        "https://files.catbox.moe/7082wn.mp3",
        "https://files.catbox.moe/k41qij.mp3" // New song added
    ];

    // Select a random audio file
    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as a voice note
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});
