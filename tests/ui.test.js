const usecases = require('../src/domain/usecases');
const repo = require('../src/data/repository');

beforeEach(() => {
  repo.reset();
});

test('browse awal harus kosong', () => {
  const items = usecases.browse(repo);
  expect(items).toEqual([]);
});
