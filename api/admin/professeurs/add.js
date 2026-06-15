const { queryOne, execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { nom, photo, matiere, experience, bio } = req.body;
    if (!nom) return res.status(400).json({ success: false, message: 'Le nom est requis' });
    
    let matiereId = null;
    if (matiere) {
      const mat = await queryOne('SELECT id FROM matieres WHERE nom ILIKE $1 LIMIT 1', [`%${matiere}%`]);
      if (mat) matiereId = mat.id;
    }
    await execute('INSERT INTO professeurs (nom, photo, matiere_id, experience, bio, actif) VALUES ($1, $2, $3, $4, $5, true)', [nom, photo || '', matiereId, experience || '', bio || '']);
    res.status(200).json({ success: true, message: 'Professeur ajouté' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
