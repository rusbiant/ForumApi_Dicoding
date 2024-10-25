const GetRepliesInComment = require('../GetRepliesInComment');

describe('a GetRepliesInComment entities', () => {
  it('should throw error when did not contain needed property', () => {
    // arrange
    const payload = {
      content: 'comment replies',
    };

    // Action and Assert
    expect(() => new GetRepliesInComment(payload)).toThrowError('GET_REPLIES_IN_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type specifications', () => {
    // arrange
    const payload = {
      commentId: true,
    };

    // Action and Assert
    expect(() => new GetRepliesInComment(payload)).toThrowError('GET_REPLIES_IN_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create GetRepliesInComment Object Correctly', () => {
    // arrange
    const payload = {
      commentId: 'comment-123',
    };

    // Action
    const { commentId } = new GetRepliesInComment(payload);

    // Assert
    expect(commentId).toStrictEqual(payload.commentId);
  });
});
