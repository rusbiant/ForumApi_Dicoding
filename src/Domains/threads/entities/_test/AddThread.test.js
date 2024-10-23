const AddThread = require('../AddThread');

describe('an AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'thread title',
    };

    // Action And Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      title: 'thread title',
      body: true,
      owner: 'user123',
    };

    // Action And Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create AddThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'thread-title',
      body: 'thread body',
      owner: 'user-123',
    };

    // Action
    const { title, body, owner } = new AddThread(payload);

    // Assert
    expect(title).toStrictEqual(payload.title);
    expect(body).toStrictEqual(payload.body);
    expect(owner).toStrictEqual(payload.owner);
  });
});
