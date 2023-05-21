const fs = require('fs');

const filePath = 'list.json';

function createFileIfNotExists() {
  if (!fs.existsSync(filePath)) {
    const initialData = {
      listUsers: []
    };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function isUserExisting(user) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileData);

  return jsonData.listUsers.includes(user);
}

function addUserToList(user) {
  createFileIfNotExists();

  if (isUserExisting(user)) {
    return;
  }

  const fileData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileData);

  jsonData.listUsers.push(user);

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
}

function removeUserFromList(user) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileData);

  const userIndex = jsonData.listUsers.indexOf(user);

  if (userIndex !== -1) {
    jsonData.listUsers.splice(userIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
    return true;
  }

  return false;
}

function removeAllUsersFromList() {
  createFileIfNotExists();

  const jsonData = {
    listUsers: []
  };

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
}

function getListCount() {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileData);
  const currentCount = jsonData.listUsers.length;
  const maxCount = 20;

  return { currentCount, maxCount };
}

function hasReachedMaxLimit() {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    const currentCount = jsonData.listUsers.length;
    const maxCount = 20;
  
    return currentCount >= maxCount;
}

function getAllNames(callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const names = jsonData.listUsers;
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = {
  createFileIfNotExists,
  isUserExisting,
  addUserToList,
  removeUserFromList,
  removeAllUsersFromList,
  getListCount,
  hasReachedMaxLimit,
  getAllNames
};
