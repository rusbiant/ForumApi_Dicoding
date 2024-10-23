const GetCommentsInThread = require('../../../Domains/comments/entities/GetCommentsInThread');
const GettedCommentsInThread = require('../../../Domains/comments/entities/GettedCommentsInThread');

class GetCommentsInThreadUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const getCommentsInThread = new GetCommentsInThread(useCasePayload);
    const { threadId } = useCasePayload;
    await this._threadRepository.verifyThreadId(threadId);
    const gettedCommentsInThread = await this._commentRepository
      .getCommentsInThreadByThreadId(getCommentsInThread);
    return new GettedCommentsInThread(gettedCommentsInThread);
  }
}

module.exports = GetCommentsInThreadUseCase;
