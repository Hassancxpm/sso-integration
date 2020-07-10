let keycloak = new Keycloak();

keycloak.init({
  onLoad: "check-sso",
  //onLoad: "login-required"
});

keycloak.onAuthSuccess = function () {
  keycloak
    .loadUserProfile()
    .success(function (profile) {
      let firstName = profile.firstName;
      let lastName = profile.lastName;
      let h1 = document.getElementsByTagName("H1")[0];
      h1.innerHTML = "Bonjour " + firstName + " " + lastName;
      if (profile.attributes.isExhibitor[0].length > 0) {
        let isExhibitor = profile.attributes.isExhibitor[0];
        if (isExhibitor === "true") {
          const medal = `<div class="quiz-medal"><div class="quiz-medal__circle quiz-medal__circle--gold"></div>
          <div class="quiz-medal__ribbon quiz-medal__ribbon--left"></div>
          <div class="quiz-medal__ribbon quiz-medal__ribbon--right"></div>
        </div>`;
          h1.innerHTML += medal;
        }
      }
    })
    .catch(function (e) {
      console.log(e);
    });
  document.getElementById("logoutButton").style.display = "block";
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("signButton").style.display = "none";
};

function logout() {
  keycloak.logout();
}

function login() {
  keycloak.login();
}

function signup() {
  debugger;
  keycloak.register();
}
