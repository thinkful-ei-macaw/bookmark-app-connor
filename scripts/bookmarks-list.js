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

// generate initial view string
const generateInitialViewString = () => {
  let items = [...store.STORE.bookmarks];
  const bookmarkListString = generateBookmarkListString(items);

  return `<section id="initial-view">
  <div class="top-nav">
    <button type="button" id="add-bookmark-button">+ New</button>
    <form class="star-filter-form">
      <label for="filter-rating"></label>
      <select id="filter-rating" name="filter-rating">
        <option value=" ">Filter By Rating</option>
        <option value="2">1</option>
        <option value="3">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </form>
  </div>
  <ul class="bookmarks-list js-bookmarks-list">${bookmarkListString}
  </ul>
</section>`;
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
      <option value=" ">Choose Rating</option>
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
      <button type="submit" id="submit-bookmark">Create</button>
    </div>
  </form>
</section>`;
};

/* RENDER FUNCTION */
function render() {
  if (store.STORE.adding === true) {
    $('#container').html(generateAddBookmarkViewString());
  } else {

    $('#container').html(generateInitialViewString());
  }
}

/** EVENT HANDLERS */

// add bookmark add button clicked
function handleAddBookmarkClicked() {
  // update store to show adding = true
  $('#container').on('click', '#add-bookmark-button', () => {
    store.STORE.adding = true;
    render();
  });
}

// submit new bookmark form
function handleAddBookmarkSubmit() {
  $('#container').on('click', '#submit-bookmark', event => {
    event.preventDefault();
    const title = $('#bookmark-title').val();
    $('#bookmark-title').val('');
    const url = $('#bookmark-url').val();
    $('#bookmark-url').val('');
    const rating = $('#select-rating').val();
    $('#select-rating').val('');
    const desc = $('#add-description').val();
    $('#add-description').val('');

    api.createItem(title, url, rating, desc)
      .then(res => res.json())
      .then((newItem) => {
        store.addItem(newItem);
        render();
      });
    

  });
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
  // be sure to not change what is in the store (so filter in render function)

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