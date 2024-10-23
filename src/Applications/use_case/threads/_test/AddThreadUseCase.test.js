const AddThread = require('../../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('an AddThreadUseCase', () => {
  it('should orchestrating AddThreadUSeCase correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'thread-title',
      body: 'thread-body',
      owner: 'user-123',
    };

    const expectedThread = new AddedThread({
      id: 'thread-123',
      title: 'thread-title',
      owner: 'user-123',
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread(useCasePayload));
  });
});
