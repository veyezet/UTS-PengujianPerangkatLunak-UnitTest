const repo = require('../src/data/repository');

beforeEach(() => {
  repo.reset();
});

test('tambah dan getById', () => {
  const item = { id: '1', name: 'Tes' };
  repo.add(item);
  expect(repo.getById('1')).toEqual(item);
});

test('update item', () => {
  repo.add({ id: '1', name: 'Lama' });
  const updated = repo.update('1', { name: 'Baru' });
  expect(updated.name).toBe('Baru');
  expect(repo.getById('1').name).toBe('Baru');
});

test('hapus item', () => {
  repo.add({ id: '1', name: 'Hapus' });
  const result = repo.remove('1');
  expect(result).toBe(true);
  expect(repo.getById('1')).toBeUndefined();
});
