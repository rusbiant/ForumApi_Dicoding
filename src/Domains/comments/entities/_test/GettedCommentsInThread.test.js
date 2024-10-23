const GettedCommentsInThread = require('../GettedCommentsInThread');

describe('a GettedCommentsInThread entities', () => {
  it('should throw error when did not contain needed property', () => {
    // arrange
    const payload = '';

    // Action and Assert
    expect(() => new GettedCommentsInThread(payload)).toThrowError('GETTED_COMMENTS_IN_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type specifications', () => {
    // arrange
    const payload = {
      comments: 123,
    };

    // Action and Assert
    expect(() => new GettedCommentsInThread(payload)).toThrowError('GETTED_COMMENTS_IN_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create GettedComments correctly', () => {
    // arrange
    const payload = {
      comments: [
        {
          id: 'comment-123',
          content: 'comment-content',
          date: new Date(),
          username: 'dicoding',
        },
      ],
    };

    // Action
    const { comments } = new GettedCommentsInThread(payload);

    // Assert
    expect(comments).toStrictEqual(payload.comments);
  });
});
