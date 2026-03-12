const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const logger = require("../utils/logger");

// Helper function to fetch profile
const fetchProfile = async (userId, type) => {
  if (type === "candidat") {
    const [candidats] = await db.execute(
      "SELECT id, nom, prenom FROM candidat WHERE utilisateur_id = ?",
      [userId]
    );
    return candidats.length > 0 ? candidats[0] : null;
  } else if (type === "entreprise") {
    const [entreprises] = await db.execute(
      "SELECT id, nomEntreprise FROM entreprise WHERE utilisateur_id = ?",
      [userId]
    );
    return entreprises.length > 0 ? entreprises[0] : null;
  }
  return null;
};

exports.register = async (req, res) => {
  const { email, password, type, nom, prenom, nomEntreprise } = req.body;

  // Trim and validate inputs
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();
  const trimmedType = type?.trim();
  const trimmedNom = nom?.trim();
  const trimmedPrenom = prenom?.trim();
  const trimmedNomEntreprise = nomEntreprise?.trim();

  if (!trimmedEmail || !trimmedPassword || !trimmedType) {
    return res.status(400).json({
      message: "Email, mot de passe et type sont obligatoires."
    });
  }

  if (!validator.isEmail(trimmedEmail)) {
    return res.status(400).json({ message: "Format d'email invalide." });
  }

  // Password policy: minimum 8 characters
  if (trimmedPassword.length < 8) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 8 caractères."
    });
  }

  if (trimmedType !== "candidat" && trimmedType !== "entreprise") {
    return res.status(400).json({
      message: "Le type doit être 'candidat' ou 'entreprise'."
    });
  }

  if (trimmedType === "candidat" && (!trimmedNom || !trimmedPrenom)) {
    return res.status(400).json({
      message: "Nom et prénom sont obligatoires pour un candidat."
    });
  }

  if (trimmedType === "entreprise" && !trimmedNomEntreprise) {
    return res.status(400).json({
      message: "Le nom de l'entreprise est obligatoire."
    });
  }

  if (!process.env.JWT_SECRET) {
    logger.error("JWT_SECRET not set");
    return res.status(500).json({ message: "Erreur de configuration serveur." });
  }

  let connection;

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const [existingUsers] = await connection.execute(
      "SELECT id FROM utilisateur WHERE email = ?",
      [trimmedEmail]
    );

    if (existingUsers.length > 0) {
      await connection.rollback();
      return res.status(400).json({ message: "Cet email existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const [userResult] = await connection.execute(
      `INSERT INTO utilisateur (email, password, type) VALUES (?, ?, ?)`,
      [trimmedEmail, hashedPassword, trimmedType]
    );

    const utilisateurId = userResult.insertId;

    if (trimmedType === "candidat") {
      await connection.execute(
        `INSERT INTO candidat (nom, prenom, utilisateur_id) VALUES (?, ?, ?)`,
        [trimmedNom, trimmedPrenom, utilisateurId]
      );
    }

    if (trimmedType === "entreprise") {
      await connection.execute(
        `INSERT INTO entreprise (nomEntreprise, utilisateur_id) VALUES (?, ?)`,
        [trimmedNomEntreprise, utilisateurId]
      );
    }

    await connection.commit();

    return res.status(201).json({
      message: "Inscription réussie.",
      utilisateur: { id: utilisateurId, email: trimmedEmail, type: trimmedType }
    });
  } catch (error) {
    if (connection) await connection.rollback();
    logger.error("Erreur register :", error);
    return res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  } finally {
    if (connection) connection.release();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return res.status(400).json({
      message: "Email et mot de passe sont obligatoires."
    });
  }

  if (!validator.isEmail(trimmedEmail)) {
    return res.status(400).json({ message: "Format d'email invalide." });
  }

  try {
    const [users] = await db.execute(
      "SELECT * FROM utilisateur WHERE email = ?",
      [trimmedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const profile = await fetchProfile(user.id, user.type);

    const token = jwt.sign(
      { id: user.id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Connexion réussie.",
      token,
      utilisateur: { id: user.id, email: user.email, type: user.type, profile }
    });
  } catch (error) {
    logger.error("Erreur login :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};