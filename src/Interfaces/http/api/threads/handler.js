const AddThreadUSeCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/threads/GetThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadByThreadIdHandler = this.getThreadByThreadIdHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUSeCase = this._container.getInstance(AddThreadUSeCase.name);
    const { id: owner } = request.auth.credentials;
    const { title, body } = request.payload;

    const useCasePayload = { title, body, owner };

    const addedThread = await addThreadUSeCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadByThreadIdHandler(request, h) {
    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
    const { threadId } = request.params;

    const useCasePayload = { threadId };

    const thread = await getThreadUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });

    return response;
  }
}

module.exports = ThreadsHandler;
