const axios = require("axios");
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");

let dynamicForks = 5000;

const fetchGitHubRepoDetails = async () => {
  try {
    const response = await axios.get("https://api.https://github.com/Black-Tappy/Shadow-Xtech-V1");
    const { 
      name, 
      stargazers_count, 
      watchers_count, 
      open_issues_count, 
      forks_count, 
      owner 
    } = response.data;
    
    dynamicForks += forks_count;
    
    return {
      'name': name,
      'stars': stargazers_count,
      'watchers': watchers_count,
      'issues': open_issues_count,
      'forks': dynamicForks,
      'owner': owner.login,
      'url': response.data.html_url
    };
  } catch (error) {
    console.error("🚫 Error fetching GitHub repository details:", error);
    return null;
  }
};

const commands = ["git", "repo2", "script", 'sc'];

commands.forEach(command => {
  zokou({
    'nomCom': command,
    'categorie': "GitHub"
  }, async (destination, zk, commandOptions) => {
    let { repondre } = commandOptions;
    const repoDetails = await fetchGitHubRepoDetails();
    
    if (!repoDetails) {
      repondre("❌ Failed to fetch GitHub repository information.");
      return;
    }

    const { 
      name, 
      stars, 
      watchers, 
      issues, 
      forks, 
      owner, 
      url 
    } = repoDetails;

    const currentDate = moment().tz("Africa/Nairobi").format("DD/MM/YYYY HH:mm:ss");
    
    const messageContent = `
    ♦️ *${name} REPO INFO* ♦️

    👑 *Name:* ${name}
    ⭐ *Stars:* ${stars.toLocaleString()}
    🍴 *Forks:* ${forks.toLocaleString()}
    👀 *Watchers:* ${watchers.toLocaleString()}
    🚧 *Open Issues:* ${issues.toLocaleString()}
    👤 *Owner:* ${owner}

    🗓️ *Fetched on:* ${currentDate}

    🔗 *Repo Link:* ${url}

    🎲 Scripted by *Ⴊl𐌀Ꮳk𐌕𐌀ႲႲჄ*

    😇 Stay connected and follow my updates!
    `;

    try {
      await zk.sendMessage(destination, {
        'text': messageContent,
        'contextInfo': {
          'externalAdReply': {
            'title': "😊 Stay Updated with Sʜᴀᴅᴏᴡ-Xᴛᴇᴄʜ",
            'body': "Tap here for the latest updates!",
            'thumbnailUrl': "https://files.catbox.moe/3hrxbh.jpg",
            'mediaType': 1,
            'renderLargerThumbnail': true,
            'mediaUrl': "https://files.catbox.moe/3hrxbh.jpg",
            'sourceUrl': "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10"
          }
        }
      });
    } catch (error) {
      console.error("❌ Error sending GitHub info:", error);
      repondre("❌ Error sending GitHub info: " + error.message);
    }
  });
});
