export default async function handler(req, res) {
  const msg = req.body?.message;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: msg?.chat?.id ?? 0,
      text: "Webhook läuft!"
    })
  });

  return res.status(200).send("ok");
}
