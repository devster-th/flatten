# flatten
flattening the object
# use
there're occasions we not update the whole object but we do only some fields, this thing will help

```
// import it
const fl = require('./flatten.js')

// if we have an object like ja
let ja = {aaa:{bbb:{ccc:{ddd: 1000}}}}

// flatten it to jb
let jb = fl.flat.$(ja)

// result
jb = {'aaa.bbb.ccc.ddd': 1000}

// so now the object fa is flattened and we can use it to update just only that field instead of the whole fields like
let objectTobeUpdated = jb['aaa.bbb.ccc.ddd']

```
