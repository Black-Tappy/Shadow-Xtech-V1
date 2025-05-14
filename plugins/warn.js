
const { zokou } = require('../framework/zokou');
const {ajouterUtilisateurAvecWarnCount , getWarnCountByJID , resetWarnCountByJID} = require('../database/warn')
const s = require("../set")


zokou(
    {
        nomCom : 'warn',
        categorie : 'Group'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser,verifGroupe,verifAdmin , msgRepondu , auteurMsgRepondu} = commandeOptions;
if(!verifGroupe ) {repondre('🚫 this is a group commands') ; return};

if(verifAdmin || superUser) {
   if(!msgRepondu){repondre('💬 reply a message of user to warn'); return};
   
   if (!arg || !arg[0] || arg.join('') === '') {
    await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu)
   let warn = await getWarnCountByJID(auteurMsgRepondu)
   let warnlimit = s.WARN_COUNT
   
   if( warn >= warnlimit ) { await repondre('🚫 this user reach limit of warning , so i kick him/her');
                zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove")
 } else { 

    var rest = warnlimit - warn ;
     repondre(`👤 this user is warn , rest before kick : ${rest} `)
   }
} else if ( arg[0] === 'reset') { await resetWarnCountByJID(auteurMsgRepondu) 

    repondre("🚫 Warn count is reset for this user")} else ( repondre('💬 reply to a user by typing  .warn ou .warn reset'))
   
}  else {
    repondre('🚫 you are not admin')
}
 
   });
