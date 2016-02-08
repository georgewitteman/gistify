/*inject.js*/

var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++) {
  (function(i){ // This weird syntax is needed to get the XMLHttpRequests to work properly
    var xhr = []
    if(links[i].hostname == "gist.github.com") {

      var url = links[i].href + '.json';
      links[i].innerHTML = url;
      links[i].id = "gister_"+i;
      
      // Youtube fix
      links[i].parentElement.style.maxHeight =  "initial";

      xhr[i] = new XMLHttpRequest();
      xhr[i].open("GET", url, true);
      xhr[i].addEventListener("load", function() {
        if (xhr[i].readyState == 4 && xhr[i].status == 200) {
          var resp = JSON.parse(xhr[i].responseText);
          //console.log(xhr[i].responseText);

          var link = document.createElement("link");
          var head = document.head;

          link.type = 'text/css';
          link.rel = 'stylesheet';
          link.href = resp.stylesheet;

          head.appendChild(link)

          var gist = document.createElement('div');

          gist.innerHTML = resp.div;

          // YouTube fix
          gist.style = "white-space: normal !important;"

          var toSwitch = document.getElementById("gister_"+i);
          toSwitch.parentNode.insertBefore(gist, toSwitch);
          toSwitch.parentNode.removeChild(toSwitch);
        }
      });
      xhr[i].send();
    }
  })(i);
}
