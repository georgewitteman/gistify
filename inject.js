/*inject.js*/

var links = document.links;

// Only convert url's that have the form of a gist
var gistURL = new RegExp("(http(s?):\/\/gist.github.com\/.*?\/[^\/]{20})(?!.)",['i']);

// For all the links on the webpage
for(var i = 0; i < links.length; i++) {
  // This weird syntax is needed to get the XMLHttpRequests to work properly
  (function(i){
    var xhr = []; // An empty array of what will be XMLHttpRequest objects

    // If the link matches the pattern of a gist url
    if(gistURL.test(links[i].href)) {

      var url = links[i].href + '.json'; // Set the url of the json file with data
      links[i].id = "gister_"+i; // Set the id of the link so that we know what link to replace

      // Youtube fix (Comments have a max height of 104px)
      links[i].parentElement.style.maxHeight =  "initial";

      xhr[i] = new XMLHttpRequest(); // Init an XMLHttpRequest object

      // Tell that object what page to go to and request type
      xhr[i].open("GET", url, true);

      // Once that page is finished loading run the callback function
      xhr[i].addEventListener("load", function() {

        // If the request is actually loaded && it was successful
        if (xhr[i].readyState == 4 && xhr[i].status == 200) {

          // Parse the response from server
          var resp = JSON.parse(xhr[i].responseText);

          var link = document.createElement("link"); //Create the link tag
          link.type = 'text/css'; // Set it's type to text/css
          link.rel = 'stylesheet'; // Set it's rel to stylesheet
          link.href = resp.stylesheet; // Set its href to the css file from the api

          document.head.appendChild(link); // Add the stylesheet to the head

          // Create a div and fill it with the content from the api
          var gist = document.createElement('div');
          gist.innerHTML = resp.div;

          // YouTube fix (The default white-space makes the gist have
          // too much padding)
          gist.style.whiteSpace = "normal";

          // Get the corresponding link
          var toSwitch = document.getElementById("gister_"+i);

          // This swaps out the link that's already present for the
          // div containing the gist that we created above
          toSwitch.parentNode.insertBefore(gist, toSwitch);
          toSwitch.parentNode.removeChild(toSwitch);
        }
      });
      xhr[i].send(); // Make the http request
    }
  })(i);
}
