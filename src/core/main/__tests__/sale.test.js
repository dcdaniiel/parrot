const { PersistorProvider } = require('../../persist');
const { Level, Sale } = require('..');

beforeAll(async () => {
  PersistorProvider.getPersistor();
});

afterAll(async () => {
  const persistor = PersistorProvider.getPersistor();
  const level = persistor.getPersistInstance('Level');
  const sale = persistor.getPersistInstance('Sale');

  // await sale.deleteAll();
  // await level.deleteAll();
});

describe('Sale', () => {
  it('constructor works and save', async () => {
    const lvl = await new Level('lvl_name', 800, 250).save();
    const sale = new Sale(lvl.id, 10000, 500, 0.5);

    expect(sale).toBeInstanceOf(Sale);

    await sale.save();

    const fetched = await Sale.fetch(sale.id);

    expect(fetched.id).toBe(sale.id);
  });
});
