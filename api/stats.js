const { queryOne } = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });
  
  try {
    let stats = await queryOne('SELECT eleves, professeurs, annees, taux_reussite FROM stats ORDER BY id DESC LIMIT 1');
    if (!stats) stats = { eleves: 428, professeurs: 12, annees: 8, taux_reussite: 96 };
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
