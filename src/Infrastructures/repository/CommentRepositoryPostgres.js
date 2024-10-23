const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const { mapDBToModel } = require('../utils/comments');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(addComment) {
    const { threadId, content, owner } = addComment;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date();
    const isDeleted = false;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, threadId, content, owner, date, isDeleted],
    };

    const result = await this._pool.query(query);
    return new AddedComment({ ...result.rows[0] });
  }

  async getCommentsInThreadByThreadId(threadId) {
    const query = {
      text: `SELECT c.id,c.content, u.username, c.date, c.is_deleted
      FROM comments c
      JOIN users u ON c.owner = u.id
      WHERE c.thread_id = $1
      ORDER BY c.date`,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    const mappedResult = result.rows.map(mapDBToModel);

    return mappedResult;
  }

  async deleteCommentById(commentId) {
    const query = {
      text: 'UPDATE comments SET is_deleted = TRUE WHERE id = $1',
      values: [commentId],
    };

    await this._pool.query(query);
  }
}

module.exports = CommentRepositoryPostgres;
