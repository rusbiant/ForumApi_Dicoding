const AddComment = require('../AddComment');

describe('an AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'comment content',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      threadId: true,
      content: 'thread-content',
      owner: 123,
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create AddComment correctly', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'thread-comment',
      owner: 'user-123',
    };

    // Action
    const { threadId, content, owner } = new AddComment(payload);

    // Arrange
    expect(threadId).toStrictEqual(payload.threadId);
    expect(content).toStrictEqual(payload.content);
    expect(owner).toStrictEqual(payload.owner);
  });
});
