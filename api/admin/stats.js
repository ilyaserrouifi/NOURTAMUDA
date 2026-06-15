const { query } = require('../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const matieres = await query('SELECT COUNT(*) as count FROM matieres WHERE actif = true');
    const professeurs = await query('SELECT COUNT(*) as count FROM professeurs WHERE actif = true');
    const offres = await query('SELECT COUNT(*) as count FROM offres WHERE actif = true');
    const messagesNonLus = await query('SELECT COUNT(*) as count FROM messages WHERE lu = false');
    const derniersMessages = await query('SELECT id, nom, email, telephone, message, lu, date FROM messages ORDER BY date DESC LIMIT 10');
    
    res.status(200).json({ 
      success: true, 
      data: {
        matieres: parseInt(matieres[0]?.count || 0),
        professeurs: parseInt(professeurs[0]?.count || 0),
        offres: parseInt(offres[0]?.count || 0),
        messages_non_lus: parseInt(messagesNonLus[0]?.count || 0),
        derniers_messages: derniersMessages
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
