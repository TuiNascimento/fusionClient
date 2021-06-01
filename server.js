const express = require('express')
const app = express()

const fusionReqs = require('./src/fusionReqs')

app.use(express.urlencoded({extended: true}))


let fusionUrl, user, password, JSESSIONID, userNeoid;

async function doLogin(req, res, next)
            {
              ({fusionUrl, user, password} = req.body)
              JSESSIONID = await fusionReqs.loginPost(fusionUrl, user, password);
              userNeoid = await fusionReqs.getUserNeoid(fusionUrl, JSESSIONID);
              (!!JSESSIONID && !!userNeoid) ? next() : res.end("Not possible to login or obtain user information");
            }

async function serveTasks(req,res)
            {
              data = await fusionReqs.getTasks(fusionUrl, JSESSIONID, userNeoid);
              let tasksArr = []
              for(date in data){
                for (task in data[date]){
                    tasksArr.push(data[date][task])}
              }

              res.json(tasksArr);
            }

//Página Inicial
app.get("/", (req,res) =>
{
    res.sendFile(__dirname + "/src/static/index.html")
    app.use("/src/static", express.static(__dirname + "/src/static"))
})

app.post("/login", doLogin, serveTasks)




app.listen("3000", function(){console.log("Node is listening on port 3000")})

