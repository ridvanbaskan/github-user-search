const form = document.getElementById('github-form');
const inputGithub = document.getElementById('github-input');
const searchDiv = document.getElementById('search-list');
const clearButton = document.getElementById('clear-search');
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
  form.addEventListener('submit', getData);
  document.addEventListener('DOMContentLoaded', getAllSearchedData);
  clearButton.addEventListener('click', clearAllSearched);
}

function getData(e) {
  const username = inputGithub.value.trim();

  if (username === '') {
    alert('Please enter a username...');
  } else {
    github
      .getInfo(username)
      .then(response => {
        if (response.user.message === 'Not Found') {
          ui.showAlert('Please enter a valid username...');
        } else {
          ui.loadSearchedtoUI(response.user);
          Storage.addDataToStorage(response.user.name);
          ui.loadDataToUI(response.user);
          ui.loadReposToUI(response.repo);
        }
      })
      .catch(err => console.error(err));
  }

  ui.clearInput(inputGithub);

  e.preventDefault();
}

function getAllSearchedData() {
  let users = Storage.getDatasFromStorage();
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    searchDiv.appendChild(li);
  });
  localStorage.setItem('users', JSON.stringify(users));
}

function clearAllSearched() {
  ui.clearAllSearchedFromUI();
  Storage.clearAllSearchedFromStorage();
}
