/**
 * Ultra Premium Menu Command
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');
const os = require('os');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'general',
  description: 'Show all available commands',
  usage: '.menu',
  
  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};

      commands.forEach((cmd, name) => {
        if (cmd.name === name) {
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd);
        }
      });

      const ownerNumbers = Array.isArray(config.ownerNumber)
        ? config.ownerNumber
        : [config.ownerNumber];

      const isOwner = ownerNumbers.includes(extra.sender.split('@')[0]);

      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

      const timeNow = new Date().toLocaleString();

      let menuText = `╭━━〔 ✨ ${config.botName} ✨ 〕━━⬣\n\n`;
      menuText += `👤 User: @${extra.sender.split('@')[0]} ${isOwner ? "💎 PREMIUM" : ""}\n`;
      menuText += `⚡ Prefix: ${config.prefix}\n`;
      menuText += `📦 Total Commands: ${commands.size}\n`;
      menuText += `⏳ Uptime: ${hours}h ${minutes}m ${seconds}s\n`;
      menuText += `🧠 RAM Used: ${ramUsage} MB / ${totalRam} GB\n`;
      menuText += `🖥️ Platform: ${os.platform()}\n`;
      menuText += `🕒 Time: ${timeNow}\n`;
      menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━⬣\n\n`;
      
      // General Commands
      if (categories.general) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🧭 GENERAL COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.general.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // AI Commands
      if (categories.ai) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🤖 AI COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.ai.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Group Commands
      if (categories.group) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🔵 GROUP COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.group.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Admin Commands
      if (categories.admin) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🛡️ ADMIN COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.admin.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Owner Commands
      if (categories.owner) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 👑 OWNER COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.owner.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Media Commands
      if (categories.media) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🎞️ MEDIA COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.media.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Fun Commands
      if (categories.fun) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🎭 FUN COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.fun.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Utility Commands
      if (categories.utility) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🔧 UTILITY COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.utility.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }

       // Anime Commands
       if (categories.anime) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 👾 ANIME COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.anime.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }

       // Textmaker Commands
       if (categories.utility) {
        menuText += `╭━━━━━━━━━━━━━━━━━❍\n`;
        menuText += `┃ 🖋️ TEXTMAKER COMMAND\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━⬣\n`;
        categories.textmaker.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      menuText += `╰━━━━━━━━━━━━━━━━━⬣\n\n`;
      menuText += `💡 Type ${config.prefix}help <command> for more info\n`;
      menuText += `🌟 Bot Version: 1.0.0\n`;
      
      // Random Image
            const menuImages = [
              'https://files.catbox.moe/xy39v1.jpg',
              'https://files.catbox.moe/b07g3l.jpg',
              'https://files.catbox.moe/1w2p6m.jpg',
              'https://files.catbox.moe/a20x4m.jpg',
              'https://files.catbox.moe/ksf3fk.jpg',
              'https://files.catbox.moe/kcx25e.jpg',
              'https://files.catbox.moe/9urr8i.jpg',
              'https://files.catbox.moe/5zmu29.jpg',
              'https://files.catbox.moe/8wpfg4.jpg',
              'https://files.catbox.moe/ax9lih.jpg',
              'https://files.catbox.moe/1g814h.jpg'
            ];
      
            const randomImage =
              menuImages[Math.floor(Math.random() * menuImages.length)];
      
            await sock.sendMessage(extra.from, {
              image: { url: randomImage },
              caption: menuText,
              mentions: [extra.sender],
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid:
                    config.newsletterJid || '120363422524788798@newsletter',
                  newsletterName: config.botName,
                  serverMessageId: -1
                }
              }
            }, { quoted: msg });
      
          } catch (error) {
            await extra.reply(`❌ Error: ${error.message}`);
          }
        }
      };
