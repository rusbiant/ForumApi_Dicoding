const GetThread = require('../GetThread');

describe('a GetThread entities', () => {
  it('should throw error when did not contain needed property', () => {
    // arrange
    const payload = {
      content: 'thread-comment',
    };

    // Action and Assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type specifications', () => {
    // arrange
    const payload = {
      threadId: true,
    };

    // Action and Assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create GetThread Object Correctly', () => {
    // arrange
    const payload = {
      threadId: 'thread-123',
    };

    // Action
    const { threadId } = new GetThread(payload);

    // Assert
    expect(threadId).toStrictEqual(payload.threadId);
  });
});
