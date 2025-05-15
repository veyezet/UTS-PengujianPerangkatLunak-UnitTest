const Item = require('./entities');

function browse(repository) {
  return repository.getAll();
}

function read(repository, id) {
  return repository.getById(id);
}

function add(repository, id, name) {
  if (typeof id !== 'string' || id.trim() === '' || typeof name !== 'string' || name.trim() === '') {
    throw new Error('ID dan nama wajib diisi dan harus berupa string tidak kosong');
  }
  const item = new Item(id.trim(), name.trim());
  return repository.add(item);
}

function edit(repository, id, newName) {
  if (typeof newName !== 'string' || newName.trim() === '') {
    throw new Error('Nama wajib diisi dan harus berupa string tidak kosong');
  }
  const item = repository.update(id, { name: newName.trim() });
  if (!item) throw new Error('Item tidak ditemukan');
  return item;
}

function remove(repository, id) {
  const success = repository.remove(id);
  if (!success) throw new Error('Item tidak ditemukan');
  return success;
}

module.exports = { browse, read, add, edit, remove };
