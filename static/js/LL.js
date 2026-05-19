let list = [];

const container = document.getElementById("listContainer");
const historyList = document.getElementById("historyList");

/* RENDER */
function renderList() {

    container.innerHTML = "";

    list.forEach((value, index) => {

        const node = document.createElement("div");
        node.className = "node";

        const box = document.createElement("div");
        box.className = "node-box";
        box.textContent = value;

        if (index === 0) {
            box.classList.add("head-highlight");
        }

        node.appendChild(box);
        container.appendChild(node);

        if (index < list.length - 1) {
            const arrow = document.createElement("div");
            arrow.className = "arrow";
            arrow.textContent = "→";
            container.appendChild(arrow);
        }
    });
}

/* HISTORY */
function addHistory(type, value) {

    const li = document.createElement("li");

    if (type === "insert") {
        li.innerHTML = `<span class="arrow-up">↑</span> Insert: ${value}`;
    }

    if (type === "delete") {
        li.innerHTML = `<span class="arrow-down">↓</span> Delete: ${value}`;
    }

    if (type === "search") {
        li.innerHTML = `🔍 Search: ${value}`;
    }

    historyList.prepend(li);
}

/* INSERT HEAD */
function insertHead() {

    const input = document.getElementById("valueInput");
    const value = input.value;

    if (value === "") return;

    list.unshift(value);

    addHistory("insert", value);

    input.value = "";

    renderList();
}

/* INSERT TAIL */
function insertTail() {

    const input = document.getElementById("valueInput");
    const value = input.value;

    if (value === "") return;

    list.push(value);

    addHistory("insert", value);

    input.value = "";

    renderList();
}

/* DELETE */
function deleteNode() {

    if (list.length === 0) {
        alert("List Empty");
        return;
    }

    const value = list.pop();

    addHistory("delete", value);

    renderList();
}

/* CLEAR */
function clearList() {
    list = [];
    historyList.innerHTML = "";
    renderList();
}

// /* SEARCH */
// async function searchNode() {

//     const input = document.getElementById("valueInput");
//     const value = input.value;

//     if (value === "") return;

//     addHistory("search", value);

//     const nodes = document.querySelectorAll(".node-box");

//     for (let i = 0; i < nodes.length; i++) {

//         nodes[i].classList.add("search-highlight");

//         await new Promise(r => setTimeout(r, 500));

//         if (nodes[i].textContent == value) {
//             return;
//         }

//         nodes[i].classList.remove("search-highlight");
//     }

//     alert("Value not found");
// }


function setArray() {

    const inputField = document.getElementById("input");

    const input = inputField.value.trim();

    if (!input) return;

    // Allow only numbers, spaces and negative sign
    const validPattern = /^-?\d+(\s-?\d+)*$/;

    if (!validPattern.test(input)) {

        alert("Please enter only numbers separated by spaces.");

        inputField.value = "";

        return;
    }

    arr = input
        .split(" ")
        .map(Number)
        .slice(0, 6);

    render();

    log("Array Set");
}