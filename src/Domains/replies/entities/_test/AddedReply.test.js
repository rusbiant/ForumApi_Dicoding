const AddedReply = require('../AddedReply');

describe('an AddedReply entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'thread comment',
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('it should throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      content: true,
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create AddedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'thread comment',
      owner: 'user-123',
    };

    // Action
    const addedThread = new AddedReply(payload);

    // Assert
    expect(addedThread.id).toStrictEqual(payload.id);
    expect(addedThread.content).toStrictEqual(payload.content);
    expect(addedThread.owner).toStrictEqual(payload.owner);
  });
});
