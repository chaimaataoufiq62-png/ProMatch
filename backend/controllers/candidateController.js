const db = require("../config/db");

// Voir profil candidat
exports.getProfile = async (req, res) => {

 try {

  const userId = req.user.id;

  const [user] = await db.execute(
   "SELECT id,email FROM utilisateur WHERE id=?",
   [userId]
  );

  res.json(user[0]);

 } catch (error) {

  res.status(500).json({ message: "Server error" });

 }

};


// Ajouter une compétence
exports.addSkill = async (req,res)=>{

 try {

  const { skill } = req.body;

  await db.execute(
   "INSERT INTO skills (user_id,skill_name) VALUES (?,?)",
   [req.user.id, skill]
  );

  res.json({ message:"Skill added" });

 } catch(error){

  res.status(500).json({ message:"Server error" });

 }

};


// Voir les compétences
exports.getSkills = async (req,res)=>{

 try{

  const [skills] = await db.execute(
   "SELECT * FROM skills WHERE user_id=?",
   [req.user.id]
  );

  res.json(skills);

 } catch(error){

  res.status(500).json({ message:"Server error" });

 }

};


// Supprimer une compétence
exports.deleteSkill = async (req,res)=>{

 try{

  const skillId = req.params.id;

  await db.execute(
   "DELETE FROM skills WHERE id=?",
   [skillId]
  );

  res.json({ message:"Skill deleted" });

 } catch(error){

  res.status(500).json({ message:"Server error" });

 }

};


// Voir les challenges
exports.getChallenges = async (req,res)=>{

 try{

  const [challenges] = await db.execute(
   "SELECT * FROM challenges"
  );

  res.json(challenges);

 } catch(error){

  res.status(500).json({ message:"Server error" });

 }

};