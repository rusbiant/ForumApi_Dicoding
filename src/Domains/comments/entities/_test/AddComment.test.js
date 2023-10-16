const AddComment = require('../AddComment');

describe('an AddComment entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('it should throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      content: 123,
      owner: true,
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create AddComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'thread comment',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    // Action
    const { content, owner, threadId } = new AddComment(payload);

    // Assert
    expect(content).toStrictEqual(payload.content);
    expect(owner).toStrictEqual(payload.owner);
    expect(threadId).toStrictEqual(payload.threadId);
  });
});
