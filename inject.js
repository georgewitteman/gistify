/*inject.js*/

var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++) {

  console.log("Hostname: " + links[i].hostname);
  if(links[i].hostname == "gist.github.com") {

    links[i].id = links[i].id + "gister";

    var url = links[i].href + '.json';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {

        var resp = JSON.parse(xhr.responseText);

        var link = document.createElement("link");
        var head = document.head;

        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = resp.stylesheet;

        head.appendChild(link)

        var gist = document.createElement('div');
        gist.innerHTML = resp.div;

        var toSwitch = document.getElementById("gister");
        console.log(toSwitch);
        toSwitch.parentNode.insertBefore(gist, toSwitch);
        toSwitch.parentNode.removeChild(toSwitch);
      }
    };
    xhr.send();
  }
}
