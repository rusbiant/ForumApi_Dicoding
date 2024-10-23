class GettedCommentsInThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { comments } = payload;

    this.comments = comments;
  }

  _verifyPayload({ comments }) {
    if (!comments) {
      throw new Error('GETTED_COMMENTS_IN_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!Array.isArray(comments)) {
      throw new Error('GETTED_COMMENTS_IN_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }
  }
}

module.exports = GettedCommentsInThread;
