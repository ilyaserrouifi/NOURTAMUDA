const { queryOne, execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { nom, icone, niveaux, description } = req.body;
    if (!nom) return res.status(400).json({ success: false, message: 'Le nom est requis' });
    
    const nextOrder = await queryOne('SELECT COALESCE(MAX(ordre_affichage), 0) + 1 as next_order FROM matieres');
    const order = nextOrder?.next_order || 1;
    await execute('INSERT INTO matieres (nom, icone, niveaux, description, ordre_affichage, actif) VALUES ($1, $2, $3, $4, $5, true)', [nom, icone || '📚', niveaux || '', description || '', order]);
    res.status(200).json({ success: true, message: 'Matière ajoutée' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
