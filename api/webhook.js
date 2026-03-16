export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.status(200).send("ok");

  const chatId = msg.chat.id;
  const text = msg.text || "";

  // Normalisierung: entfernt Bot-Suffix, Leerzeichen, Zero-Width, Groß/Klein
  const clean = text
    .split("@")[0]        // entfernt z.B. /metals@Tradisbot
    .trim()               // entfernt Leerzeichen / unsichtbare Zeichen
    .toLowerCase();       // macht alles klein

  async function send(text) {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }

  // Menü
  if (clean === "/menu") {
    return send(
      "Hauptmenü:\n" +
      "/metals – Metalle\n" +
      "/crypto – Krypto\n" +
      "/forex – Forex\n"
    );
  }

  // Metals
  if (clean === "/metals") {
    return send(
      "Metals Menü:\n" +
      "XAUUSD\n" +
      "XAGUSD\n" +
      "XAUAUD"
    );
  }

  // Crypto
  if (clean === "/crypto") {
    return send(
      "Crypto Menü:\n" +
      "BTCUSD\n" +
      "ETHUSD\n" +
      "XRPUSD"
    );
  }

  // Forex
  if (clean === "/forex") {
    return send(
      "Forex Menü:\n" +
      "EURUSD\n" +
      "GBPUSD\n" +
      "USDJPY"
    );
  }

  // Fallback
  return send("ISBOT aktiv. Nutze /menu.");
}
