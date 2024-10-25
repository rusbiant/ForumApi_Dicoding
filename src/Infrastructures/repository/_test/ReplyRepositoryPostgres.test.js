const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('a ReplyRepositoryPosgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      id: 'user-123',
      username: 'dicoding',
    });

    await UsersTableTestHelper.addUser({
      id: 'user-000',
      username: 'comentator',
    });

    await ThreadsTableTestHelper.addThread({
      id: 'thread-123',
      title: 'thread title',
      body: 'content',
      owner: 'user-123',
    });

    await CommentsTableTestHelper.addComment({
      id: 'comment-123',
      threadId: 'thread-123',
      title: 'thread title',
      body: 'content',
      owner: 'user-123',
    });
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReply function', () => {
    it('should persist added comment reply', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'reply comment',
        threadId: 'thread-123',
        commentId: 'comment-123',
        owner: 'user-111',
      });

      // add user replier
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'replier',
      });

      const fakeIdGenerator = () => '123'; // stub
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await replyRepositoryPostgres.addReply(addReply);

      // Assert
      const comment = await RepliesTableTestHelper.findReplyById('reply-123');

      expect(comment).toHaveLength(1);
    });

    it('should return added comment reply correctly', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'reply comment',
        threadId: 'thread-123',
        commentId: 'comment-123',
        owner: 'user-111',
      });

      // add user reply
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'replier',
      });

      const fakeIdGenerator = () => '123'; // stub
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedReply = await replyRepositoryPostgres.addReply(addReply);

      // Assert
      expect(addedReply).toStrictEqual(
        new AddedReply({
          id: 'reply-123',
          content: 'reply comment',
          owner: 'user-111',
        }),
      );
    });
  });
});
