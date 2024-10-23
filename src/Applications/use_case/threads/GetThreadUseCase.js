const GetThread = require('../../../Domains/threads/entities/GetThread');
const GettedThread = require('../../../Domains/threads/entities/GettedThread');
const GettedComments = require('../../../Domains/comments/entities/GettedCommentsInThread');

class GetThreadUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const getThread = new GetThread(useCasePayload);
    const { threadId } = getThread;
    await this._threadRepository.verifyThreadId(threadId);
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsInThreadByThreadId(threadId);
    return { ...thread, comments };
  }
}

module.exports = GetThreadUseCase;
