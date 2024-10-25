const ReplyRepository = require('../ReplyRepository');

describe('ReplyRepository interface', () => {
  it('it should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new ReplyRepository();

    // Action and Assert
    await expect(commentRepository.addReply({})).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.verifyReplyId('')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.getRepliesByCommentId('')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.verifyReplyOwner('')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.deleteReplyById('')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
