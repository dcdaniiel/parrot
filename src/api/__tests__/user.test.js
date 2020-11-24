const { config } = require('dotenv');
const { Base } = require('../utils/request');
const { startServer } = require('..');
const { db } = require('../../db');

let server;
let requests;
let level_request;
const payload = {
  email: 'dca@asd.com',
  password: 'A2Sa2saz@as31aA',
  kids: false,
  person_email: 'person@email.com',
  start_work: '2020-11-23T22:08:35.102Z',
  last_promotion: '2020-11-23T22:08:35.102Z',
  last_vacation: '2020-11-23T22:08:35.102Z',
  age: 20,
  birthdate: '2020-11-23T22:08:35.102Z',
  name: 'Daniel Teixeira',
  bitbucket_account: 'daniel.teixeira@fdte.io',
  fdte_email: 'daniel.teixeira@fdte.io',
  current_project: 'parrot',
  emergency_contact: '15996578545',
  phone: '15996578545',
};

const _clean = async () => {
  await db('users').del();
};

beforeAll(async () => {
  config();
  server = await startServer(4000);
  requests = Base(server, 'users');
  level_request = Base(server, 'levels');
  const level = await level_request.getAll();

  payload.level_id = level.body.data[0].id;
});

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
  await db.destroy();
  await server.close();
});

describe('User - API', () => {
  test('POST/user should create a user', async () => {
    const response = await requests.create(payload);
    expect(response.status).toBe(201);
  });
  test("POST/user don't should create a user", async () => {
    const response = await requests.create({});
    expect(response.status).toBe(400);
  });
});
