let value = document.getElementById('options');
let resultDiv = document.getElementById('contain');
let data = document.getElementById('table');
let datas = document.getElementById('options1').value;
let newTask = document.getElementById('taskInput').value;

let arr = [];
value.addEventListener("change", handle);
function handle(event) {
    const current = event.target.value;
    if (current == 'all') {
        displayTasks();
    }
    else if (current == 'complete') {
        const value = document.getElementById('table');
        value.innerHTML = "";
        value.innerHTML = ` <tr>
                        <th>Task Name</th>
                        <th>Task Status</th>
                        <th>Actions</th>
                    </tr>
        `
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        arr.forEach(item => {
            console.log("complete", item.completed);
            if (true === item.completed) {
                value.innerHTML += `<tr>
    <td contenteditable="true">${item.title}</td>
    <td>${item.completed}</td>
    <td><button onclick="delete1(this)">DELETE</button></td>
`
            }

        });
        tasks.forEach((item, index) => {
            if ("true" == item.status) {
                value.innerHTML += `<tr>
         <td contenteditable="true">${item.task}</td>
        <td>${item.status}</td>
    <td><button onclick="delete1(${index})">DELETE</button></td>
        `
            }
        });
    }
    else {
        const value = document.getElementById('table');
        value.innerHTML = "";
        value.innerHTML = ` <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Actions</th>
            </tr>
            `
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        arr.forEach(item => {
            console.log("complete", item.completed);
            if (false === item.completed) {

                value.innerHTML += `<tr>
    <td contenteditable="true">${item.title}</td>
    <td>${item.completed}</td>
    <td><button onclick="delete1(this)">DELETE</button></td>
`
            }

        });
        tasks.forEach((item, index) => {
            if ("false" == item.status) {
                value.innerHTML += `<tr>
         <td contenteditable="true">${item.task}</td>
        <td>${item.status}</td>
    <td><button onclick="delete1(${index})">DELETE</button></td>
        `
            }
        });
    }

}
async function fetchData(url) {
    try {
        const data = await fetch(url);
        const value = await data.json();
        arr = value;
        console.log("array", arr)

    }
    catch (e) {
        console.log(e);
    }

}
fetchData("https://jsonplaceholder.typicode.com/todos?_limit=10")

function displayTasks() {
    data.innerHTML = "";
    data.innerHTML = ` <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Actions</th>
            </tr>
`
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    arr.forEach(item => {
        data.innerHTML += `<tr>
    <td contenteditable="true">${item.title}</td>
    <td>${item.completed}</td>
    <td><button onclick="delete1(this)">DELETE</button></td>
`
    });
    tasks.forEach((item, index) => {
        data.innerHTML += `<tr>
         <td contenteditable="true">${item.task}</td>
        <td>${item.status}</td>
    <td><button onclick="delete1(${index})">DELETE</button></td>
        `
    });
}
function table() {
    let newTask = document.getElementById('taskInput').value;
    let datas = document.getElementById('options1').value;
let data=arr.map(user=>user.title);
let data1=arr.map(user=>user.completed);
    const taskObj = {
        task: newTask,
        status: datas
    };
    const api={
        task:data,
        status:data1
    };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj,api);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById('taskInput').value = '';
    displayTasks();
}
function delete1(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
window.onload = function () {
    displayTasks();
}
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}
function search(query) {
    const value = document.getElementById('table');
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    arr.forEach(item => {
        if (query == item.title) {
            value.innerHTML = "";
            value.innerHTML = ` <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Actions</th>
            </tr>
`
            value.innerHTML += `<tr>
    <td contenteditable="true">${item.title}</td>
    <td>${item.completed}</td>
    <td><button onclick="delete1(this)">DELETE</button></td>
`
        }

    });
    tasks.forEach((item, index) => {
        if (query == item.task) {
            value.innerHTML = "";
            value.innerHTML = ` <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Actions</th>
            </tr>
`
            value.innerHTML += `<tr>
         <td contenteditable="true">${item.task}</td>
        <td>${item.status}</td>
    <td><button onclick="delete1(${index})">DELETE</button></td>
        `
        }
    });
}
const dSearch = debounce(search, 1000);
const input = document.getElementById("search");
input.addEventListener("input", (event) => {
    dSearch(event.target.value);
})
