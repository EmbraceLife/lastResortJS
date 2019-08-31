
(function createLibrarySystems(){
  var libraryStorage = {};

  function librarySystem(libraryName, callback){
      if (arguments.length > 1){
        libraryStorage[libraryName] = callback(); 
      } else { 
        return libraryStorage[libraryName]; 
      }
  }

  window.myLibs = librarySystem; 
})();  


(function createMyDebugger(){
  function sayHi() {
    console.log('hello');
  }
  // runWithDebugger(sayHi); /* should start to debug on sayHi */
    
  function sayHiTo(name) {
    console.log('hi ' + name);
  }
  // runWithDebugger(sayHiTo, ['Daniel']); /* should start to debug on sayHiTo */

  function sayFullName(first, last) {
    console.log(first + ' '  + last);
  }
  // runWithDebugger(sayFullName, ['Daniel', 'L']); /* should start to debug on sayFullName */

  function runWithDebugger(callback, argsArray){
    debugger;
    callback.apply(this, argsArray);
  }

  if (typeof myLibs !== undefined) {

    myLibs("myDebugger", function(){
      return runWithDebugger
    });

  } else {

    window.myDebugger = runWithDebugger; 
  }

})();

(function createTests(){
  var SimpleTest = {

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
          var updateText = (successes + failures) + " tests : " + successes + ((successes > 1) ? " successes, " : " success, ") + failures + ((failures > 1) ? " failures." : " failure.");
          // var testSection = document.createElement("h1");
          // testSection.innerText = msg;
          // document.body.appendChild(testSection);
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
        return true;
    },
  
    arrayEquals: function(array1, array2){
        if (array1.length !== array2.length) {
            throw new Error('arrayEquals() ::: two arrays have no equal length.');
        }
        for (i = 0; i < array1.length; i++){
            if (array1.hasOwnProperty(i) !== array2.hasOwnProperty(i)){
              throw new Error(array1.hasOwnProperty(i) ? "array1 is not sparse; but array2 is sparse;" : "array2 is not sparse; but array1 is sparse;");
            }
            if (array1[i] !== array2[i]) {
                throw new Error("arrayEquals() ::: element values are not equal.")
            }
        }
        return true;
    },
  
    /* both objects' keys have to be in the same order to use this objEquals method */
    objEquals: function(obj1, obj2){
      var obj1Keys = Object.keys(obj1);
      var obj2Keys = Object.keys(obj2);
      if (obj1Keys.length !== obj2Keys.length) {
          throw new Error('objEquals() ::: two objects have no equal number of keys.');
      }
  
      for (i in obj1Keys) {
          if (obj1Keys[i] !== obj2Keys[i]) {
              throw new Error("objEquals() ::: object2 does not have the same key : "+i);
          } else {
              if (obj1[obj1Keys[i]] !== obj2[obj2Keys[i]]){
                  throw new Error('objEquals() ::: same keys do not match the same values, the key is :' + i);    
              }
          }
      }
      return true;
    }
  
  };
  
  

  if (myLibs !== undefined){
    myLibs("fail", function(){
      return SimpleTest.fail;
    });

    myLibs("eq", function(){
      return SimpleTest.assertStrictEquals;
    });

    myLibs("arrayEq", function(){
      return SimpleTest.arrayEquals;
    });

    myLibs("objEq", function(){
      return SimpleTest.objEquals;
    });

    myLibs("tests", function(){
      return SimpleTest.run;
    });

  } else {
    /* Everything works the same after comment out hte later part */
    window.fail = SimpleTest.fail//.bind(TinyTest);
    window.eq = SimpleTest.assertStrictEquals//.bind(TinyTest);
    window.arrayEq = SimpleTest.arrayEquals//.bind(TinyTest);
    window.objEq = SimpleTest.objEquals//.bind(TinyTest);
    window.tests = SimpleTest.run//.bind(TinyTest);
  }
})()

var arrayEq = myLibs('arrayEq');
var eq = myLibs('eq');
var myDebugger = myLibs("myDebugger");
