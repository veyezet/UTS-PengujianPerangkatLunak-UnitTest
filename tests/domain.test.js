const usecases = require('../src/domain/usecases');
const repo = require('../src/data/repository');

beforeEach(() => {
  repo.reset();
  repo.add({ id: '1', name: 'Item1' });
});

describe('add()', () => {
  test('berhasil tambah item', () => {
    const item = usecases.add(repo, '2', 'ItemBaru');
    expect(item.id).toBe('2');
    expect(repo.getById('2')).toBeDefined();
  });

  test('error jika id kosong', () => {
    expect(() => usecases.add(repo, '', 'Nama')).toThrow('ID dan nama wajib diisi');
  });

  test('error jika nama kosong', () => {
    expect(() => usecases.add(repo, '3', '')).toThrow('ID dan nama wajib diisi');
  });

  test('error jika id null', () => {
    expect(() => usecases.add(repo, null, 'Nama')).toThrow('ID dan nama wajib diisi');
  });

  test('error jika nama null', () => {
    expect(() => usecases.add(repo, '4', null)).toThrow('ID dan nama wajib diisi');
  });

  test('error jika id 0', () => {
    expect(() => usecases.add(repo, 0, 'Nama')).toThrow('ID dan nama wajib diisi');
  });

  test('error jika nama 0', () => {
    expect(() => usecases.add(repo, '5', 0)).toThrow('ID dan nama wajib diisi');
  });

  test('error jika id undefined', () => {
    expect(() => usecases.add(repo, undefined, 'Nama')).toThrow('ID dan nama wajib diisi');
  });

  test('error jika nama undefined', () => {
    expect(() => usecases.add(repo, '6', undefined)).toThrow('ID dan nama wajib diisi');
  });
});

describe('edit()', () => {
  test('berhasil ubah item', () => {
    const item = usecases.edit(repo, '1', 'Diubah');
    expect(item.name).toBe('Diubah');
  });

  test('error jika item tidak ditemukan', () => {
    expect(() => usecases.edit(repo, '999', 'TidakAda')).toThrow('Item tidak ditemukan');
  });

  test('error jika nama kosong', () => {
    expect(() => usecases.edit(repo, '1', '')).toThrow('Nama wajib diisi');
  });

  test('error jika nama null', () => {
    expect(() => usecases.edit(repo, '1', null)).toThrow('Nama wajib diisi');
  });

  test('error jika nama undefined', () => {
    expect(() => usecases.edit(repo, '1', undefined)).toThrow('Nama wajib diisi');
  });
});

describe('remove()', () => {
  test('berhasil hapus item', () => {
    expect(usecases.remove(repo, '1')).toBe(true);
    expect(repo.getById('1')).toBeUndefined();
  });

  test('error jika item tidak ditemukan', () => {
    expect(() => usecases.remove(repo, '999')).toThrow('Item tidak ditemukan');
  });
});
