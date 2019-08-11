/* Todo 1: color the log messages */
var TinyTest = {

  run: function(tests) {
      var failures = 0;
      var successes = 0;
      
      for (var testName in tests) {
          var testAction = tests[testName];
          try {
              testAction.apply(this);

              console.log('%c' +  testName, 'color:green');
              successes++;
          } catch (e) {
              failures++;
              console.groupCollapsed("%c" + testName, "color: red");
              console.error(e.stack);
              console.groupEnd();
          }
      }

      setTimeout(function() { // Give document a chance to complete
          if (window.document && document.body) {
            renderPage(successes, failures);
          }
      }, 0);

      function renderPage(successes, failures){
        document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
        var updateText = successes + " successes, " + failures + " failures.";
        var updateEl = document.createElement("h1");
        updateEl.innerText = updateText;
        document.body.appendChild(updateEl);
      }
  },

  

  fail: function(msg) {
      throw new Error('fail(): ' + msg);
  },

  assert: function(value, msg) {
      if (!value) {
          throw new Error('assert(): ' + msg);
      }
  },

  assertEquals: function(expected, actual) {
      if (expected != actual) {
          throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
      }
  },

  assertStrictEquals: function(expected, actual) {
      if (expected !== actual) {
          throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
      }
  },

};

var fail               = TinyTest.fail.bind(TinyTest),
  assert             = TinyTest.assert.bind(TinyTest),
  assertEquals       = TinyTest.assertEquals.bind(TinyTest),
  eq                 = TinyTest.assertEquals.bind(TinyTest), 
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  tests              = TinyTest.run.bind(TinyTest);