const { PersistorProvider } = require('../../persist');
const { User, Role, Person, Level, Kid } = require('..');

afterAll(async () => {
  const persistor = PersistorProvider.getPersistor();
  const person = persistor.getPersistInstance('Person');

  await person.deleteAll();
});

let user;
let level;
let person;

beforeAll(async () => {
  PersistorProvider.getPersistor();

  const rl = await new Role('ROLE').save();
  user = await new User(rl.id, 'email@kid', 'password').save();
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

describe('Kid', () => {
  it('constructor works and save', async () => {
    const kid = new Kid(person.id, 'kid name', new Date());

    expect(kid).toBeInstanceOf(Kid);

    await kid.save();

    const fetched = await Kid.fetch(kid.id);

    expect(fetched.id).toBe(kid.id);
  });
});
