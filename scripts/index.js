import bookmarkList from './bookmarks-list.js';
import store from './store.js';
// import api from './api.js';

const main = function () {
  
  
  bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main); 