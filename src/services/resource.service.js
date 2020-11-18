import { cursorTo } from 'readline';


var resources = require('../models/resource.model');
const functions = require('../shared/helper-functions');


module.exports = {
  fetchByEmail : fetchByEmail,
  upsert : upsert
}



function fetchByEmail(email) {
  let resource;
  let user;
  if(resources) {
    resource = resources.find(item => item.email === email);
  }
  
  return resource;
}

function upsert(resource) {
  resource.id = generateResourceId();
  
  if(resources) {
  let resourceIndex = resources.findIndex(res => res.email === resource.email);
  if(resourceIndex < 0) {
    resources.push(resource);
  } else {
    resources[resourceIndex] = resource;
  }
} else {
  resources = [];
  resources.push(resource);
}
}

function generateResourceId() {
  return ( resources && resources.length ? resources[resources.length - 1].id : 100000 ) + 1;
}