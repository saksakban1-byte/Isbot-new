export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.status(200).send("ok");

  const chatId = msg.chat.id;
  const text = msg.text || "";

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Ich habe empfangen: "${text}"`
    })
  });

  return res.status(200).send("ok");
}
