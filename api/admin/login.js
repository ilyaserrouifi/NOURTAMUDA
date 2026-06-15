const { queryOne } = require('../db');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: 'Identifiants requis' });
    
    const user = await queryOne('SELECT id, username, password_hash FROM admin_users WHERE username = $1', [username]);
    
    if (user && bcrypt.compareSync(password, user.password_hash)) {
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
      return res.status(200).json({ success: true, data: { id: user.id, username: user.username, token }, message: 'Connexion réussie' });
    }
    res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
