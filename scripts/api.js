const BASE_URL = 'https://thinkful-list-api.herokuapp.com/connor';

function getItems() {
  return fetch(`${BASE_URL}/bookmarks`);
}

function createItem(title, url, rating, desc){

  const newItem = JSON.stringify(
    {
      id: cuid(),
      title: title,
      url: url,
      rating: rating,
      desc: desc
    });

  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: newItem
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