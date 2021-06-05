const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended: true}))

const middlewares = require('./middlewares')

//Login Page
app.get("/", (req,res) =>
  {
    res.sendFile(__dirname + "/src/static/index.html")
  }
)

app.use("/src/static", express.static(__dirname + "/src/static"))

//Integrates with fusion and redirects to the page that displays the tasks
app.post("/login", async (req,res)=>
  {
    try {
      await middlewares.doLogin(req, res)
      await middlewares.getUserInformation(req, res)
      await middlewares.fillTasks(req,res)
      res.redirect('/tasks');
    } catch (error) {
      console.log(error)
    }
  }
)

//Task's display page
app.get("/tasks", cors(), (req, res)=>
  {
  res.sendFile(__dirname + "/src/static/tasksPage.html")
  }
)

//API that responds with the currently stored tasks
app.get("/getTasks", (req, res)=>
  {
  res.json(middlewares.getFilledTasks(req,res))
  }
)

const port = (process.env.PORT || "3000")
app.listen(port, ()=>{console.log("Node is listening on port " + port)})

