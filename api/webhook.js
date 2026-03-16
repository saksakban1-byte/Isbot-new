export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.status(200).send("ok");

  const chatId = msg.chat.id;

  // Text aus message oder Entities extrahieren
  let text = msg.text || "";
  if (msg.entities && msg.entities[0]?.type === "bot_command") {
    text = text.slice(msg.entities[0].offset, msg.entities[0].length);
  }

  // Entfernt ALLE unsichtbaren Unicode-Zeichen, Steuerzeichen, Formatierungszeichen
  const normalize = s =>
    s
      .normalize("NFKC") // Unicode Normalisierung
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Steuerzeichen
      .replace(/[\u200B-\u200F]/g, "") // Zero-Width
      .replace(/[\u202A-\u202E]/g, "") // RTL/LTR Formatierung
      .replace(/[\u2060-\u206F]/g, "") // Word Joiner etc.
      .replace(/\uFEFF/g, "") // BOM
      .replace(/\s+/g, "") // alle Spaces (auch Zero-Width)
      .trim()
      .toLowerCase();

  const clean = normalize(text.split("@")[0]);

  async function send(text) {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }

  // Commands
  if (clean === "/menu") {
    return send("Hauptmenü:\n/metals – Met
