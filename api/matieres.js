const { query } = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });
  
  try {
    const matieres = await query('SELECT id, nom, icone, description, niveaux FROM matieres WHERE actif = true ORDER BY ordre_affichage');
    res.status(200).json({ success: true, data: matieres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
