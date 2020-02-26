// import statements
import api from './api.js';
import store from './store.js';

/** STRING GENERATORS */

// generate string for single bookmark element
const generateBookmarkElement = function (bookmark) {
  // let bookmarkTitle = `<span class="bookmark-title">${bookmark.title}</span>`;
  if (bookmark.expanded) {
    // append html
  }

  return `
    <li>
      <button type="button" class="bookmark-element"><span>${bookmark.title}</span><span>${bookmark.rating}</span>
      </button>
    </li>
    `;
};

// concatenate all bookmark items into one html string
const generateBookmarkListString = function (bookmarkList) {
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join('');
};

/* RENDER FUNCTION */
function render() {
  let items = [...store.STORE.bookmarks];
  console.log(items);

  const bookmarkListString = generateBookmarkListString(items);
  $('.js-bookmarks-list').html(bookmarkListString);
}

/** EVENT HANDLERS */

// Add bookmark item to list


// Show expanded view


// Filter by rating


// Delete bookmark item from list

// export
export default {
  render,

};