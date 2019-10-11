let tasksArray = [];

document.querySelector('#addTask').addEventListener('click', event => {
  let task = userInput('#task');

  let taskObject = {
    task: task,
    isComplete: false,
  };
  tasksArray.push(taskObject);

  clearList();
  document.querySelector('#tasks').appendChild(createList());
  window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
});

window.addEventListener('load', event => {
  let data = window.localStorage.getItem('tasks');
  if (data != null) {
    data = JSON.parse(data);
    tasksArray = data;
    createList();
  }
});

function createList() {
  let container = document.createElement('ul');

  tasksArray.forEach((user, index) => {
    let list = document.createElement('li');
    let taskName = document.createElement('span');

    let checkbox = document.createElement('button');
    checkbox.textContent = tasksArray[index].isComplete ? '🗹' : '☐';
    checkbox.type = 'button';
    checkbox.classList.add('favourite');

    checkbox.addEventListener('click', event => {
      tasksArray[index].isComplete = !tasksArray[index].isComplete;
      clearList();
      createList();
      window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.type = 'button';

    deleteButton.addEventListener('click', event => {
      tasksArray.splice(index, 1);
      clearList();
      createList();
      window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
    });

    // list.appendChild(taskName);
    list.appendChild(checkbox);
    list.appendChild(deleteButton);
    container.appendChild(list);
  });

  let checked = tasksArray.some(task => task.isComplete);

  if (checked) {
    let deleteChecked = document.createElement('button');
    deleteChecked.textContent = 'Delete checked';
    deleteChecked.type = 'button';

    deleteChecked.addEventListener('click', event => {
      let notCheckedUsers = tasksArray.filter(task => !task.isComplete);
      usersArray = notCheckedUsers;
      clearList();
      createList();
      window.localStorage.setItem('users', JSON.stringify(tasksArray));
    });

    container.appendChild(deleteChecked);
  }

  return document.querySelector('#tasks').appendChild(container);
}

const userInput = selector => {
  return document.querySelector(selector).value;
};

function clearList() {
  document.querySelector('#tasks').innerHTML = '';
}
