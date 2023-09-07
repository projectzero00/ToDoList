const toDoInput = document.querySelector('#toDo-Input');
const submitButton = document.querySelector('.btn-Submit');
const toDoList = document.querySelector('.toDoList');
const newTabButton = document.querySelector('.btn-NewTab');
const listSelect = document.querySelector('.select');
const toDoForm = document.forms['toDo'];
const listDropDown = toDoForm.list;

// Function to hide all tasks
const hideAllTasks = () => {
    const toDoItems = toDoList.querySelectorAll('.list');
    toDoItems.forEach(item => {
        item.classList.remove('displayed');
        item.classList.add('notdisplayed');
    });
};

// Function to add a delete button to a task
const deleteTask = (task) => {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteTab');
    deleteBtn.innerText = 'X';
    task.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    });
};

// Function to mark a task as completed
const taskCompleted = (task) => {
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completedBtn');
    completedBtn.innerText = '✓';
    task.appendChild(completedBtn);

    completedBtn.addEventListener('click', (e) => {
        const paragraph = e.target.parentNode.querySelector('p');
        paragraph.classList.toggle('taskCompleted');
        paragraph.classList.toggle('task');
    });
};

// Function to add a task to the list
const addTaskToList = (list) => {
    const submitTaskDiv = document.createElement('div');
    const submitTask = document.createElement('p');

    submitTaskDiv.classList.add('submitTaskDiv');
    submitTask.classList.add('task');

    submitTask.innerText = toDoInput.value;
    submitTaskDiv.appendChild(submitTask);

    taskCompleted(submitTaskDiv);
    deleteTask(submitTaskDiv);

    list.appendChild(submitTaskDiv);

    submitTask.addEventListener('click', (e) => {
        e.target.contentEditable = 'true';
    });

    submitTask.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.target.contentEditable = 'false';
        }
    });
};

// Event listener for dropdown list change
listDropDown.addEventListener('change', (e) => {
    hideAllTasks();
    if (e.target.value) {
        const toDoItems = toDoList.querySelectorAll('.list');
        toDoItems[e.target.value].classList.remove('notdisplayed');
        toDoItems[e.target.value].classList.add('displayed');
    }
});

// Event listener for adding a new tab
newTabButton.addEventListener('click', (e) => {
    e.preventDefault();
    const optionNumber = document.querySelectorAll('option');
    const createOption = new Option(`List ${optionNumber.length}`, optionNumber.length - 1, false, true);
    listSelect.appendChild(createOption);

    const newDiv = document.createElement('div');
    newDiv.setAttribute('value', optionNumber.length);
    newDiv.classList.add('list');
    hideAllTasks();
    newDiv.classList.add('displayed');
    toDoList.appendChild(newDiv);
});

// Event listener to add a new task
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const toDoItems = toDoList.querySelector('.displayed');
    addTaskToList(toDoItems);
});
