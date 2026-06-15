const { query } = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });
  
  try {
    const professeurs = await query(`
      SELECT p.*, m.nom as matiere_nom, m.icone as matiere_icone
      FROM professeurs p
      LEFT JOIN matieres m ON p.matiere_id = m.id
      WHERE p.actif = true
      ORDER BY p.ordre_affichage
    `);
    res.status(200).json({ success: true, data: professeurs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
