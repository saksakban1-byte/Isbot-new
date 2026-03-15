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

  if (text === "/menu") {
    return send(
      "Hauptmenü:\n" +
      "/metals – Metalle\n" +
      "/crypto – Krypto\n" +
      "/forex – Forex\n"
    );
  }

  if (text === "/metals") {
    const pairs = ["XAUUSD", "XAGUSD", "XAUAUD"];
    const results = [];

    for (const p of pairs) {
      const price = await getPrice(p);
      const score = await fakeScore(p); // Platzhalter, gleich ersetzen wir das
      results.push({ pair: p, price, score });
    }

    results.sort((a, b) => b.score - a.score);

    let msg = "Metals Menü:\n";
    results.forEach(r => msg += `${r.pair} — ${r.price} — Score ${r.score}\n`);
    msg += `\nEmpfehlung: ${results[0].pair} (${results[0].score})`;

    return send(msg);
  }

  if (text === "/crypto") {
    const pairs = ["BTCUSD", "ETHUSD", "XRPUSD"];
    const results = [];

    for (const p of pairs) {
      const price = await getPrice(p);
      const score = await fakeScore(p);
      results.push({ pair: p, price, score });
    }

    results.sort((a, b) => b.score - a.score);

    let msg = "Crypto Menü:\n";
    results.forEach(r => msg += `${r.pair} — ${r.price} — Score ${r.score}\n`);
    msg += `\nEmpfehlung: ${results[0].pair} (${results[0].score})`;

    return send(msg);
  }

  if (text === "/forex") {
    const pairs = ["EURUSD", "GBPUSD", "USDJPY"];
    const results = [];

    for (const p of pairs) {
      const price = await getPrice(p);
      const score = await fakeScore(p);
      results.push({ pair: p, price, score });
    }

    results.sort((a, b) => b.score - a.score);

    let msg = "Forex Menü:\n";
    results.forEach(r => msg += `${r.pair} — ${r.price} — Score ${r.score}\n`);
    msg += `\nEmpfehlung: ${results[0].pair} (${results[0].score})`;

    return send(msg);
  }

  await send("ISBOT aktiv. Nutze /menu.");
  res.status(200).send("ok");
}

async function getPrice(symbol) {
  const base = symbol.slice(0, 3); // XAUUSD -> XAU
  const url = `https://api.exchangerate.host/latest?base=${base}&symbols=USD`;
  const data = await fetch(url).then(r => r.json());
  return data.rates.USD;
}

// Platzhalter-Score – hier kommen später Strategien/Indikatoren rein
async function fakeScore(symbol) {
  return Math.floor(Math.random() * 100);
}
