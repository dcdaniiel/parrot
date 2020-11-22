const { PersistorProvider } = require('../../persist');
const { User, Role, Person, Level, Address } = require('..');

afterAll(async () => {
  const persistor = PersistorProvider.getPersistor();
  const Person = persistor.getPersistInstance('Person');

  await Person.deleteAll();
});

let user;
let level;
let person;

beforeAll(async () => {
  PersistorProvider.getPersistor();

  const rl = await new Role('ROLE').save();
  user = await new User(rl.id, 'email', 'password').save();
  level = await new Level('lvl_name', 800, 250).save();

  const person_data = new Person(user.id, level.id, 'name', new Date(), 20);

  person_data.last_vacation = new Date();
  person_data.last_promotion = new Date();
  person_data.start_work = new Date();
  person_data.end_work = new Date();
  person_data.phone = '11111111111';
  person_data.emergency_contact = '11111111111';
  person_data.ahead_card = 'AHEAD CARD';
  person_data.current_project = 'FL';
  person_data.person_email = 'mail@com';
  person_data.fdte_email = 'mail@fdte.io';
  person_data.bitbucket_account = 'bitbucket@com';
  person_data.kids = false;

  person = await person_data.save();
});

describe('Address', () => {
  it('constructor works and save', async () => {
    const address = new Address(
      person.id,
      'RUA',
      '19',
      'BR',
      'São Paulo',
      'Cidade',
      'Bairro',
      'Sala 1018',
      '11111111'
    );

    expect(address).toBeInstanceOf(Address);

    await address.save();

    const fetched = await Address.fetch(address.id);

    expect(fetched.id).toBe(address.id);
  });
});
