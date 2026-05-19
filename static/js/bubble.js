let arr = [];

let i = 0;
let j = 0;

let sorting = false;

const container = document.getElementById("arrayContainer");
const historyList = document.getElementById("historyList");


// RENDER ARRAY
function render(active1 = -1, active2 = -1, sortedIndex = arr.length) {

    container.innerHTML = "";

    arr.forEach((value, index) => {

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height = `${value * 5}px`;

        bar.innerHTML = `
            <span>${value}</span>
            <small>[${index}]</small>
        `;

        // ACTIVE
        if (index === active1 || index === active2) {
            bar.classList.add("active");
        }

        // SORTED
        if (index >= sortedIndex) {
            bar.classList.add("sorted");
        }

        container.appendChild(bar);

    });
}


// HISTORY
function addHistory(msg) {

    const li = document.createElement("li");

    li.textContent = msg;

    historyList.prepend(li);
}


// SET ARRAY
function setArray() {

    const input = document.getElementById("arrayInput").value;

    arr = input.split(" ").map(Number);

    render();
}


// RANDOM ARRAY
function randomArray() {

    arr = [];

    for (let i = 0; i < 6; i++) {
        arr.push(Math.floor(Math.random() * 50) + 10);
    }

    render();
}


// START SORT
function startBubbleSort() {

    i = 0;
    j = 0;

    sorting = true;

    addHistory("Bubble Sort Started");
}


// NEXT STEP
function nextStep() {

    if (!sorting) return;

    if (i >= arr.length - 1) {

        render(-1, -1, 0);

        addHistory("Sorting Complete");

        sorting = false;

        return;
    }

    render(j, j + 1, arr.length - i);

    // COMPARE
    if (arr[j] > arr[j + 1]) {

        addHistory(`Swap ${arr[j]} and ${arr[j + 1]}`);

        [arr[j], arr[j + 1]] =
        [arr[j + 1], arr[j]];

    }

    j++;

    // NEXT PASS
    if (j >= arr.length - i - 1) {

        j = 0;

        i++;
    }

    render(j, j + 1, arr.length - i);
}


// CLEAR
function clearArray() {

    arr = [];

    i = 0;
    j = 0;

    sorting = false;

    container.innerHTML = "";

    historyList.innerHTML = "";
}


// TAB SWITCHING
function showTab(tab){

document.getElementById("visual").style.display="none";
document.getElementById("explain").style.display="none";

document.querySelectorAll(".tab")
.forEach(t => t.classList.remove("active"));

if(tab==="visual"){

document.getElementById("visual").style.display="flex";

document.querySelectorAll(".tab")[0]
.classList.add("active");

}

if(tab==="explain"){

document.getElementById("explain").style.display="block";

document.querySelectorAll(".tab")[1]
.classList.add("active");

}

}


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