class GetCommentsInThread {
  constructor(payload) {
    this._verifyPayload(payload);

    this.threadId = payload.threadId;
  }

  _verifyPayload(payload) {
    const { threadId } = payload;

    if (!threadId) {
      throw new Error('GET_COMMENTS_IN_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string') {
      throw new Error('GET_COMMENTS_IN_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }
  }
}

module.exports = GetCommentsInThread;
