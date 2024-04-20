/*  flatten.js -- flattens the object
    - the idea is to be able to flatten the object to be 'aaa.bbb.ccc':value format so we can immediately update into mongodb. This will be part of the project-x where we updating the mongodb through xmongo. May be puts it in xmongo.js
    
    - how to use
        const flat = require('./flatten.js')
        flat = flat.flat //to make it shorter

        //if we have object like
        x = {
          name:'john',
          address:{
            city: ?????????,
            country: ????????????
          }
        }

        //put the obj in
        let flattened = flat.$(x)

        //then we get like
        flattened = {
          name:'john',
          'address.city': ????????????,
          'address.country': ????????????????
        }

        //the output is in the flat.o

    - programmer: M, http://m.me/mutita.org
    - license: no
    - tested date: Fri Apr 19 2024 17:26:12 GMT+0700 (Indochina Time)
    - version: 0.2 Fri Apr 19 2024 21:44:42 GMT+0700 (Indochina Time)
    - note: This thing run through every property of your object so we ensure that all levels are flattened. Some minors will be added more like make it returning the output instead of let you take it at the flat.o 


*/



const flat = {
  o: {},
  motherKey: '',
  motherOj: '',
  topLevel: true,
  levelInFamily: 0,
  activeFamily: '',
  family: {}
}

flat.$ = function (i,upperKey=0,family=0) {
  
  if (typeof i == 'object' && !Array.isArray(i)) { //valid check
    
    //very start point
    if (!this.motherKey) {
      this.motherKey = Object.keys(i),
      this.motherOj = i
      this.o = {}
    } 

    let loopCount = 0

    for (key in i) {
      if (i == this.motherOj) {
        this.topLevel = true
        this.levelInFamily = 0
      }  
      if (upperKey == family) {
        this.levelInFamily = 0
      }

      //set family
      if (!this.activeFamily) {
        this.activeFamily = key //starts at first motherKey
        this.family[this.activeFamily] = []
      } else if (key != this.activeFamily && this.topLevel) {
        //key not same of activeFamily && this is topLevel =mean= change to new family
        this.activeFamily = key 
        this.family[this.activeFamily] = []
      }

      if (typeof i[key] == 'object' && !Array.isArray(i[key])) { 
        //if obj, goes down deeper
        if (this.topLevel) {
          this.levelInFamily = 0
          this.family[key].push(key)
        } else {
          this.levelInFamily++
          this.family[family].push(key)
        }
        this.topLevel = false
        this.$(i[key], key, this.activeFamily)  //recursive ***

      } else { //when reached this, it's bottom of the obj
        if (this.topLevel) {
          this.o[key] = i[key]
        } else {
          this.o[ this.family[family].slice(0,this.levelInFamily+1).join('.') + '.' + key] = i[key]
        }
      }

      //to ensure the levelInFamily down correctly
      loopCount++
      if (loopCount == Object.keys(i).length) {
        this.levelInFamily--
      } 

      //this is the end point of the whole process
      if (loopCount == this.motherKey.length && i == this.motherOj) {
        //reset all values
        this.motherKey = '',
        this.motherOj = '',
        this.topLevel = true,
        this.levelInFamily = 0,
        this.activeFamily = '',
        this.family = {}
        
        return this.o
      }

    }


  } else {
    //not obj or array
    //console.log(false)
    return false
  }
}

module.exports = {flat}


/* NOTE
now can produce proper obj but need to find way to reset after done at the 'address' property.

2024-04-16  mostly done, all level are making the dotNaming but problem when the next dotName is heigher level and not the top level.

2024-04-19 14:34 everything seems worked, but may test a little more.
  actually this can be called the 'object flatener'

  21:45 everything should be perfectly done. The prog returns the output automatically. Everything's fine.


*/

/* STATUS

m testing  Fri Apr 19 2024 14:42:06 GMT+0700 (Indochina Time)
m released. #1713538186956




*/