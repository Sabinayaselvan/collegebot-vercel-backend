// api/chat.js
//chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const BOT_ID = process.env.BOT_ID;
  const API_KEY = process.env.API_KEY;

  try {
    const botpressRes = await fetch('https://api.botpress.cloud/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bot-Id': BOT_ID,
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        messages: messages || []
      })
    });

    const data = await botpressRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Botpress API call failed', details: err.message });
  }
}
