export default async function handler(req, res) {
  const msg = req.body?.message;
  const chatId = msg?.chat?.id;
  const text = msg?.text;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `DEBUG START: "${text}"`
    })
  });

  return res.status(200).send("ok");
}
