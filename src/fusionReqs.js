const { default: axios } = require("axios");
//axios.defaults.withCredentials = true

module.exports = {
    loginPost :  async function(fusionUrl, user, password){
        try { 
            const {headers}  = await axios
            ({
                method: 'post',
                url: fusionUrl + "/portal/action/Login/view/normal",
                params:{
                action: 'login',
                domain: '',
                user: user,
                pass: password,
                }
            })
            JSESSIONID = headers['set-cookie'][0].split(";")[0];
            
            return JSESSIONID
            
        } catch (error) {
            console.log("Not possible to execute --loginPost() -->"+error)
        }
    },
    getUserNeoid: async function(fusionUrl, JSESSIONID){
        try {
            const {data} = await axios({
                    method: 'get',
                    url: fusionUrl + "/rest/constants?module=Core&module=TaskCentral",
                    headers:{
                        Cookie: JSESSIONID,
                    },
                })
            
            let userNeoid = data["Core"]["currentUser"]["id"]
            return userNeoid
            
        } catch (error) {
            console.log("Not possible to obtain user information --getUserNeoid() -->" + error)
        }
    },
    getTasks: async function(fusionUrl, JSESSIONID, userNeoid){
        try {
            const {data} = await axios({
                method: 'post',
                url: fusionUrl + "/services/task/tasks/user/" + userNeoid,
                headers:{
                    Cookie: JSESSIONID,
                    'content-encoding': 'gzip',
                    'content-type': 'application/json;charset=utf-8'
                },
                data:{
                    boxId: -1,
                    boxType: "INBOX",
                    currentUser: userNeoid,
                    groupBy: "DUEDATE",
                    inGroup: true,
                    offset: 0,
                    order: "asc",
                    range: 20,
                    showInboxPool: false}
            })

            return data
            
        } catch (error) {
            console.log(error)
        }
    }
}