const { PersistorProvider } = require('../../persist');
const { Role } = require('..');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const role = persistor.getPersistInstance('Role');

  // await role.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
});

describe('Role', () => {
  it('constructor works and save', async () => {
    const role = new Role('role name');
    expect(role).toBeInstanceOf(Role);

    await role.save();
    const fetched_role = await Role.fetch(role.id);
    expect(fetched_role.id).toBe(role.id);
  });
});
