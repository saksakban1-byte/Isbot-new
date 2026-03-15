const fetch = require("node-fetch");

async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

module.exports = async (req, res) => {
  const msg = req.body.message;
  if (!msg) return res.send("ok");

  const chatId = msg.chat.id;
  const text = msg.text || "";

  if (text === "/gold") {
    const gold = await fetch("https://api.exchangerate.host/latest?base=XAU&symbols=USD")
      .then(r => r.json())
      .then(d => d.rates.USD);

    await sendMessage(chatId, `Goldpreis: ${gold} USD`);
  } else {
    await sendMessage(chatId, "ISBOT Webhook aktiv. Nutze /gold für Live-Daten.");
  }

  res.send("ok");
};
