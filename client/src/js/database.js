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
export const putDb = async (content) => {
  console.log('Post to the database');
  //creates connection to db and version we want to use
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // opens up needed object store
  const store = tx.objectStore('jate');
  // stores the content
  const request = store.put({ id: 1, value: content })
  // Confirmation of request
  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // creates connection to db and version we want to use
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // opens up needed object store
  const store = tx.objectStore('jate');
  // gets all data in the database
  const request = store.getAll();
   // Confirmation of request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
}
initdb();
