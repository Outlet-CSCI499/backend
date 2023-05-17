const db = require("../db");
const { NotFoundError } = require("../utils/errors");

class Post {
  constructor({ id, user_id, title, body, upvote, downvote, created, edited }) {
    //All the required objects for posts
    this.id = id;
    this.authorId = user_id;
    this.title = title;
    this.body = body;
    this.upvote = upvote;
    this.downvote = downvote;
    this.created = created;
    this.edited = edited;
  }

  static async find() {
    // Fetch all posts
    const query = `
      SELECT id, user_id, title, body, upvote, downvote, created, edited
      FROM posts
      ORDER BY created DESC
    `;
    const result = await db.query(query);
    return result.rows.map((row) => new Post(row));
  }

  static async fetchPostByauthorId(authorId) {
    //Fetch all posts by author of the post
    //Throw an error if author information is missing or not found
    const query = `
      SELECT id, user_id, title, body, upvote, downvote, created, edited
      FROM posts
      WHERE user_id = $1
    `;
    const result = await db.query(query, [authorId]);
    if (result.rows.length === 0) {
      throw new NotFoundError(`Post containing the ID ${authorID} not found`);
    }
    return new Post(result.rows[0]);
  }

  static async fetchPostBypostId(postId) {
    //Fetch all posts by author of the post
    //Throw an error if author information is missing or not found
    const query = `
      SELECT id, user_id, title, body, upvote, downvote, created, edited
      FROM posts
      WHERE id = $1
    `;
    const result = await db.query(query, [postId]);
    if (result.rows.length === 0) {
      throw new NotFoundError(`Post containing the ID ${postId} not found`);
    }
    return new Post(result.rows[0]);
  }

  static async create({ title, body, authorId }) {
    // create a new post that requires the title, body, and the name of the author
    const query = `
      INSERT INTO posts (title, body, user_id)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, title, body, upvote, downvote, created, edited
    `;
    const result = await db.query(query, [title, body, authorId]);
    return new Post(result.rows[0]);
  }

  async edit() {
    // Edit an existing post and return the edited post
    const query = `
      UPDATE posts
      SET title = $2, body = $3, edited= NOW()
      WHERE id = $1
      RETURNING user_id, title, body, upvote, downvote, created, edited
    `;
    const result = await db.query(query, [
      this.authorID,
      this.title,
      this.body,
    ]);
    this.updatedAt = result.rows[0].edited;
    return this;
  }

  // async removePost() {
  //   //delete an exixting post
  //   const query = `
  //     DELETE FROM posts
  //     WHERE user_id = $1
  //   `;
  //   await db.query(query, [this.authorId]);
  // }

  async removePost() {
    //delete an exixting post
    const query = `
      DELETE FROM posts
      WHERE id = $1
    `;
    await db.query(query, [this.id]);
  }

  // async upvote(userName) {
  //   //upvote a specific post
  //   const query = `
  //       INSERT INTO upvote (user_id, user_ID)
  //       VALUES ($1, $2)
  //   `;
  //   await db.query(query, [this.authorId, userName]);
  // }
  // async downvote(userName) {
  //   //downvote a specific post
  //   const query = `
  //       INSERT INTO downvote (user_id, user_ID)
  //       VALUES ($1, $2)
  //   `;
  //   await db.query(query, [this.authorId, userName]);
  // }

  static async upvote(postId) {
    //upvote a specific post
    const query = `
      UPDATE posts SET upvote = upvote+1 WHERE id = $1
    `;
    await db.query(query, [postId]);
  }

  static async downvote(postId) {
    //downvote a specific post
    const query = `
    UPDATE posts SET downvote = downvote+1 WHERE id = $1
    `;
    await db.query(query, [postId]);
  }
}
module.exports = Post;
