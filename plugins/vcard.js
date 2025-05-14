const {
  adams
} = require("../framework/zokou");
const {
  Sticker,
  StickerTypes
} = require('wa-sticker-formatter');
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require("../database/antilien");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require("../database/antibot");
const {
  search,
  download
} = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require('../config');
const {
  default: axios
} = require("axios");
const {
  getBinaryNodeChild,
  getBinaryNodeChildren
} = require('@whiskeysockets/baileys')['default'];

adams({
  nomCom: 'vcf',
  categorie: "Group",
  reaction: '⚪'
}, async (client, message, context) => {
  const { ms, repondre, verifGroupe, verifAdmin } = context;

  if (!verifAdmin) {
    repondre("🚫 You are not an admin here!");
    return;
  }

  if (!verifGroupe) {
    repondre("🚫 This command works in groups only");
    return;
  }

  let groupMetadata = await client.groupMetadata(message);
  let vCardData = "Shadow-Xtech";
  let contactIndex = 0;

  for (let participant of groupMetadata.participants) {
    vCardData += `BEGIN:VCARD\nVERSION:3.0\nFN:[${contactIndex++}] +${participant.id.split('@')[0]} \nTEL;type=CELL;type=VOICE;waid=${participant.id.split('@')[0]}:+${participant.id.split('@')[0]}\nEND:VCARD\n`;
  }

  repondre(`A moment, *Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ* is compiling 📂 ${groupMetadata.participants.length} contacts into a vcf...`);
  await fs.writeFileSync('./contacts.vcf', vCardData.trim());

  await client.sendMessage(message, {
    document: fs.readFileSync('./contacts.vcf'),
    mimetype: 'text/vcard',
    fileName: `${groupMetadata.subject}.vcf`,
    caption: `📂 VCF for ${groupMetadata.subject}\nTotal Contacts: ${groupMetadata.participants.length}\n*keep using Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ*`
  });

  fs.unlinkSync('./contacts.vcf');
});
