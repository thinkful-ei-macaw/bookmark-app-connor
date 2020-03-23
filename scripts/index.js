import bookmarkList from './bookmarks-list.js';
import store from './store.js';
import api from './api.js';

const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) =>  store.addItem(item));
    });
  
  bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main); 