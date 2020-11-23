const { PersistorProvider } = require('../../persist');
const { User, Role, Person, Level } = require('..');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const person = persistor.getPersistInstance('Person');

  await person.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
});

let user;
let level;

beforeAll(async () => {
  await _clean();

  const rl = await new Role('ROLE').save();
  user = await new User(rl.id, 'email', 'password').save();
  level = await new Level('lvl_name', 800, 250).save();
});

describe('User', () => {
  it('constructor works and save', async () => {
    const person = new Person(user.id, level.id, 'name', new Date(), 20);

    expect(person).toBeInstanceOf(Person);

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

    await person.save();

    const fetched = await Person.fetch(person.id);
    expect(fetched).toEqual(person);
  });
});
