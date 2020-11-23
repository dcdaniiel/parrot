const { PersistorProvider } = require('../../persist');
const { Level } = require('..');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor();
  const lvl = persistor.getPersistInstance('Level');

  // await lvl.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
});

describe('Level', () => {
  it('constructor works and save', async () => {
    const lvl = new Level('A3', 6427.35, 235);
    expect(lvl).toBeInstanceOf(Level);

    await lvl.save();
    const fetched_role = await Level.fetch(lvl.id);
    expect(fetched_role.id).toBe(lvl.id);
  });
});
