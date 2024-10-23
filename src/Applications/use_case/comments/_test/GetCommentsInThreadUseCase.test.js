const GetCommentsInThread = require('../../../../Domains/comments/entities/GetCommentsInThread');
const GettedCommentsInThread = require('../../../../Domains/comments/entities/GettedCommentsInThread');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const GetCommentsInThreadUseCase = require('../GetCommentsInThreadUseCase');

describe('a GetCommentsInThreadUseCase', () => {
  it('should orchestrating GetCommentsInThread correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const expectedGettedComments = new GettedCommentsInThread({
      comments: [
        {
          id: 'comment-123',
          threadId: 'thread-123',
          content: 'comment-content',
          date: new Date(),
          username: 'dicoding',
        },
      ],
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.getCommentsInThreadByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedGettedComments));

    const getCommentsInThreadUseCase = new GetCommentsInThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const getCommentsInThread = await getCommentsInThreadUseCase.execute(useCasePayload);

    // Assert
    expect(getCommentsInThread).toStrictEqual(expectedGettedComments);
    expect(mockThreadRepository.verifyThreadId).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsInThreadByThreadId)
      .toBeCalledWith(new GetCommentsInThread(useCasePayload));
  });
});
