function testScratch(tsts){
  if (typeof tsts !== "object") {
    throw new TypeError(tsts + " should be an object with methods.");
  }

  var successes = 0;
  var failures = 0; 

  for (var tsDesc in tsts) {
    var tsMethod = tsts[tsDesc];
    try {
      tsMethod();
      successes++;
      console.log("%c" + tsDesc, "color: green");
    }
    catch(e){
      failures++;
      console.groupCollapsed("%c"+tsDesc, "color: red");
      console.error(e);
      console.groupEnd();
    }
  }

  setTimeout(function(){
    // if (window.document && document.body) {
    renderPage(successes, failures);
    // }
  }, 0);

  function renderPage(s, f) {
    var display = document.createElement('h1');
  
    display.innerText = s + " successes, " + f + " failures."
  
    document.body.appendChild(display);
  
    document.body.style.backgroundColor = (f === 0) ? "green" : "red";
  /* let's test our lib so far. Now in order to put codes of DOM after JS codes run, we use setTimeOut to delay it */
  }
}

function fail(){
  throw new Error("fail(): is to fail for nothing");
}

function eq(expected, actual){
  if (expected !== actual) {
    throw new Error("we expect " + expected + ", but got " + actual);
  }
}



