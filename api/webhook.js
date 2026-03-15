export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.status(200).send("ok");

  const chatId = msg.chat.id;
  const text = msg.text || "";

  async function send(text) {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }

  // Menü
  if (text.startsWith("/menu")) {
    return send(
      "Hauptmenü:\n" +
      "/metals – Metalle\n" +
      "/crypto – Krypto\n" +
      "/forex – Forex\n"
    );
  }

  // Metals
  if (text.startsWith("/metals")) {
    const pairs = ["XAUUSD", "XAGUSD", "XAUAUD"];
    let msg = "Metals Menü:\n";

    for (const p of pairs) {
      msg += `${p} — Preis: n/a — Score: ${Math.floor(Math.random() * 100)}\n`;
    }

    return send(msg);
  }

  // Crypto
  if (text.startsWith("/crypto")) {
    const pairs = ["BTCUSD", "ETHUSD", "XRPUSD"];
    let msg = "Crypto Menü:\n";

    for (const p of pairs) {
      msg += `${p} — Preis: n/a — Score: ${Math.floor(Math.random() * 100)}\n`;
    }

    return send(msg);
  }

  // Forex
  if (text.startsWith("/forex")) {
    const pairs = ["EURUSD", "GBPUSD", "USDJPY"];
    let msg = "Forex Menü:\n";

    for (const p of pairs) {
      msg += `${p} — Preis: n/a — Score: ${Math.floor(Math.random() * 100)}\n`;
    }

    return send(msg);
  }

  // Fallback
  return send("ISBOT aktiv. Nutze /menu.");
}
