
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

let root = null

const treeContainer = document.getElementById("tree")
const edges = document.getElementById("edges")
const historyList = document.getElementById("historyList")

function insertBST(node, value) {

    if (node === null) return new Node(value)

    if (value < node.value) {
        node.left = insertBST(node.left, value)
    }
    else {
        node.right = insertBST(node.right, value)
    }

    return node
}

function insertNode() {

    const input = document.getElementById("valueInput")
    const value = parseInt(input.value)

    if (isNaN(value)) return

    root = insertBST(root, value)

    addHistory("Inserted: " + value)

    input.value = ""

    renderTree()

}

function addHistory(text) {

    const li = document.createElement("li")
    li.textContent = text

    historyList.prepend(li)

}

function clearTree() {

    root = null

    treeContainer.innerHTML = ""
    edges.innerHTML = ""
    historyList.innerHTML = ""

}

function renderTree() {

    treeContainer.innerHTML = ""
    edges.innerHTML = ""

    drawNode(root, 300, 40, 140)

}

function drawNode(node, x, y, offset) {

    if (node === null) return

    const div = document.createElement("div")

    div.className = "node"
    div.textContent = node.value

    div.style.left = (x - 25) + "px"
    div.style.top = y + "px"

    treeContainer.appendChild(div)

    if (node.left) {

        drawLine(x, y + 25, x - offset, y + 85)

        drawNode(node.left, x - offset, y + 80, offset / 1.5)

    }

    if (node.right) {

        drawLine(x, y + 25, x + offset, y + 85)

        drawNode(node.right, x + offset, y + 80, offset / 1.5)

    }

}

function drawLine(x1, y1, x2, y2) {

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")

    line.setAttribute("x1", x1)
    line.setAttribute("y1", y1)
    line.setAttribute("x2", x2)
    line.setAttribute("y2", y2)

    edges.appendChild(line)

}

function deleteNode() {

    alert("Delete operation can be complex for visualization. Consider clearing and reinserting for demo.")

}


/* TABS */

function showTab(tab) {

    document.getElementById("visual").style.display = "none";
    document.getElementById("explain").style.display = "none";

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    if (tab === "visual") {
        document.getElementById("visual").style.display = "flex";
        document.querySelectorAll(".tab")[0].classList.add("active");
    }

    if (tab === "explain") {
        document.getElementById("explain").style.display = "block";
        document.querySelectorAll(".tab")[1].classList.add("active");
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