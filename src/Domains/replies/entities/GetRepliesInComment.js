class GetCommentsInThread {
  constructor(payload) {
    this._verifyPayload(payload);

    this.commentId = payload.commentId;
  }

  _verifyPayload(payload) {
    const { commentId } = payload;

    if (!commentId) {
      throw new Error('GET_REPLIES_IN_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof commentId !== 'string') {
      throw new Error('GET_REPLIES_IN_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }
  }
}

module.exports = GetCommentsInThread;
