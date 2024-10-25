const GettedRepliesInComment = require('../GettedRepliesInComment');

describe('a GettedRepliesInComment entities', () => {
  it('should throw error when did not contain needed property', () => {
    // arrange
    const payload = '';

    // Action and Assert
    expect(() => new GettedRepliesInComment(payload)).toThrowError('GETTED_REPLIES_IN_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type specifications', () => {
    // arrange
    const payload = {
      replies: 123,
    };

    // Action and Assert
    expect(() => new GettedRepliesInComment(payload)).toThrowError('GETTED_REPLIES_IN_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create Gettedreplies correctly', () => {
    // arrange
    const payload = {
      replies: [
        {
          id: 'reply-123',
          content: 'reply-content',
          date: new Date(),
          username: 'dicoding',
        },
      ],
    };

    // Action
    const { replies } = new GettedRepliesInComment(payload);

    // Assert
    expect(replies).toStrictEqual(payload.replies);
  });
});
