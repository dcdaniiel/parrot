const { PersistorProvider } = require('../../persist');
const { User, Role, Person, Level, Benefit, Document } = require('..');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const person = persistor.getPersistInstance('Person');
  const user = persistor.getPersistInstance('User');

  await user.deleteAll();
  await person.deleteAll();
};

afterAll(async () => {
  await _clean();
});

let user;
let level;
let person;

beforeAll(async () => {
  await _clean();
  PersistorProvider.getPersistor();

  level = await new Level('lvl_name', 800, 250).save();

  const role = await new Role('role_test').save();
  user = new User(role.id, 'email', 'passwd');
  person = new Person(user.id, level.id, 'name', new Date(), 20);

  person.last_vacation = new Date();
  person.last_promotion = new Date();
  person.start_work = new Date();
  person.end_work = new Date();
  person.phone = '11111111111';
  person.emergency_contact = '11111111111';
  person.ahead_card = 'AHEAD CARD';
  person.current_project = 'FL';
  person.person_email = 'mail@com';
  person.fdte_email = 'mail@fdte.io';
  person.bitbucket_account = 'bitbucket@com';
  person.kids = false;

  expect(user).toBeInstanceOf(User);

  user.personData = Person.serialize(person);
  await user.save();

  const [person_data, ...data] = await Person.getPersist().getAll();

  person = person_data;
});

describe('Document', () => {
  it('constructor works and save', async () => {
    const document = new Document(person.id, 'CPF', '11122233300');

    expect(document).toBeInstanceOf(Document);

    await document.save();

    const fetched = await Document.fetch(document.id);

    expect(fetched.id).toBe(document.id);
  });
});
