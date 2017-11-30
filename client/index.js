var joinButton = document.getElementById("joinButton");
var createButton = document.getElementById("createButton");
var loginModal = document.getElementById("loginModal");
var modal = document.getElementById("modalContent");
var dark = document.getElementById("theme");
var sheets = document.styleSheets;

var login = function(){
  loginModal.style.display = "block";
}

joinButton.onclick = login;
createButton.onclick = login;



window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}
