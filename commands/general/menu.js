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
      menuText += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      const categoryEmojis = {
        general: "🧭",
        ai: "🤖",
        group: "👥",
        admin: "🛡️",
        owner: "👑",
        media: "🎬",
        fun: "🎉",
        utility: "🛠️",
        anime: "👾",
        textmaker: "🖋️"
      };

      const commandStyles = {
        general: "🔹",
        ai: "⚡",
        group: "🔰",
        admin: "🛡",
        owner: "👑",
        media: "🎵",
        fun: "🎲",
        utility: "🔧",
        anime: "🔥",
        textmaker: "✍️"
      };

      const addCategory = (key, title) => {
        if (categories[key]) {
          menuText += `╭─❍ ${categoryEmojis[key]} ${title}\n`;
          categories[key].forEach(cmd => {
            menuText += `│ ${commandStyles[key]} ${config.prefix}${cmd.name} ⚡\n`;
          });
          menuText += `╰───────────────⬣\n\n`;
        }
      };

      addCategory("general", "GENERAL");
      addCategory("ai", "AI SYSTEM");
      addCategory("group", "GROUP CONTROL");
      addCategory("admin", "ADMIN PANEL");
      addCategory("owner", "OWNER PANEL");
      addCategory("media", "MEDIA SYSTEM");
      addCategory("fun", "FUN ZONE");
      addCategory("utility", "UTILITY TOOLS");
      addCategory("anime", "ANIME WORLD");
      addCategory("textmaker", "TEXTMAKER LAB");

      menuText += `✨ Type ${config.prefix}help <command>\n`;
      menuText += `🚀 Version: 2.0.0 Ultra\n`;

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
