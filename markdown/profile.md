```javascript
Function.call.call(f=>f(f),null,f=>{

Name       : 'TSUYUSATO Kitsune'
Gender     : 'Male'
Birthday   :  4/15
Location   : 'Tokyo, Japan'
Skill      : ['JavaScript', 'Haskell', 'Crystal']
Hobby      : `Writing Quine program`
Homepage   :  https://makenowjust.github.io/
Handle     : /[Mm]ake[._]?[Nn]ow[._]?[Jj]ust/, {
  GitHub   : '@MakeNowJust',
  Twitter  : '@make_now_just',
  Facebook : 'make.just.on',
  Qiita    : '@make_now_just',
}

/* Note: This is Quine.                                                  */
/*       Let's try `curl http://makenowjust.github.io/profile.js | node` */

console.log(`Function.call.call(f=>f(f),null,${f})`)})
```
