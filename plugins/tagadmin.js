const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../database/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../database/antibot")
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');


zokou({ nomCom: "tagadmin", categorie: 'Group', reaction: "🪰" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) { 
    repondre("🚫 thís cσmmαnd ís rєsєrvєd fσr grσups"); 
    return; 
  }

  if (!verifAdmin && !superUser) { 
    repondre("🚫 cσmmαnd ís rєsєrvєd fσr grσups"); 
    return; 
  }

  let mess = arg && arg !== ' ' ? arg.join(' ') : 'Aucun Message';

  let adminsGroupe = infosGroupe.participants.filter(membre => membre.admin); // Filtering only admins

  let tag = `  
*👤 Group :* ${nomGroupe} 
*👋 Hey :* ${nomAuteurMessage}* 
*📝 Message :* *${mess}* 
`;

  let emoji = ['🤔', '🥏'];
  let random = Math.floor(Math.random() * emoji.length);

  for (const membre of adminsGroupe) {
    tag += `${emoji[random]} @${membre.id.split("@")[0]}\n`;
  }

  zk.sendMessage(dest, { text: tag, mentions: adminsGroupe.map(i => i.id) }, { quoted: ms });

});
