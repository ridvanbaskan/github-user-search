class UI {
  constructor() {
    this.profileDiv = document.querySelector('.profile-container');
    this.reposDiv = document.querySelector('#repo-container');
    this.form = document.getElementById('github-form');
    this.searchDiv = document.getElementById('search-list');
  }

  clearInput(input) {
    input.value = '';
  }

  loadDataToUI(user) {
    this.profileDiv.innerHTML = '';
    this.profileDiv.innerHTML += `
        <div class="profile-img">
            <img
              src="${user.avatar_url}"
              alt=""
            />
            <a href="${user.url}">View Profile</a>
          </div>
          <div class="profile-info">
            <button class="specs">Public Repos: ${user.public_repos}</button>
            <button class="specs">Public Gists: ${user.public_gists}</button>
            <button class="specs">Followers: ${user.followers}</button>
            <button class="specs">Following: ${user.following}</button>
            <ul>
              <li>Company: ${user.company}</li>
              <li>Website/Blog: ${user.blog}</li>
              <li>Email: ${user.email}</li>
              <li>Location: ${user.location}</li>
              <li>Member since: ${user.created_at}</li>
            </ul>
          </div> `;
  }

  loadReposToUI(repos) {
    this.reposDiv.innerHTML = '';
    repos.forEach(repo => {
      this.reposDiv.innerHTML += `
    <div class="repo-content">
          <div class="repo-link">
            <a href="${repo.url}">${repo.name}</a>
          </div>
          <div class="repo-infos">
            <button>Stars: ${repo.stargazers_count}</button>
            <button>Wathcers Gists: ${repo.watchers_count}</button>
            <button>Forks: ${repo.forks}</button>
          </div>
        </div> `;
    });
  }

  showAlert(message) {
    const div = document.createElement('div');
    div.className = 'alert';
    div.textContent = message;
    this.form.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 2000);
  }

  loadSearchedtoUI(user) {
    let users = Storage.getDatasFromStorage();
    if (!users.includes(user.name)) {
      const li = document.createElement('li');
      li.textContent = user.name;
      this.searchDiv.appendChild(li);
    }
  }

  clearAllSearchedFromUI() {
    while (this.searchDiv.firstElementChild !== null) {
      this.searchDiv.firstElementChild.remove();
    }
  }
}
