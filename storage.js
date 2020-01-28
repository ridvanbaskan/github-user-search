class Storage {
  static getDatasFromStorage() {
    let users;
    if (localStorage.getItem('users') === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem('users'));
    }
    return users;
  }

  static addDataToStorage(user) {
    let users = this.getDatasFromStorage();
    if (!users.includes(user)) {
      users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
  }

  static clearAllSearchedFromStorage() {
    localStorage.removeItem('users');
  }
}
