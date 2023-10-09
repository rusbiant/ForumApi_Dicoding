const InvariantError = require('../../Commons/exceptions/InvariantError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadsRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(addThread) {
    const { title, body, owner } = addThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, owner',
      values: [id, title, body, owner],
    };

    const result = await this._pool.query(query);
    return new AddedThread({ ...result.rows[0] });
  }

  async findThreadById(threadId) {
    const query = {
      text: 'SELECT id, title, owner FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('thread tidak ditemukan');
    }
  }
}

module.exports = ThreadRepositoryPostgres;