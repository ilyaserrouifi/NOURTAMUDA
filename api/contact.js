const { execute } = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  
  try {
    const { nom, email, telephone, message } = req.body;
    if (!nom || !email || !message) return res.status(400).json({ success: false, message: 'Champs requis' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: 'Email invalide' });
    
    await execute('INSERT INTO messages (nom, email, telephone, message, date) VALUES ($1, $2, $3, $4, NOW())', [nom, email, telephone, message]);
    res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
