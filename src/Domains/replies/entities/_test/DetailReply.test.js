const DetailReply = require('../DetailReply');

describe('an DetailReply entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      date: 'today',
      content: 'thread comment',
    };

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError('DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('it should throw error when payload did not meet data type specifications', () => {
    // arrange
    const payload = {
      id: true,
      username: 'dicoding',
      date: 123,
      content: [],
    };

    // action and assert
    expect(() => new DetailReply(payload)).toThrowError('DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DetailReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      username: 'dicoding',
      date: 'today',
      content: 'thread comment',
    };

    // Action
    const detailComment = new DetailReply(payload);

    // Assert
    expect(detailComment.id).toStrictEqual(payload.id);
    expect(detailComment.username).toStrictEqual(payload.username);
    expect(detailComment.date).toStrictEqual(payload.date);
    expect(detailComment.content).toStrictEqual(payload.content);
  });
});
