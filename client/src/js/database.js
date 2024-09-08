import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Add content to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  // Create a connection to the database
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the object store
  const store = tx.objectStore('jate');
  // Store the content
  const request = store.put({ value: content });
  // Confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
}

// Get all content from the database
export const getDb = async () => {
  console.log('Get from the database');
  // Create a connection to the database
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // Open the object store
  const store = tx.objectStore('jate');
  // Get all data from the object store
  const request = store.getAll();
  // Confirm the request
  const result = await request;
  console.log('Content retrieved from the database', result);
  return result;
}
initdb();
