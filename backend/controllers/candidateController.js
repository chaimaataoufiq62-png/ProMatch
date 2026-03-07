const db = require("../config/db");

exports.getProfile = async (req,res)=>{

 const userId = req.user.id;

 const [user] = await db.execute(
  "SELECT id,name,email FROM utilisateur WHERE id=?",
  [userId]
 );

 res.json(user[0]);

};