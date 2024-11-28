let taskList = JSON.parse(localStorage.getItem('tasks')) || []; 
let taskIdCounter = taskList.length ? Math.max(...taskList.map(task => task.id)) + 1 : 1; 

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('go-back-btn').addEventListener('click', refreshTasks);

function addTask() {
    const taskInput = document.getElementById('task-input').value;
    if (taskInput.trim() === '') {
        alert('Task name cannot be empty!');
        return;
    }
    
    const task = {
        id: taskIdCounter++,
        name: taskInput,
        status: 'Pending'
    };
    
    taskList.push(task);
    document.getElementById('task-input').value = '';
    saveTasks();
    renderTaskList();
    toggleBackButton();
}

function renderTaskList() {
    const taskListUl = document.getElementById('task-list');
    taskListUl.innerHTML = ''; // Clear the current list

    taskList.forEach(task => {
        const taskLi = document.createElement('li');
        
        const taskName = document.createElement('span');
        taskName.classList.add('task-name');
        taskName.innerText = task.name;
        
        const taskStatus = document.createElement('span');
        taskStatus.classList.add('status-label');
        taskStatus.innerText = task.status;
        taskStatus.classList.add(`status-${task.status.toLowerCase().replace(' ', '-')}`);
        
        const taskControls = document.createElement('div');
        taskControls.classList.add('task-controls');
        
       
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.title = "Edit";
        editButton.addEventListener('click', () => editTask(task.id));
        
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.title = "Delete";
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        

        const statusButton = document.createElement('button');
        statusButton.innerHTML = '<i class="fas fa-sync"></i>';
        statusButton.title = "Change Status";
        statusButton.addEventListener('click', () => changeStatus(task.id));
        
        taskControls.append(editButton, deleteButton, statusButton);
        taskLi.append(taskName, taskStatus, taskControls);
        taskListUl.append(taskLi);
    });
}

function editTask(id) {
    const newName = prompt('Enter new task name:');
    if (newName && newName.trim()) {
        const task = taskList.find(task => task.id === id);
        task.name = newName;
        saveTasks();
        renderTaskList();
    }
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    saveTasks();
    renderTaskList();
    toggleBackButton();
}

function changeStatus(id) {
    const task = taskList.find(task => task.id === id);
    const statusOptions = ['Pending', 'In-Progress', 'Completed'];
    const currentStatusIndex = statusOptions.indexOf(task.status);
    task.status = statusOptions[(currentStatusIndex + 1) % statusOptions.length];
    saveTasks();
    renderTaskList();
}

function toggleBackButton() {
    const backButton = document.getElementById('go-back-btn');
    backButton.style.display = taskList.length > 0 ? 'block' : 'none';
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList)); 
}


function refreshTasks() {
    localStorage.removeItem('tasks');
    taskList = []; 
    renderTaskList();
    toggleBackButton();
}


renderTaskList();
toggleBackButton();
