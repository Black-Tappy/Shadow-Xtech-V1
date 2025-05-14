
const {zokou}=require("../framework/zokou")







zokou({nomCom:"reboot",categorie:"Mods",reaction:"👨🏿‍💼"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("🚫 This command is for owner only");
  }

  const {exec}=require("child_process")

    repondre("*Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ restarting ...*");

  exec("pm2 restart all");
  

  



})
