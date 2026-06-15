const { execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { id, nom, icone, niveaux, description } = req.body;
    if (!id || !nom) return res.status(400).json({ success: false, message: 'Données invalides' });
    await execute('UPDATE matieres SET nom = $1, icone = $2, niveaux = $3, description = $4, updated_at = NOW() WHERE id = $5', [nom, icone || '📚', niveaux || '', description || '', id]);
    res.status(200).json({ success: true, message: 'Matière modifiée' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
