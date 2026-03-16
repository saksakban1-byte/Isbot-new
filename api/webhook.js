export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.status(200).send("ok");

  const chatId = msg.chat.id;
  const text = msg.text || "";
  const clean = text.split("@")[0];

  async function send(text) {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }

  if (clean === "/menu") {
    return send(
      "Hauptmenü:\n" +
      "/metals – Metalle\n" +
      "/crypto – Krypto\n" +
      "/forex – Forex\n"
    );
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
