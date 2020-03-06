import store from './store.js';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/connor';

const listApiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
 
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};


function getItems() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function createItem(title, url, rating, desc){

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
  return listApiFetch(`${BASE_URL}/bookmarks`, {
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
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getItems,
  createItem,
  //  updateItem,
  deleteItem
};