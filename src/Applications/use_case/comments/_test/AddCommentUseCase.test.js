const AddComment = require('../../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestrating the addComment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'thread comment',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    /** create dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedComment({
        id: 'comment-123',
        content: 'thread comment',
        owner: 'user-123',
      })));
    mockThreadRepository.verifyThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /**  creating use case instance */
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await getCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(expectedAddedComment);

    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      content: useCasePayload.content,
      owner: useCasePayload.owner,
      threadId: useCasePayload.threadId,
    }));

    expect(mockThreadRepository.verifyThreadId).toBeCalledWith(useCasePayload.threadId);
  });
});
