import bookmarkList from './bookmarks-list';
import store from './store';
import api from './api';

const main = function () {
  bookmarkList.render();
};

$(main);