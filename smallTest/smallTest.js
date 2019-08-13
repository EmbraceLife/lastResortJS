/* 
Let's write the docs or specs for our smallTest library. 

docs or specs is really about how we use such a library. 
now, we need to go beyond basic description of what a library does to how to design the library structure (at least the basic skeleton)

1. tests(); all the tests will be tested using this function
    - Bear the following in mind
    - `tests()` function is upfront, but behind it could just be a method of a large object with many methods
    - to do in this way, other methods can be hidden and is much more user friendly
    - but when we write it in the first place, naturally we will just write a function called `tests`, rather than building an object directly.
2. tests({we write all the tests inside this object});
    - such a method takes in an object as the only argument
3. tests({
    "test 1 description": function(){
        all the lines which consist of test 1
    },

    "test 2 description": function(){
        all the lines which consist of test 2
    },
    });
    - such an object has many methods, each is a single test case
    - the key is the test description
    - the value is the function which includes all the codes which actually construct a test case
4. inside `tests`, each test will be assessed by executing the test block, e.g., test1Block(); test2Block();
    - to test a case is simply running the method 
    - in order to catch an error
5. if codes inside test1Block for example, running without error: 
    5.1 successes++; 
6. if encountered an error: 
    6.1 such an error will be caught and to be logged later
    6.2 failures++;
7. if failures === 0, then 
    7.1 log the test description with green color;
    7.2 put all logs into a Collapsible list underneath the log above
8. else, 
    8.1 log the test description with red color
    8.2 put errors into a collasible list underneath the log above
8. create h1 element
    - 8.1 update its content with the num of successes and failures
9. if failures === 0
    - 9.1 make window.body color green, else red
10. write another function `fail` 
    - 10.1 to simple throw an error for nothing
    - 10.2 we use this `fail()` inside a test case to cause an error before we actually write any code for the test case
11. write a function called `eq` 
    - 11.1 to throw an error if two values are not strictly equal
    - 11.2 we use this inside test case to easily cause an error
12. rewrite `tests`, `fail`, `eq` as methods of an object `TinyTest`
    - to better organize the code
13. use `tests = TinyTest.tests.bind(TinyTest)`, etc
    - 13.1 to allow `tests`, `fail` and `eq` live independently on their own from `TinyTest`
    - 13.2 this way is more user friendly
14. one more thing, we want the Dom update to execute till other codes finish
    - use `setTimeout(renderUpdate, 0)`
    - put step 8 and step 9 under `renderUpdate`

*/

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

      setTimeout(function() { 
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

  assertStrictEquals: function(expected, actual) {
      if (expected !== actual) {
          throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
      }
  },

};

var fail = TinyTest.fail.bind(TinyTest);
var eq = TinyTest.assertStrictEquals.bind(TinyTest);
var tests = TinyTest.run.bind(TinyTest);