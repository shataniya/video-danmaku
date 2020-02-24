const sofer = require("sofer")
const monto = require("monto")
const db = monto("mongodb://localhost/dm")
db.connection(function(){
    console.log("connected database successful!")
})

const server = new sofer()
server.use(sofer.cors()).use(sofer.postParse())

server.get("/",ctx=>{
    ctx.body = "Hello World"
})

/**
 * @description Create a variable to store the barrage
 */
var danmuBox = null
db.find("danmus",{},true).then(function(data){
    danmuBox = data
})

server.get("/dm",async ctx=>{
    ctx.body = danmuBox
})

server.post("/dm",ctx=>{
    db.insertOne("danmus",ctx.parse).then(function(){
        console.log("insert successful!")
    })
    db.find("danmus",{},true).then(function(data){
        danmuBox = data
    })
    ctx.body = "connected"
})

server.listen(3000)
