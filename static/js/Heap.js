let arr = [];

let currentStep = 0;
let steps = [];

const tree = document.getElementById("tree");
const historyBox = document.getElementById("history");

let nodes = [];

// -------- NEXT STEP --------
async function nextStep() {

    if (currentStep < steps.length - 1) {

        currentStep++;

        const step = steps[currentStep];

        arr = [...step.array];

        render();

        // Highlight swapped nodes
        if (step.swap) {

            const [i, j] = step.swap;

            if (nodes[i] && nodes[j]) {

                nodes[i].classList.add("active");
                nodes[j].classList.add("active");

                await sleep(500);

                nodes[i].classList.remove("active");
                nodes[j].classList.remove("active");
            }
        }

        // Show history
        if (step.message) {
            log(step.message);
        }
    }
}

// -------- PREVIOUS STEP --------
function previousStep() {

    if (currentStep > 0) {

        currentStep--;

        const step = steps[currentStep];

        arr = [...step.array];

        render();

        log("Previous Step");
    }
}

// -------- HISTORY --------
function log(msg) {

    const li = document.createElement("li");

    li.textContent = msg;

    historyBox.prepend(li);
}

// -------- ARRAY SETUP --------
function setArray() {

    const input = document.getElementById("input").value.trim();

    if (!input) return;

    arr = input
        .split(" ")
        .map(Number)
        .filter(n => !isNaN(n))
        .slice(0, 6);

    render();

    log("Array Set");
}

// -------- RANDOM ARRAY --------
function randomArray() {

    arr = Array.from(
        { length: 6 },
        () => Math.floor(Math.random() * 50)
    );

    render();

    log("Random Array Generated");
}

// -------- CLEAR --------
function clearAll() {

    arr = [];

    steps = [];

    currentStep = 0;

    nodes = [];

    tree.innerHTML = "";

    historyBox.innerHTML = "";
}

// -------- RENDER --------
function render() {

    tree.innerHTML = "";

    nodes = [];

    let i = 0;
    let level = 0;

    while (i < arr.length) {

        const count = 1 << level;

        const row = document.createElement("div");

        row.className = "level";

        for (let j = 0; j < count && i < arr.length; j++) {

            const node = document.createElement("div");

            node.className = "node";

            node.textContent = arr[i];

            nodes.push(node);

            row.appendChild(node);

            i++;
        }

        tree.appendChild(row);

        level++;
    }
}

// -------- UTIL --------
function sleep(ms) {

    return new Promise(res => setTimeout(res, ms));
}

// -------- HEAPIFY STEP --------
function heapifyStep(tempArr, n, i) {

    let largest = i;

    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && tempArr[left] > tempArr[largest]) {
        largest = left;
    }

    if (right < n && tempArr[right] > tempArr[largest]) {
        largest = right;
    }

    if (largest !== i) {

        let first = tempArr[i];
        let second = tempArr[largest];

        // swap
        [tempArr[i], tempArr[largest]] =
        [tempArr[largest], tempArr[i]];

        // save step
        steps.push({

            array: [...tempArr],

            swap: [i, largest],

            message: `Swap ${first} ↔ ${second}`
        });

        heapifyStep(tempArr, n, largest);
    }
}

// -------- GENERATE STEPS --------
function generateHeapSteps(tempArr) {

    let n = tempArr.length;

    // Initial Step
    steps.push({

        array: [...tempArr],

        swap: null,

        message: "Initial Array"
    });

    // Build Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {

        heapifyStep(tempArr, n, i);
    }

    // Heap Sort
    for (let i = n - 1; i > 0; i--) {

        let rootValue = tempArr[0];
        let lastValue = tempArr[i];

        // swap root and last
        [tempArr[0], tempArr[i]] =
        [tempArr[i], tempArr[0]];

        // save step
        steps.push({

            array: [...tempArr],

            swap: [0, i],

            message: `Move ${rootValue} ↔ ${lastValue}`
        });

        // heapify remaining heap
        heapifyStep(tempArr, i, 0);
    }
}

// -------- HEAP SORT --------
function heapSort() {

    if (arr.length === 0) return;

    steps = [];

    currentStep = 0;

    let temp = [...arr];

    generateHeapSteps(temp);

    // Show first step only
    arr = [...steps[0].array];

    render();

    log("Heap Sort Started");
}

/* -------- TABS -------- */

function showTab(tab) {

    document.getElementById("visual").style.display = "none";

    document.getElementById("explain").style.display = "none";

    document.querySelectorAll(".tab")
        .forEach(t => t.classList.remove("active"));

    if (tab === "visual") {

        document.getElementById("visual").style.display = "flex";

        document.querySelectorAll(".tab")[0]
            .classList.add("active");
    }

    if (tab === "explain") {

        document.getElementById("explain").style.display = "block";

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