// declares variables for each task element

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskButton");


// saves tasks even after refreshing
const savedTasks = localStorage.getItem('tasks');
let tasks = [];

if (savedTasks) {   // local data
    tasks = JSON.parse(savedTasks);

    tasks.forEach(function(task) {

        const li = document.createElement('li');
        li.textContent = task.text;

        const selectBtn = document.createElement('select');

        ['To Do', 'In Progress', 'Completed'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            selectBtn.appendChild(option);
        });

        selectBtn.value = task.status;

        if (task.status === 'In Progress'){
            selectBtn.style.backgroundColor = "yellow"
        }
        if (task.status === 'Completed'){
            selectBtn.style.backgroundColor = "#03C04A"
        }

        selectBtn.addEventListener('change', function() {
            const newStatus = selectBtn.value;
            const index = tasks.findIndex(t => t.text === task.text);
            if (index !== -1) {
                tasks[index].status = newStatus;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', function(){
            li.remove();
            tasks = tasks.filter(t => t.text !== task.text);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        li.appendChild(selectBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
     });
}

// adds a task when add is clicked
addTaskButton.addEventListener('click', function(){
    const taskText = taskInput.value.trim();

    if (taskText === ''){
        alert('Enter a task!')
        return;
    }

    const newTask = { text: taskText, status: 'To Do' };
    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = document.createElement('li');
    li.textContent = newTask.text;

    const selectBtn = document.createElement('select');

    ['To Do', 'In Progress', 'Completed'].forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        selectBtn.appendChild(option);
    });

    selectBtn.value = newTask.status;

    selectBtn.addEventListener('change', function() {
        const newStatus = selectBtn.value;
        const index = tasks.findIndex(t => t.text === newTask.text);
        if (index !== -1) {
            tasks[index].status = newStatus;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        if (newStatus === "To Do") {
        // Whatever you want to happen
        selectBtn.style.backgroundColor = "white";  // example: reset background
    } else if (newStatus === "In Progress") {
        selectBtn.style.backgroundColor = "yellow";
    } else if (newStatus === "Completed") {
        selectBtn.style.backgroundColor = "#03C04A";
    }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    li.appendChild(selectBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = '';

    deleteBtn.addEventListener('click', function(){
        li.remove();
        tasks = tasks.filter(t => t.text !== newTask.text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
});

// adds a task when enter is pressed
taskInput.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        addTaskButton.click();
    }
});
