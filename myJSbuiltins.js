(function myJSBuiltins(){
  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  function requireObjectCoercible(objLike) {
    if (objLike == undefined) throw TypeError("Can't call method on " + objLike);
    return objLike;
  };

  if (myLibs) {
    myLibs("requireObjectCoercible", function(){
      return requireObjectCoercible;
    })
  }

  function toObject(objLike){
    return Object(requireObjectCoercible(objLike));
  }
})()