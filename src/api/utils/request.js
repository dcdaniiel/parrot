const request = require('supertest');

const Base = (server, path) => {
  return {
    async custom(payload, custom_path) {
      return request(server).post(`/api/${custom_path}`).send(payload);
    },
    async create(body) {
      return request(server).post(`/api/${path}`).send(body);
    },
    async get(id, token = '') {
      const req = request(server).get(`${`/api/${path}`}/${id}`);
      if (token) {
        return req.set('Authorization', `Bearer ${token}`);
      }
      return req;
    },
    async getAll() {
      return request(server).get(`/api/${path}`);
    },
    async update(id, body) {
      return request(server).put(`/api/${path}/${id}`).send(body);
    },
    async delete(id) {
      return request(server).delete(`/api/${path}/${id}`);
    },
  };
};

module.exports = { Base };
