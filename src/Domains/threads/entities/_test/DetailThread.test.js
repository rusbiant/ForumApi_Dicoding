const DetailThread = require('../DetailThread');

describe('an DetailThread entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'thread title',
      body: 'thread body',
    };

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('it should throw error when payload did not meet data type specifications', () => {
    // arrange
    // arrange
    const payload = {
      id: true,
      title: ['ini judul'],
      body: 1,
      date: 2.5,
      username: [true, false],
      comments: 'Example Comments',
    };

    // action and assert
    expect(() => new DetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS',
    );
  });

  it('should create DetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'thread title',
      body: 'thread body',
      date: 'today',
      username: 'user-123',
      comments: [],
    };

    // Action
    const addedComment = new DetailThread(payload);

    // Assert
    expect(addedComment.id).toStrictEqual(payload.id);
    expect(addedComment.title).toStrictEqual(payload.title);
    expect(addedComment.body).toStrictEqual(payload.body);
    expect(addedComment.date).toStrictEqual(payload.date);
    expect(addedComment.username).toStrictEqual(payload.username);
    expect(addedComment.comments).toStrictEqual(payload.comments);
  });
});
