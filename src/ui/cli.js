const readline = require('readline');
const repository = require('../data/repository');
const usecases = require('../domain/usecases');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printMenu() {
  console.log('\n=== Menu BREAD CLI ===');
  console.log('1. Lihat daftar item');
  console.log('2. Lihat detail item berdasarkan ID');
  console.log('3. Tambah item baru');
  console.log('4. Ubah item');
  console.log('5. Hapus item');
  console.log('0. Keluar');
}

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function main() {
  while (true) {
    printMenu();
    const choice = await question('Pilih opsi: ');

    try {
      switch (choice.trim()) {
        case '1': {
          const items = usecases.browse(repository);
          if (items.length === 0) {
            console.log('Belum ada item.');
          } else {
            items.forEach(i => console.log(`- [${i.id}] ${i.name}`));
          }
          break;
        }
        case '2': {
          const id = await question('Masukkan ID item: ');
          const item = usecases.read(repository, id.trim());
          if (!item) console.log('Item tidak ditemukan.');
          else console.log(`Item: [${item.id}] ${item.name}`);
          break;
        }
        case '3': {
          const id = await question('Masukkan ID baru: ');
          const name = await question('Masukkan nama baru: ');
          const item = usecases.add(repository, id.trim(), name.trim());
          console.log(`Item berhasil ditambahkan: [${item.id}] ${item.name}`);
          break;
        }
        case '4': {
          const id = await question('Masukkan ID item yang ingin diubah: ');
          const name = await question('Masukkan nama baru: ');
          const item = usecases.edit(repository, id.trim(), name.trim());
          console.log(`Item berhasil diubah: [${item.id}] ${item.name}`);
          break;
        }
        case '5': {
          const id = await question('Masukkan ID item yang ingin dihapus: ');
          usecases.remove(repository, id.trim());
          console.log('Item berhasil dihapus.');
          break;
        }
        case '0':
          console.log('Sampai jumpa!');
          rl.close();
          process.exit(0);
        default:
          console.log('Opsi tidak valid.');
      }
    } catch (err) {
      console.log('Error:', err.message);
    }
  }
}

main();
