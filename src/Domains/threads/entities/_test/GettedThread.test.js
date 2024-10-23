const GettedThread = require('../GettedThread');

describe('a GettedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'thread-title',
      body: 'thread-body',
    };

    // Action and Assert
    expect(() => new GettedThread(payload)).toThrowError('GETTED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: true,
      body: 'thread-body',
      date: new Date(),
      username: 123,
    };

    // Action and Assert
    expect(() => new GettedThread(payload)).toThrowError('GETTED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create GettedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'thread-title',
      body: 'thread-body',
      date: new Date(),
      username: 'dicoding',
    };

    // Action
    const gettedThread = new GettedThread(payload);

    // Assert
    expect(gettedThread.id).toStrictEqual(payload.id);
    expect(gettedThread.title).toStrictEqual(payload.title);
    expect(gettedThread.body).toStrictEqual(payload.body);
    expect(gettedThread.date).toStrictEqual(payload.date);
    expect(gettedThread.username).toStrictEqual(payload.username);
  });
});
