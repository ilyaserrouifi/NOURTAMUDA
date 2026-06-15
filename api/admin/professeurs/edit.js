const { queryOne, execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { id, nom, photo, matiere, experience, bio } = req.body;
    if (!id || !nom) return res.status(400).json({ success: false, message: 'Données invalides' });
    
    let matiereId = null;
    if (matiere) {
      const mat = await queryOne('SELECT id FROM matieres WHERE nom ILIKE $1 LIMIT 1', [`%${matiere}%`]);
      if (mat) matiereId = mat.id;
    }
    await execute('UPDATE professeurs SET nom = $1, photo = $2, matiere_id = $3, experience = $4, bio = $5, updated_at = NOW() WHERE id = $6', [nom, photo || '', matiereId, experience || '', bio || '', id]);
    res.status(200).json({ success: true, message: 'Professeur modifié' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
