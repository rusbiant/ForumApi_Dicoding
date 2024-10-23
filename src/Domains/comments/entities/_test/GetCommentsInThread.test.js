const GetCommentsInThread = require('../GetCommentsInThread');

describe('a GetCommentsInThread entities', () => {
  it('should throw error when did not contain needed property', () => {
    // arrange
    const payload = {
      content: 'thread-comment',
    };

    // Action and Assert
    expect(() => new GetCommentsInThread(payload)).toThrowError('GET_COMMENTS_IN_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type specifications', () => {
    // arrange
    const payload = {
      threadId: true,
    };

    // Action and Assert
    expect(() => new GetCommentsInThread(payload)).toThrowError('GET_COMMENTS_IN_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create GetCommentsInThread Object Correctly', () => {
    // arrange
    const payload = {
      threadId: 'thread-123',
    };

    // Action
    const { threadId } = new GetCommentsInThread(payload);

    // Assert
    expect(threadId).toStrictEqual(payload.threadId);
  });
});
