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
  console.log('PUT to database');
////////////// Create a connection to the database ////////////////////////////////////////////
  const contactDb = await openDB('jate', 1);

////////////// Create a transaction to access the database /////////////////////////////////////  
  const tx = contactDb.transaction('jate', 'readwrite');

////////////// Create a reference to the object store //////////////////////////////////////////
  const store = tx.objectStore('jate');

  ////////////// Create a request to add the content to the database ////////////////////////////
  const request = store.put({ id:1, value: content });

  ///////////// Wait for the request to complete ////////////////////////////////////////////////
  const result = await request;
  console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

////////// Create a connection to the database ////////////////////////////////////////////////
  const contactDb = await openDB('jate', 1);

//////////// Create a transaction to access the database ///////////////////////////////////////
  const tx = contactDb.transaction('jate', 'readonly');
////////////// Create a reference to the object store /////////////////////////////////////////
  const store = tx.objectStore('jate');
////////////// Create a request to get all the keys ///////////////////////////////////////////
  const request = store.getAll();
////////////// Wait for the request to complete ///////////////////////////////////////////////
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
