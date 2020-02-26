// import statements
import api from './api.js';
import store from './store.js';

/** STRING GENERATORS */

// generate string for single bookmark element
const generateBookmarkElementString = function (bookmark) {
  // let bookmarkTitle = `<span class="bookmark-title">${bookmark.title}</span>`;
  if (bookmark.expanded) {
    // append html
    return `<li>
    <button type="button"><span>${bookmark.title}</span></button>
          <p><a href="${bookmark.url}">Visit Site</a><span>  ${bookmark.rating} <i class="fas fa-star"></i></span></p>
          <p class="description">${bookmark.desc}
          </p>
          <button type="button" id="delete-bookmark">Delete</button>
  </li>`;
  } else {
    return `<li>
    <button type="button" class="bookmark-element"><span>${bookmark.title}</span><span>${bookmark.rating}</span>
    </button>
  </li>`;}
};

// concatenate all bookmark items into one html string
const generateBookmarkListString = bookmarkList => {
  const items = bookmarkList.map((item) => generateBookmarkElementString(item));
  return items.join('');
};

// generate add bookmark view string
const generateAddBookmarkViewString = function() {
  return `<section id="add-bookmark-view">
  <form class="add-bookmark-form">
    <label for="bookmark-url">Add New Bookmark:</label><br>
    <input id="bookmark-url" type="url" placeholder="https://www.bookmark.com" required><br>
    <label for="bookmark-title"></label><br>
    <input id="bookmark-title" type="text" placeholder="Bookmark Title" required><br>
    <label for="select-rating"></label>
    <select id="select-rating" name="select-rating">
      <option value=" ">Filter By Rating</option>
      <option value="2">1</option>
      <option value="3">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select><br>
    <label for="add-description"></label>
    <input id="add-description" placeholder="Description"></input>
    <div id="add-bookmark-buttons">
      <button type="button">Cancel</button>
      <button type="submit">Create</button>
    </div>
  </form>
  <code>const store = {
    bookmarks: [...],
    adding: true,
    error: null,
    filter: 0
  };
  </code>
</section>`;
};

/* RENDER FUNCTION */
function render() {
  if (store.STORE.adding === true) {
    $('#container').html(generateAddBookmarkViewString());
  } else {
    let items = [...store.STORE.bookmarks];
    const bookmarkListString = generateBookmarkListString(items);

    $('.js-bookmarks-list').html(bookmarkListString);
  }
}

/** EVENT HANDLERS */

// add bookmark add button clicked
function handleAddBookmarkClicked() {
  // update store to show adding = true
  $('#initial-view').on('click', '#add-bookmark-button', () => {
    store.STORE.adding = true;
  });
  // render
  render();
}

// submit new bookmark form
function handleAddBookmarkSubmit() {
  // validate input for required fields

  // do success workflow if valid

    // post new item to API 

    // if API call is successful, push new bookmark to store

    // if unsucccessful, do error workflow

  // if invalid do error workflow

}
// Show expanded view on bookmark click
function handleBookmarkExpandClicked() {

}


// Filter by rating
function handleRatingFilterChanged() {
  // 

  // render
  render();
}


// Delete bookmark item from list
function handleBookmarkDelete() {
  // target delete button on click, remove item

  // render
  render();
}

// bundle event listener functions
const bindEventListeners = function () {
  handleAddBookmarkClicked();
  handleAddBookmarkSubmit();
  handleBookmarkExpandClicked();
  handleRatingFilterChanged();
  handleBookmarkDelete();
};

// export
export default {
  render,
  bindEventListeners
};