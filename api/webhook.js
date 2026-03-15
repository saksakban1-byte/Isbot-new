export default async function handler(req, res) {
  const chatId = req.body?.message?.chat?.id;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "TEST: Webhook aktiv"
    })
  });

  return res.status(200).send("ok");
}
