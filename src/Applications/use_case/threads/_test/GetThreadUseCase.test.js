const GettedThread = require('../../../../Domains/threads/entities/GettedThread');
const GettedComments = require('../../../../Domains/comments/entities/GettedCommentsInThread');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('a GetThreadUseCase', () => {
  it('should create GetThreadUseCase correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const expectedThread = new GettedThread({
      id: 'thread-123',
      title: 'thread title',
      body: 'thread content',
      date: new Date(),
      username: 'creator',
    });

    const expectedComments = new GettedComments({
      comments: [
        {
          id: 'comment-123',
          content: 'comment-content',
          username: 'comentator 1',
        },
        {
          id: 'comment-124',
          content: 'comment-content',
          username: 'comentator 2',
        }],
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));
    mockCommentRepository.getCommentsInThreadByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComments));

    const getThreadUseCase = new GetThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const thread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(thread).toStrictEqual({ ...expectedThread, comments: expectedComments });
    expect(mockCommentRepository.getCommentsInThreadByThreadId)
      .toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.verifyThreadId)
      .toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.getThreadById)
      .toBeCalledWith(useCasePayload.threadId);
  });
});
