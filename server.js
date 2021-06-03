const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const fusionReqs = require('./src/fusionReqs')
app.use(express.urlencoded({extended: true}))


//middlewares

let fusionUrl, user, password, JSESSIONID, userNeoid, tasksArr;

async function doLogin(req, res, next)
  {
    ({fusionUrl, user, password} = req.body)
    JSESSIONID = await fusionReqs.loginPost(fusionUrl, user, password);
    userNeoid = await fusionReqs.getUserNeoid(fusionUrl, JSESSIONID);
    (!!JSESSIONID && !!userNeoid) ? next() : res.end("Not possible to login or obtain user information");
  }

async function serveTasks(req,res)
  {
    let data = await fusionReqs.getTasks(fusionUrl, JSESSIONID, userNeoid);
    tasksArr = [];
    for(date in data){
      for (task in data[date]){
          tasksArr.push(data[date][task])}
    }

    res.redirect('/tasks');
  }


//Página Inicial
app.get("/", (req,res) =>
{
    res.sendFile(__dirname + "/src/static/index.html")
})

app.use("/src/static", express.static(__dirname + "/src/static"))

//integra c o fusion
app.post("/login", doLogin, serveTasks)

//Página que consome o back
app.get("/tasks", cors(), (req, res)=>{
  res.sendFile(__dirname + "/src/static/tasksPage.html")
})

app.get("/getTasks", (req, res)=>{
  res.json(tasksArr)
})

const port = (process.env.PORT || "3000")
app.listen(port, ()=>{console.log("Node is listening on port " + port)})

