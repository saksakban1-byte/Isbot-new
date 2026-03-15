export default async function handler(req, res) {
  const message = req.body?.message;
  if (!message) return res.status(200).send("ok");

  const chatId = message.chat.id;

  const gold = await fetch("https://api.exchangerate.host/latest?base=XAU&symbols=USD")
    .then(r => r.json())
    .then(d => d.rates.USD);

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: `Goldpreis: ${gold} USD` })
  });

  res.status(200).send("ok");
}
