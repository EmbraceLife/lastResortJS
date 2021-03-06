(function(root, undefined) {
  /* debugger;
  (function(root, undefined){
    console.log(root);
    console.log(undefined); // make sure undefined is really undefined
  })(window);
  */

  var lib = {};
  lib.version = '0.4.1';

  // default parameters stored in the object settings 
  lib.settings = {
    currency: {
      symbol : "$",		// default currency symbol is '$'
      format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
      decimal : ".",		// decimal point separator
      thousand : ",",		// thousands separator
      precision : 2,		// decimal places
      grouping : 3		// digit grouping (not implemented yet)
    },
    number: {
      precision : 0,		// default precision on numbers is 0
      grouping : 3,		// digit grouping (not implemented yet)
      thousand : ",",
      decimal : "."
    }
  };
  /* debugger;
  lib.settings; lib.settings.number; lib.version; */

  var nativeMap = Array.prototype.map,
    nativeIsArray = Array.isArray,
    toString = Object.prototype.toString;

  function isString(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  }
  // debugger;
  // isString("str"); // step in, !! === Boolean, 
  // (obj && obj.charCodeAt && obj.substr); // return the last value
  // Boolean(1) === !!(1) !== (1);


  function isArray(obj) {
    return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
  }
  /* debugger;
  isArray([]); // expect an argument of array
  toString([]); // expect no argument, like toString(), return [object, undefined]
  toString.call([]); // [object, Array], call takes [] to be the class?
  toString.call(1); // [object, Number] */

  
  function isObject(obj) {
    return obj && toString.call(obj) === '[object Object]';
  }
  /* debugger;
  isObject({});
  undefined && true; NaN && true; 
  // return true if object, otherwise the thing itself */

  /* pass unique content of defs to object */
  function defaults(object, defs) {
    var key;
    object = object || {};
    defs = defs || {};
    // Iterate over object non-prototype properties:
    for (key in defs) {
      if (defs.hasOwnProperty(key)) {
        // Replace values with defaults only if undefined (allow empty/zero values):
        if (object[key] == null) object[key] = defs[key];
        // if (object[key] === undefined) object[key] = defs[key]; // is better I think
      }
    }
    return object;
  }
  // debugger;
  // objEq(defaults(undefined,{number: 1, str: "yes"}), {number: 1, str: "yes"});
  // var a = ['yes']; a['number'] = 1;
  // arrayEq(defaults(["yes"], {number:1}), a);
  // var b = ['yes']; b['number'] = 2;
  // arrayEq(defaults(b, a), b);
  // var a = {str: undefined, number: undefined}, b = {str: 'yes', number: 1};
  // objEq(defaults(a, b), b);
  // eq(defaults("yes", {number:1}), 'yes');
  // eq(defaults(1, {number:1}), 1);
  // undefined || {}; undefined && {};
  

  function map(obj, iterator, context) {
    var results = [], i, j;

    if (!obj) return results;

    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    /* New Pattern ::: (nativeMap && obj.map === nativeMap) 
    to make sure nativeMap is not assigned to something else other than Array.prototype.map method */

    // the shortest way to implement array.map
    for (i = 0, j = obj.length; i < j; i++ ) {
      results[i] = iterator.call(context, obj[i], i, obj);
    }
    return results;
  }
  /* debugger;
  map([1,2,3], function(el){return String(el);}) // ['1','2', '3']
  map([1,2,3], function(el){return String(el) + this.str;}, {str: "yes"}); */

  /* why does it called checkPrecision when it is just round up numbers??? 
  - it made sense when used inside toFixed method
  */
  function checkPrecision(val, base) {
    val = Math.round(Math.abs(val));
    return isNaN(val)? base : val;
  }
  // debugger;
  // eq(checkPrecision(-2.13), 2);
  // eq(checkPrecision([undefined]), 0);
  // eq(checkPrecision(NaN), undefined);
  // eq(checkPrecision(NaN, 2), 2);

  /* return an object with pos, neg, zero situation formats */
  function checkCurrencyFormat(format) {
    var defaults = lib.settings.currency.format;

    if ( typeof format === "function" ) format = format();
    // debugger;
    // checkCurrencyFormat(function(){return "%s%v";});

    if ( isString( format ) && format.match("%v") ) {
    // format.match("%v") /* returns an array, if not matched return null */

      return {
        pos : format,
        neg : format.replace("-", "").replace("%v", "-%v"),
        zero : format
      };
      // debugger;
      // checkCurrencyFormat("%s%v");

    } else if ( !format || !format.pos || !format.pos.match("%v") ) {

      return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
        pos : defaults,
        neg : defaults.replace("%v", "-%v"),
        zero : defaults
      };
    }
    // debugger;
    // checkCurrencyFormat();
    // checkCurrencyFormat({neg: "%v"});
    // checkCurrencyFormat({pos: "%a"});
    // or defaults is not a string
    

    return format;
    // debugger;
    // checkCurrencyFormat({pos: "%v"});
  }
  

  /* --- API Methods --- */

  var unformat = lib.unformat = lib.parse = function(value, decimal) {
    // beautiful recursive pattern !!!
    if (isArray(value)) {
      return map(value, function(val) {
        return unformat(val, decimal);
      });
    }
    // unformat([['$1','&2','3#']]); =>[[1,2,3]]
    // unformat([['$1'],['&2'],['3#']]); => [[1],[2],[3]]

    // Fails silently (need decent errors):
    value = value || 0;
    // unformat([[undefined,NaN,null]]); => [[0,0,0]]
    

    // Return the value as-is if it's already a number:
    if (typeof value === "number") return value;
    // unformat([[1.23,2.4,3.5]]); => [[1.23,2.4,3.5]]

    // Default decimal point comes from settings, but could be set to eg. "," in opts:
    decimal = decimal || lib.settings.number.decimal;
    // unformat([['1,2',3]], ","); => [[1.2, 3]]

    // Build regex to strip out everything except digits, decimal point and minus sign:
    var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
      unformatted = parseFloat(
        ("" + value)
        .replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
        .replace(regex, '')         // strip out any cruft
        .replace(decimal, '.')      // make sure decimal point is standard
      );
    // unformat([['(1)',2,3]]); => [[-1,2,3]]
    // unformat([[1,'$2','3#']]); => [[1,2,3]]
    // unformat([["one", "zero", "three"], ['four']]); => [[0,0,0],[0]]
    // unformat([[1,2,'3,12']], ","); => [[1,2,3.12]]

    // This will fail silently which may cause trouble, let's wait and see:
    return !isNaN(unformatted) ? unformatted : 0;
  };
  // debugger;
  // unformat([1,'(2)', '$(3)']); /* => [1,-2,-3] */
  

  /* toFixed(value, precision) can make sure user won't break precision */
  var toFixed = lib.toFixed = function(value, precision) {
    precision = checkPrecision(precision, lib.settings.number.precision);
    // eq(toFixed(2.345, -2.13),toFixed(2.345, 2));
    var power = Math.pow(10, precision);

    // Number.toFixed(precision) is the native method
    return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
  };
  // debugger;
  // eq(toFixed(2.345, -2.13),toFixed(2.345, 2));
  // eq(toFixed(2.345, -2.5),toFixed(2.345, 2.99));
  // eq(toFixed(2.345, -3.99),2.345.toFixed(4));

  var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
    // new pattern : recursion again
    if (isArray(number)) {
      return map(number, function(val) {
        return formatNumber(val, precision, thousand, decimal);
      });
    }

    number = unformat(number);

    var opts = defaults(
        (isObject(precision) ? precision : {
          precision : precision,
          thousand : thousand,
          decimal : decimal
        }),
        lib.settings.number
      ),

      usePrecision = checkPrecision(opts.precision),

      negative = number < 0 ? "-" : "",
      /* get int version of number */
      base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
      /* how many digits ahead of the most left thousand symbol */
      mod = base.length > 3 ? base.length % 3 : 0;

    // "" + "5," + "318,008" + ".12"
    return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
  };
  // debugger;
  // eq(formatNumber(5318008.12, 2), '5,318,008.12');
  // eq(formatNumber(9876543.21, 3, " ", ","), '9 876 543,210');
  // base = '12345678987669'
  // base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand)
  // /(\d{3})(?=\d)/g ::: regexr.com/4k1il


  var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {

    if (isArray(number)) {
      return map(number, function(val){
        return formatMoney(val, symbol, precision, thousand, decimal, format);
      });
    }

    number = unformat(number);

    var opts = defaults(
        (isObject(symbol) ? symbol : {
          symbol : symbol,
          precision : precision,
          thousand : thousand,
          decimal : decimal,
          format : format
        }),
        lib.settings.currency
      ),

      // Check format (returns object with pos, neg and zero):
      formats = checkCurrencyFormat(opts.format),

      // Choose which format to use for this value:
      useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

    // Return with currency symbol added:
    return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
  };
  // debugger;
  // formatMoney(12345678); // $12,345,678.00
  // formatMoney(12345678, "$", 2, ",", ".", "%s%v"); // $12,345,678.00
  // formatMoney(4999.99, "€", 2, ".", ","); // €4.999,99
  // formatMoney(-500000, "£ ", 0); // £ -500,000
  // formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }); // 5,318,008.00 GBP


  /**
   * Format a list of numbers into an accounting column, padding with whitespace
   * to line up currency symbols, thousand separators and decimals places
   *
   * List should be an array of numbers
   * Second parameter can be an object containing keys that match the params
   *
   * Returns array of accouting-formatted number strings of same length
   *
   * NB: `white-space:pre` CSS rule is required on the list container to prevent
   * browsers from collapsing the whitespace in the output strings.
   */
  lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
    if (!list) return [];

    /* opts = {
    decimal: "."
    format: "%s%v"
    grouping: 3
    precision: 2
    symbol: "$ "
    thousand: "," }
    */
    var opts = defaults(
        (isObject(symbol) ? symbol : {
          symbol : symbol,
          precision : precision,
          thousand : thousand,
          decimal : decimal,
          format : format
        }),
        lib.settings.currency
      ),

      // {pos: "%s%v", neg: "%s-%v", zero: "%s%v"}
      formats = checkCurrencyFormat(opts.format),

      // true if symbole first; false if value first
      padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

      maxLength = 0,

      formatted = map(list, function(val, i) {
        if (isArray(val)) {
          // recursion
          return lib.formatColumn(val, opts);
        } else {
          val = unformat(val);
          // choose format for each value 
          var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero;
          // apply format to each value
          var fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));
          // keep track the longest string length for each value
          if (fVal.length > maxLength) maxLength = fVal.length;

          return fVal;
        }
      });

    
    return map(formatted, function(val, i) {
      
      if (isString(val) && val.length < maxLength) {
        // padAfterSymbol ?  "$        123.50"  : "       $ 123.50"
        return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
      }
      return val;
    });
  };
  // debugger;
  // lib.formatColumn([123.5, 3456.49, 777888.99, 12345678, -5432], "$ ");
  /* ["$        123.50", "$      3,456.49", "$    777,888.99", "$ 12,345,678.00", "$     -5,432.00"] */

  /* --- Module Definition --- */

  // Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
  // debugger;
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = lib;
    }
    exports.accounting = lib;
  } else if (typeof define === 'function' && define.amd) {
    // Return the library as an AMD module:
    define([], function() {
      return lib;
    });
  // Otherwise, just add `accounting` to the global object
  } else {
    // Use accounting.noConflict to restore `accounting` back to its original value.
    // Returns a reference to the library's `accounting` object;
    // e.g. `var numbers = accounting.noConflict();`
    debugger;
    root.accounting = "this is an old accounting.";

    lib.noConflict = (function(oldAccounting) {
      return function() {
        // use IIFE save the oldAccounting info
        root.accounting = oldAccounting;
        // Delete the noConflict method:
        lib.noConflict = undefined;
        // Return reference to the library to re-assign it:
        return lib;
      };
    })(root.accounting);

    // Declare `fx` on the root (global/window) object:
    root['accounting'] = lib;
  }
  
  // Root will be `window` in browser or `global` on the server:
}(this));

// debugger;
/* at the moment, the oldAccounting only exist in enclosing scope, not global scope */
// accounting.noConflict();
