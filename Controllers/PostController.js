const pool = require("../db") 

class PostController {
  async createPost(req, res){
    const{person_count, date, time} = req.body; 
    const post = await pool.query(
      "insert into post (person_count, date, time) values ($3, $4, $5) returning *",
      [person_count, date, time]
    );
    res.json(post.rows[0]); 
  }
  async getPostByUser(req, res){
    const id = req.params.id; 
    const post = await pool.query("Select * from posts where user_id = $1", [id]); 
    res.json(post.rows) 
  }
}

module.exports = new PostController();