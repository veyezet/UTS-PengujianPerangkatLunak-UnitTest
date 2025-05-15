let items = [];

function getAll() {
  return items;
}

function getById(id) {
  return items.find(item => item.id === id);
}

function add(item) {
  items.push(item);
  return item;
}

function update(id, newItem) {
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...newItem };
  return items[index];
}

function remove(id) {
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}

function reset() {
  items = [];
}

module.exports = { getAll, getById, add, update, remove, reset };
