const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addComment = new AddComment(useCasePayload);
    const { threadId } = useCasePayload;
    await this._threadRepository.verifyThreadId(threadId);
    const addedComment = await this._commentRepository.addComment(addComment);
    return new AddedComment(addedComment);
  }
}

module.exports = AddCommentUseCase;
