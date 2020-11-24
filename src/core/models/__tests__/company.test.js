const { PersistorProvider } = require('../../persist');
const { User, Role, Person, Level, Company } = require('..');

afterAll(async () => {
  const persistor = PersistorProvider.getPersistor();
  const person = persistor.getPersistInstance('Person');
  const company = persistor.getPersistInstance('Company');
  const user = persistor.getPersistInstance('User');

  await person.deleteAll();
  await company.deleteAll();
  await user.deleteAll();
});

let user;
let level;
let person;

beforeAll(async () => {
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

describe('Company', () => {
  it('constructor works and save', async () => {
    const company = new Company(person.id, 'CNPJ', 'COMPANY NAME');

    expect(company).toBeInstanceOf(Company);

    await company.save();

    const fetched = await Company.fetch(company.id);

    expect(fetched.id).toBe(company.id);
  });
});
