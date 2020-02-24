const monto = require("monto")
const db = monto("mongodb://localhost/dm")
db.connection(function(){
    console.log("Database connection successful!")
})
db.findMany("danmus",{}).skip(2).limit(3,true).then(function(docs){
    console.log(docs)
})