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
        output += taskBoxWriter(task)
    }
    document.querySelector('div.tasksContainer').innerHTML = output
}

function taskBoxWriter(task){
    return (
        '<div class="taskBox">' +
            '<div class="taskTitle">' + `${task.title}` + '</div>' +
                '<div class="taskInformation">' + getFormattedTime(task) + '</div>' +
                '<div class="taskInformation">' + `${task.requesterName}` + '</div>' +
                '<div class="taskInformation">' + `${task.summaryFields[0].showValue}` + '</div>' + //TODO: getFormattedDescription() --> Fazer com que pule linha
        '</div>'
    )
}

function getFormattedTime(task){
    let options = {
        day: "numeric",
        month: "numeric",
        weekday: "long"
    }

    let date = new Date (task.dueDate * 1)
    let dateArr = (Intl.DateTimeFormat("pt-BR", options).format(date)).split(",") //--> [segunda-feira, 04/06]
    let weekDayStr = dateArr[0]
    weekDayStr = weekDayStr[0].toUpperCase() + weekDayStr.slice(1);  //capitalize first letter
    let dateStr = dateArr[1]
    
    return weekDayStr + "," + dateStr
}

