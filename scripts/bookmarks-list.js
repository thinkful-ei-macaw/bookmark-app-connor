// import statements
import api from './api.js';
import store from './store.js';

/** STRING GENERATORS */

// generate string for single bookmark element
const generateBookmarkElementString = function (bookmark) {
  // let bookmarkTitle = `<span class="bookmark-title">${bookmark.title}</span>`;
  if (bookmark.expanded) {
    // append html
    return `<li class="bookmark-item" data-item-id="${bookmark.id}">
    <button type="button" class="bookmark-element"><span>${bookmark.title}</span></button>
          <p><a href="${bookmark.url}">Visit Site</a><span>  ${bookmark.rating} <i class="fas fa-star"></i></span></p>
          <p class="description">${bookmark.desc}
          </p>
          <button type="button" id="delete-bookmark">Delete</button>
  </li>`;
  } else {
    return `<li class="bookmark-item" data-item-id="${bookmark.id}">
    <button type="button" class="bookmark-element"><span class="title-span">${bookmark.title}</span><span class="rating-span">${bookmark.rating} <i class="fas fa-star"></i></span>
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
        <option value="1">1</option>
        <option value="2">2</option>
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

// generate filter view string
const generateFilterViewString = (filterValue) => {
  let items = store.STORE.bookmarks.filter(item => item.rating >= filterValue);
  const bookmarkListString = generateBookmarkListString(items);

  return `<section id="initial-view">
  <div class="top-nav">
    <button type="button" id="add-bookmark-button">+ New</button>
    <form class="star-filter-form">
      <label for="filter-rating"></label>
      <select id="filter-rating" name="filter-rating">
        <option disable selected value>Filter By Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
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
    <label for="bookmark-url">Add New Bookmark:</label>
    <input id="bookmark-url" type="url" placeholder="https://www.bookmark.com" required>
    <label for="bookmark-title"></label>
    <input id="bookmark-title" type="text" placeholder="Bookmark Title" required>
    <label for="select-rating"></label>
    <select id="select-rating" name="select-rating">
      <option value="3">Choose Rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <label for="add-description"></label>
    <input id="add-description" placeholder="Description"></input>
    <div id="add-bookmark-buttons">
      <button type="button" id="cancel">Cancel</button>
      <button type="submit" id="submit-bookmark">Create</button>
    </div>
  </form>
</section>`;
};

// generate error string
const generateErrorString = function(message) {
  return `<section class="error-content">
  <button id="cancel-error">X</button>
  <p>${message}</p>
</section>`;
};

/* RENDER FUNCTIONS */
// render error 
const renderError = function() {
  if (store.STORE.error) {
    const el = generateErrorString(store.STORE.error);
    $('#container').append(el);
  } else {
    $('.error-content').empty();
  }

};

// main render function
function render() {

  if (store.STORE.adding === true) {
    $('#container').html(generateAddBookmarkViewString());
  } else if (store.STORE.filter > 0) {
    // filter out items with rating less than filter value
    $('#container').html(generateFilterViewString(store.STORE.filter));
  } else {
    $('#container').html(generateInitialViewString());
  }
  renderError();

}

// function generateBookmarksString(bookmarklist, filter){
//  let bookmarks = bookmarklist     
//  if(filter){         
//     bookmarks = bookmarks.filter(function(item) {             
//       return item.rating >= filter;             
//     })     
//   }


/** EVENT HANDLERS */

const handleCancelClicked = function () {
  $("#container").on('click', '#cancel', () => {
    store.STORE.adding = false;
    render();
  });
}

const handleCloseError = function () {
  $('#container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

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
    // $('#bookmark-title').val('');
    const url = $('#bookmark-url').val();
    // $('#bookmark-url').val('');
    const rating = parseInt($('#select-rating').val());
    // $('#select-rating').val('');
    let desc = $('#add-description').val() || undefined;
    // if (!desc) {
    //   desc = undefined;
    // }
    
    // $('#add-description').val('');
    store.STORE.adding = false;

    api.createItem(title, url, rating, desc)
      // .then(res => res.json())
      .then((newItem) => {
        store.addItem(newItem);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        store.STORE.adding = true;
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
  $('#container').on('click', ('.bookmark-element'), event => {
    event.preventDefault;
    const id = getItemIdFromElement(event.target);
    const currentItem = store.findById(id);
    currentItem.expanded = !currentItem.expanded;
    render();
  });
}

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.bookmark-item')
    .data('item-id');
};

// Filter by rating
function handleRatingFilterChanged() {
  // be sure to not change what is in the store (so filter in render function)
  $('#container').on('change', '#filter-rating', () => {
    store.STORE.filter = parseInt($('#filter-rating').val());
    console.log(store.STORE.filter);
    render();
  });
}


// Delete bookmark item from list
function handleBookmarkDelete() {
  // target delete button on click, remove item
  $('#container').on('click', '#delete-bookmark', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id).then(() => {
      store.findAndDelete(id);
      render();
    });
  });
}

// bundle event listener functions
const bindEventListeners = function () {
  handleAddBookmarkClicked();
  handleAddBookmarkSubmit();
  handleBookmarkExpandClicked();
  handleRatingFilterChanged();
  handleBookmarkDelete();
  handleCloseError();
  handleCancelClicked();
};

// export
export default {
  render,
  bindEventListeners
};