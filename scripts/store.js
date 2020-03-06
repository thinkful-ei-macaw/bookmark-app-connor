/**
 * STORE STRUCTURE:
 * const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      desc: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      desc: 'dolorum tempore deserunt',
      expanded: false
    } 
    ...
  ],
  adding: false,
  error: null,
  filter: 0
};
 */

const STORE = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      desc: 'lorem ipsum dolor sit',
      expanded: true
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      desc: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: 0
};

const findById = function (id) {
  return this.STORE.bookmarks.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  this.STORE.bookmarks.push(item);
};

const findAndUpdate = function(id, newData) {
  let foundItem = this.STORE.bookmarks.find(item => item.id === id);
  Object.assign(foundItem, newData);
};

const findAndDelete = function (id) {
  this.STORE.bookmarks = this.STORE.bookmarks.filter(currentItem => currentItem.id !== id);
};



const setError = function(error) {
  this.STORE.error = error;
};

export default {
  STORE,
  findById,
  addItem,
  findAndUpdate,
  findAndDelete,
  setError
};