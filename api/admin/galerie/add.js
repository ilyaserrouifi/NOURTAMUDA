const { execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { url, titre } = req.body;
    if (!url) return res.status(400).json({ success: false, message: 'URL requise' });
    await execute('INSERT INTO galerie (url, titre, actif) VALUES ($1, $2, true)', [url, titre || '']);
    res.status(200).json({ success: true, message: 'Image ajoutée' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
