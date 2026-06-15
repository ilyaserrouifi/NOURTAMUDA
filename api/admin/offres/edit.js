const { execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { id, nom, prix, duree, matieres, niveau, description } = req.body;
    if (!id || !nom) return res.status(400).json({ success: false, message: 'Données invalides' });
    await execute('UPDATE offres SET nom = $1, prix = $2, duree = $3, matieres = $4, niveau = $5, description = $6, updated_at = NOW() WHERE id = $7', [nom, prix, duree || '', matieres || '', niveau || '', description || '', id]);
    res.status(200).json({ success: true, message: 'Offre modifiée' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
