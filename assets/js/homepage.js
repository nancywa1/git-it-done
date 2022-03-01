var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term")
var formSubmitHandler = function (event) {
    event.preventDefault();
    // console.log(event);
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);

        repoContainerEl.textContent = '';
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
        
    }
}
var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

var displayRepos = function (repos, searchTerm) {
    if (repos.length===0){
        repoContainerEl.textContent="No repositories found."
        return;
    }

    for (var i = 0; i < repos.length; i++) {

        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href","./single-repo.html?repo="+repoName);


        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
    repoSearchTerm.textContent = searchTerm;
};
// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);