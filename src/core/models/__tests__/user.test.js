const { PersistorProvider } = require('../../persist');
const { User, Role } = require('..');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const role = persistor.getPersistInstance('Role');
  const user = persistor.getPersistInstance('User');

  // await user.deleteAll();
  // await role.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
});

describe('User', () => {
  it('constructor works and save', async () => {
    const role = await new Role('role_test').save();
    const user = new User(role.id, 'email', 'passwd');
    expect(user).toBeInstanceOf(User);

    await user.save();

    const fetched_user = await User.fetch(user.id);
    expect(fetched_user.id).toBe(user.id);
  });
});
