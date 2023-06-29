class BaseController {
  req;
  res;
  model;

  constructor(req, res, model) {
    this.req = req;
    this.res = res;
    this.model = model;
  }

  getAll() {
    this.model
      .getAll()
      .then(([result]) => {
        this.res.status(200).json(result);
      })
      .catch((error) => this.res.send(error));
  }

  getOne() {
    this.model
      .getOne(this.req.params)
      .then(([result]) => {
        this.res.status(200).json(result);
      })
      .catch((error) => this.res.send(error));
  }

  create() {
    this.model
      .create(this.req.body)
      .then(([result]) => {
        this.res
          .status(201)
          .location(`${this.req.baseUrl}/${this.table}/${result.insertId}`)
          .json({
            message: 'Created successfully',
            id: result.insertId,
            username: result.username,
          });
      })
      .catch((error) => this.res.send(error));
  }

  update() {
    this.model
      .update(this.req.body, this.req.params)
      .then(([result]) => {
        this.res
          .status(200)
          .location(`${this.req.baseUrl}/${this.table}/${this.req.params.id}`)
          .json({ message: 'Updated successfully' });
      })
      .catch((error) => this.res.send(error));
  }

  delete() {
    this.model.delete(this.req.params).then((result) => {
      this.res.status(204).json({ message: 'Deleted successfully' });
    });
  }

  sendJson(status, data) {
    this.res.status(status).json(data);
  }
}

module.exports = BaseController;
