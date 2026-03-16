export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.status(200).send("ok");

  const chatId = msg.chat.id;

  // Text aus message oder aus Entities extrahieren
  let text = msg.text || "";
  if (msg.entities && msg.entities[0]?.type === "bot_command") {
    text = text.slice(msg.entities[0].offset, msg.entities[0].length);
  }

  // Entfernt ALLE unsichtbaren Unicode-Zeichen
  const removeInvisible = s =>
    s.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F]/g, "");

  // Normalisierung
  const clean = removeInvisible(text)
    .split("@")[0]
    .trim()
    .toLowerCase();

  async function send(text) {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }

  // Commands
  if (clean === "/menu") {
    return send("Hauptmenü:\n/metals – Metalle\n/crypto – Krypto\n/forex – Forex");
  }

  if (clean === "/metals") {
    return send("Metals Menü:\nXAUUSD\nXAGUSD\nXAUAUD");
  }

  if (clean === "/crypto") {
    return send("Crypto Menü:\nBTCUSD\nETHUSD\nXRPUSD");
  }

  if (clean === "/forex") {
    return send("Forex Menü:\nEURUSD\nGBPUSD\nUSDJPY");
  }

  return send("ISBOT aktiv. Nutze /menu.");
}
