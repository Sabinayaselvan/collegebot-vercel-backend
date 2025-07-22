// api/chat.js
// chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const BOT_ID = process.env.BOT_ID;  // This must be the Bot ID from your Botpress dashboard
  const API_KEY = process.env.API_KEY; // This is the Botpress API Key

  try {
    const response = await fetch(`https://api.botpress.cloud/v1/bots/${BOT_ID}/converse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Botpress API call failed', details: error.message });
  }
}
