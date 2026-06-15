module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    res.status(200).json({ success: true, data: { admin_id: 1, username: 'admin' } });
  } else {
    res.status(401).json({ success: false, message: 'Non authentifié' });
  }
};
