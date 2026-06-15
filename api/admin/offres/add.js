const { execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { nom, prix, duree, matieres, niveau, description } = req.body;
    if (!nom || !prix) return res.status(400).json({ success: false, message: 'Nom et prix requis' });
    await execute('INSERT INTO offres (nom, prix, duree, matieres, niveau, description, actif) VALUES ($1, $2, $3, $4, $5, $6, true)', [nom, prix, duree || '', matieres || '', niveau || '', description || '']);
    res.status(200).json({ success: true, message: 'Offre ajoutée' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
