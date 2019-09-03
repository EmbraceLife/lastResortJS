# Watch and Code Journal

## great resources 
- core.js https://github.com/zloirock/core-js
- cs50: react native https://www.youtube.com/playlist?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR
- codingTrain : ES 6 https://www.youtube.com/playlist?list=PLRqwX-V7Uu6YgpA3Oht-7B4NBQwFVe3pr
- todo mvc
- update node : https://bytearcher.com/articles/ways-to-get-the-latest-node.js-version-on-a-mac/
- Javascript.info, eliquent Javascript: code examples

next meeting
- what satisfy you the most? what cheers you up everyday?
- teach one way of healthy life through coding?

## 2019.8.30
[] cs50 
- this https://youtu.be/3Ay2lS6tm4M?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=6004
- class, new, constructor, super https://youtu.be/7O43VDOlQ_o?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=822

## 2019.8.29
[x] accounting.js: one method left
[] daily bites review
[x] builtin method rewrite: myCopywithin
[x] cs50 watch
- box wrap primitive to get prototype methods, `instanceOf` https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=3284
- the danger of changing prototype https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=3421
- difference between var and const/let scope 
    - https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=3534
    - https://youtu.be/3Ay2lS6tm4M?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=604
- hoisting https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=4015
- why hoisting explained with JS engine https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=4415
- declare global variable https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=4659
- global object https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=4744
- a typical closure caused error https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=5198
```
var a = [];
for (let i = 0; i < 5; i++){
  a.push(function(){console.log(i)});
}
a[3]();

var a = [];
for (i = 0; i < 5; i++){
  a.push(function(){console.log(i)});
}
debugger;
a[3]()


var a = [];
for (var i = 0; i < 5; i++){
a.push(
        (function(x){
        return function(){
            console.log(x);
            }
        })(i)
    );
}
debugger;
a[3]();
```
- IIFE https://youtu.be/3Ay2lS6tm4M?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=882
- func as first class https://youtu.be/3Ay2lS6tm4M?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=1460
- stack, APIs, function queue, event loop https://youtu.be/3Ay2lS6tm4M?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=3268
- Asyncrinous and promises, async + await https://youtu.be/3Ay2lS6tm4M?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=4263


## 2019.8.28
- nice recursive pattern found in `checkCurrencyFormat` in `Accounting.js`
- start to taking journal
- `myMap` is finished
- continued to work on `myCopywithin`, nearly finished.
- quote of the day: "live a normal healthy independent life"
- learn logic, communication and health management through coding
- Object.assign https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=2397
- deep copy https://youtu.be/X52b-8y2Hf4?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR&t=2649

2019.8.27
- not 'good vs bad code', but focusing on 'learn useful and new things'