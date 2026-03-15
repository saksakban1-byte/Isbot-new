export default async function handler(req, res) {
  const msg = req.body?.message;
  const text = msg?.text || "";
  const chatId = msg?.chat?.id;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Empfangen: "${text}"`
    })
  });

  return res.status(200).send("ok");
}
