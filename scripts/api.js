import store from './store.js';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/connor';



function getItems() {
  return fetch(`${BASE_URL}/bookmarks`);
}

function createItem(title, url, rating, desc = 'placeholder'){

  const newItem = 
    {
    //  id: cuid(),
      title: title,
      url: url,
      desc: desc
    };

  if(rating) {
    newItem.rating = rating;
  }

  const newItemReady = JSON.stringify(newItem);
  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: newItemReady
  });
}

// function updateItem(id, updateData){
//   const updateDataStr = JSON.stringify(updateData);


//   return fetch(`${BASE_URL}/bookmarks/${id}`, {
//     method: 'PATCH', 
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: updateDataStr
//   });
// }

const deleteItem = function(id) {
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getItems,
  createItem,
  //  updateItem,
  deleteItem
};