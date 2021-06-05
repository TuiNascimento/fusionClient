const fusionReqs = require('./src/fusionReqs')

let fusionUrl, user, password, JSESSIONID, userNeoid, tasksArr;

module.exports = {
    doLogin : 
        //login on Fusion and stores the JSESSIONID and user's neoId for further use
        async function (req, res)
        {   
            try 
            {
                ({fusionUrl, user, password} = req.body)
                JSESSIONID = await fusionReqs.loginPost(fusionUrl, user, password);
                userNeoid = await fusionReqs.getUserNeoid(fusionUrl, JSESSIONID);

                if(!(!!JSESSIONID))
                res.end("Not able to login with the provided information.");
            } catch (error) 
            {
                console.log(error)
            }
        }
    ,
    getUserInformation :
        async function (req, res)
        {   
            try 
            {
                ({fusionUrl, user, password} = req.body)
                userNeoid = await fusionReqs.getUserNeoid(fusionUrl, JSESSIONID);

                if(!(!!JSESSIONID && !!userNeoid))
                res.end("Not able to get user information.");
            } catch (error) 
            {
                console.log(error)
            }
        }
    ,
    fillTasks :
        //populates the tasksArr
        async function (req,res)
        {   
            try {
                let data = await fusionReqs.getTasks(fusionUrl, JSESSIONID, userNeoid);
                tasksArr = [];
                for(date in data){
                    for (task in data[date]){
                        tasksArr.push(data[date][task])
                    }
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    ,
    getFilledTasks : 
    
        function(req, res)
        {
            return tasksArr
        }
    

}