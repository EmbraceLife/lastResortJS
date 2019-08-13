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

  var display = document.createElement('h1');
  display.innerText = successes + " successes, " + failures + " failures."

  document.body.appendChild(display);

  document.body.style.backgroundColor = (failures === 0) ? "green" : "red";
  /* let's test our lib so far */
}