const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this._postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    request.payload.owner = request.auth.credentials.id;
    const useCasePayload = {
      title: request.payload.title,
      body: request.payload.body,
      owner: request.payload.owner,
    };
    const addedThread = await addThreadUseCase.execute(useCasePayload);
    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);

    return response;
  }
}

module.exports = ThreadsHandler;
