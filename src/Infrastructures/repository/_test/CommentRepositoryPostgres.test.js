const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('a CommentRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      id: 'user-123',
      username: 'dicoding',
    });

    await ThreadsTableTestHelper.addThread({
      id: 'thread-123',
      title: 'thread title',
      body: 'content',
      owner: 'user-123',
    });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist addComment', async () => {
      // Arrange
      const addComment = new AddComment({
        threadId: 'thread-123',
        content: 'comment content',
        owner: 'user-111',
      });

      // add user comentator
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'comentator',
      });

      const fakeIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(addComment);

      // Assert
      const coments = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(coments).toHaveLength(1);
    });

    it('should return AddedComment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        threadId: 'thread-123',
        content: 'comment content',
        owner: 'user-111',
      });

      // add user comentator
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'comentator',
      });

      const fakeIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(addComment);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: 'comment content',
        owner: 'user-111',
      }));
    });
  });

  describe('getCommentsThreadByThreadId function', () => {
    it('should persist getComentsThreadByThreadId', async () => {
      // Arrange
      // add user comentator
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'comentator',
      });

      const comment1 = {
        id: 'comment-123',
        threadId: 'thread-123',
        content: 'comment content',
        owner: 'user-111',
        date: new Date(),
        isDeleted: false,
      };

      await CommentsTableTestHelper.addComment(comment1);

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const getComentsThreadByThreadId = await commentRepositoryPostgres.getCommentsInThreadByThreadId('thread-123');

      // Assert
      expect(getComentsThreadByThreadId).toStrictEqual([
        {
          id: comment1.id,
          content: comment1.content,
          date: comment1.date,
          username: 'comentator',
        },
      ]);
    });

    it('should return **komentar telah dihapus** when comment is deleted', async () => {
      // Arrange
      // add user comentator
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'comentator',
      });

      const comment1 = {
        id: 'comment-123',
        threadId: 'thread-123',
        content: 'comment content',
        owner: 'user-111',
        date: new Date(),
        isDeleted: true,
      };

      await CommentsTableTestHelper.addComment(comment1);

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const getComentsThreadByThreadId = await commentRepositoryPostgres.getCommentsInThreadByThreadId('thread-123');

      // Assert
      expect(getComentsThreadByThreadId).toStrictEqual([
        {
          id: comment1.id,
          content: '**komentar telah dihapus**',
          date: comment1.date,
          username: 'comentator',
        },
      ]);
    });
  });

  describe('deleteCommentById function', () => {
    it('should persist deleteCommentById', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-111',
        username: 'comentator',
      });

      const comment1 = {
        id: 'comment-123',
        threadId: 'thread-123',
        content: 'comment content',
        owner: 'user-111',
        date: new Date(),
        isDeleted: false,
      };

      await CommentsTableTestHelper.addComment(comment1);

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await commentRepositoryPostgres.deleteCommentById(comment1.id);

      // Assert
      const coments = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(coments[0].is_deleted).toStrictEqual(true);
    });
  });

  describe('verifyCommentOwner function', () => {
  });
});
