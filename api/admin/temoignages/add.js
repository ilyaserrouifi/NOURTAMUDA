const { execute } = require('../../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { nom, niveau, note, texte } = req.body;
    if (!nom || !texte) return res.status(400).json({ success: false, message: 'Nom et témoignage requis' });
    await execute('INSERT INTO temoignages (nom, niveau, note, texte, actif) VALUES ($1, $2, $3, $4, true)', [nom, niveau || '', parseInt(note) || 5, texte]);
    res.status(200).json({ success: true, message: 'Témoignage ajouté' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
