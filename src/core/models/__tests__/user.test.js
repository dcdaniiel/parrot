const { PersistorProvider } = require('../../persist');
const { User, Role, Person, Level } = require('..');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const role = persistor.getPersistInstance('Role');
  const user = persistor.getPersistInstance('User');

  await user.deleteAll();
  await role.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
});

describe('User', () => {
  it('constructor works and save', async () => {
    const lvl = await new Level('lvl_name', 800, 250).save();

    const role = await new Role('role_test').save();
    const user = new User(role.id, 'email', 'passwd');
    const person = new Person(user.id, lvl.id, 'name', new Date(), 20);

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

    const fetched_user = await User.fetch(user.id);
    expect(fetched_user.id).toBe(user.id);
  });
});
