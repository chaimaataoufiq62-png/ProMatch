const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.register = async (req, res) => {

 const { email, password, type } = req.body;

 try {

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.execute(
   "INSERT INTO utilisateur (email, motDePasse, type) VALUES (?, ?, ?)",
   [email, hashedPassword, type]
  );

  res.json({
   message: "Utilisateur créé",
   userId: result.insertId
  });

 } catch (error) {
  res.status(500).json({ error: error.message });
 }

};
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

 const { email, password } = req.body;

 try {

  const [users] = await db.execute(
   "SELECT * FROM utilisateur WHERE email = ?",
   [email]
  );

  if (users.length === 0) {
   return res.status(401).json({ message: "Utilisateur non trouvé" });
  }

  const user = users[0];

  const validPassword = await bcrypt.compare(password, user.motDePasse);

  if (!validPassword) {
   return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  const token = jwt.sign(
   { id: user.id, type: user.type },
   process.env.JWT_SECRET,
   { expiresIn: "24h" }
  );

  res.json({
   message: "Connexion réussie",
   token
  });

 } catch (error) {
  res.status(500).json({ error: error.message });
 }

};
