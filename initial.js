let value = document.getElementById('options');
let resultDiv = document.getElementById('contain');
let arr = [];
value.addEventListener("change", handle);
function handle(event) {
    const current = event.target.value;
    if (current == 'all') {
        const map = arr.map(user => user.title + " " + user.completed);
        resultDiv.innerHTML = "";
        map.forEach(element => {
            const para = document.createElement("li");
            para.textContent = element;
            resultDiv.appendChild(para);
            console.log(element);

        });
    }
    else if (current == 'complete') {
        console.log(current);
        const complete = arr.map(user => user.completed);
        const map = arr.map(user => user.title);
        resultDiv.innerHTML = "";
        for (let i = 0; i < complete.length; i++) {
            if (complete[i] === true) {

                const para = document.createElement("li");
                para.innerHTML = `
                <span style="font-size:20px;padding-left:200px">
                ${map[i]}</span> <span style="font-size:20px;padding-left:80px">
                ${complete[i]}<span>
                `;
                resultDiv.appendChild(para);
            }
        }

    }
    else {
        console.log(current);
        resultDiv.innerHTML = current;
        const complete = arr.map(user => user.completed);
        const map = arr.map(user => user.title);
        resultDiv.innerHTML = "";
        for (let i = 0; i < complete.length; i++) {
            if (complete[i] === false) {

                const para = document.createElement("li");
                para.textContent = map[i] + " " + complete[i];
                resultDiv.appendChild(para);
            }
        }

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
let data = document.getElementById('table');
let row;
function table() {
    let newTask = document.getElementById('taskInput').value;
    let datas=document.getElementById('options1').value;
    row = `
    <tr>
    <td contenteditable="true">${newTask}</td>
    <td>${datas}</td>
    <td><button onclick="delete1(this)">DELETE</button></td>
    </tr>
    `
    data.innerHTML += row;

    document.getElementById('taskInput').value = '';

}
function delete1(button) {
    const rows = button.parentNode.parentNode;
    console.log("deleted")
    rows.remove();
}

