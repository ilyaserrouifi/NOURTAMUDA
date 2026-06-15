const { query } = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });
  
  try {
    const temoignages = await query(`
      SELECT id, nom, niveau, note, texte 
      FROM temoignages 
      WHERE actif = true 
      ORDER BY id DESC 
      LIMIT 10
    `);
    res.status(200).json({ success: true, data: temoignages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
