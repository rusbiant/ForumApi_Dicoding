class GettedRepliesInComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { replies } = payload;

    this.replies = replies;
  }

  _verifyPayload({ replies }) {
    if (!replies) {
      throw new Error('GETTED_REPLIES_IN_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!Array.isArray(replies)) {
      throw new Error('GETTED_REPLIES_IN_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }
  }
}

module.exports = GettedRepliesInComment;
