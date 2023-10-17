const AddReply = require('../AddReply');

describe('an AddReply entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('it should throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      content: 'thread comment',
      owner: 'user-123',
      threadId: 'thread-123',
      commentId: [],
    };

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create AddReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'thread comment',
      owner: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    // Action
    const {
      content, owner, threadId, commentId,
    } = new AddReply(payload);

    // Assert
    expect(content).toStrictEqual(payload.content);
    expect(owner).toStrictEqual(payload.owner);
    expect(threadId).toStrictEqual(payload.threadId);
    expect(commentId).toStrictEqual(payload.commentId);
  });
});
