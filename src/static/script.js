async function getContent(){
    try {
        const response = await fetch('http://localhost:3000/getTasks')
        const data = await response.json();
        show(data)
    } catch (error) {
        console.log(error)
    }
}

getContent();

function show(tasks){
    
    let output = ''

    for (let task of tasks){
        output += `<div class="taskBox">${task.title}</div>`

        document.querySelector('div.tasksContainer').innerHTML = output
    }
}