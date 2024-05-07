# flatten
flattening the object, says if we have object like {aaa:{bbb:{ccc:{ddd:55555}}}} we flatten it to {'aaa.bbb.ccc.ddd':55555}
# use
there're occasions we not update the whole object but we do only some fields, this thing will help

```
// import it
const fl = require('./flatten.js')
<script src="flatten.js"></script> //for browser
<script src="https://cdn.jsdelivr.net/gh/devster-th/flatten/flatten.js"></script>  //for cdn

// if we have an object like ja
let ja = {
  aaa: 1000,
  bbb: {
    ccc: 2000,
  }
}

// and we have another jb that only changed a field from ja like
let jb = {
  bbb: {
    ccc: 3000
  }
}

// so we flatten the jb
let jc = fl.flat.$(jb)
let jc = flat.$(jb)   //for browser

// and we get
jc = {'bbb.ccc': 3000}

// so then we can update the ja only this little change
eval( 'ja.' + Object.keys(jc)[0] + ' = jc["' + Object.keys(jc)[0] + '"]' )

// this is like when we do manually: ja.bbb.ccc = jc['bbb.ccc'] so the value changes from 2000 to 3000

```

# test note
this thing can go down all level if you have 100 or more it will just deep down for every of your properties.
