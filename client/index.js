var joinButton = document.getElementById("joinButton");
var createButton = document.getElementById("createButton");
var loginModal = document.getElementById("loginModal");
var modal = document.getElementById("modalContent");
var dark = document.getElementById("theme");
var sheets = document.styleSheets;
var dcs = ['#202020','#0066CC','#404040','#5C80BC','#D9DBF1'];
var lcs = ['#d9fff5','#6ccff6','#333333','#313e50','#33658a'];
var theme = 0;
console.log(sheets[0]);

sheets[0].insertRule(':root{  --baseColor: '+ dcs[0]+'; --highlight: '+dcs[1]+';  --light: '+dcs[2]+';  --bg: '+dcs[3]+';  --offwhite: '+dcs[4]+'; }', 1);

var login = function(){
  loginModal.style.display = "block";
}

sheets[0].removeRule();
joinButton.onclick = login;
createButton.onclick = login;

dark.onclick = function(event){
  if(theme == 0){
    theme = 1;
    sheets[0].deleteRule(0);
    sheets[0].insertRule(':root{  --baseColor: '+ lcs[0]+'; --highlight: '+lcs[1]+';  --light: '+lcs[2]+';  --bg: '+lcs[3]+';  --offwhite: '+lcs[4]+'; }', 0);
  }
  else{
    theme = 0;
    sheets[0].deleteRule(0);
    sheets[0].insertRule(':root{  --baseColor: '+ dcs[0]+'; --highlight: '+dcs[1]+';  --light: '+dcs[2]+';  --bg: '+dcs[3]+';  --offwhite: '+dcs[4]+'; }', 0);
  }
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}
