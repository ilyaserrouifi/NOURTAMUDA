const { execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { id, nom, niveau, note, texte } = req.body;
    if (!id || !nom) return res.status(400).json({ success: false, message: 'Données invalides' });
    await execute('UPDATE temoignages SET nom = $1, niveau = $2, note = $3, texte = $4 WHERE id = $5', [nom, niveau || '', parseInt(note) || 5, texte, id]);
    res.status(200).json({ success: true, message: 'Témoignage modifié' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
