// const svg = document.getElementById("tree");
// let nodes = [];
// let edges = [];
// let value = 10;
// function createNode(x, y, value) {
//   const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

//   const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//   circle.setAttribute("r", 18);
//   circle.setAttribute("fill", "#0B0F1A");
//   circle.setAttribute("stroke", "#1F2933");

//   const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//   text.setAttribute("text-anchor", "middle");
//   text.setAttribute("dy", ".35em");
//   text.setAttribute("fill", "#E6E8F0");
//   text.textContent = value;

//   g.appendChild(circle);
//   g.appendChild(text);
//   svg.appendChild(g);

//   setPosition(g, x, y);

//   gsap.from(g, {
//     scale: 0,
//     transformOrigin: "center",
//     duration: 0.4,
//     ease: "back.out(1.7)"
//   });

//   return { g, x, y };
// }
// function createEdge(x1, y1, x2, y2) {
//   const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//   line.setAttribute("stroke", "#374151");
//   line.setAttribute("stroke-width", "2");

//   svg.insertBefore(line, svg.firstChild);

//   setLine(line, x1, y1, x2, y2);

//   return line;
// }
// function setPosition(node, x, y) {
//   node.setAttribute("transform", `translate(${x}, ${y})`);
// }

// function setLine(line, x1, y1, x2, y2) {
//   line.setAttribute("x1", x1);
//   line.setAttribute("y1", y1);
//   line.setAttribute("x2", x2);
//   line.setAttribute("y2", y2);
// }
// function insert() {
//   if (nodes.length === 0) {
//     nodes.push(createNode(450, 80, value));
//   } 
//   else if (nodes.length === 1) {
//     nodes.push(createNode(300, 160, value));
//     edges.push(createEdge(450, 80, 300, 160));
//   } 
//   else if (nodes.length === 2) {
//     nodes.push(createNode(200, 240, value));
//     edges.push(createEdge(300, 160, 200, 240));

//     setTimeout(rotateRight, 600);
//   }

//   value += 10;
// }
// function rotateRight() {
//   // new positions after rotation
//   const newPositions = [
//     { x: 600, y: 160 }, // old root
//     { x: 450, y: 80 },  // new root
//     { x: 350, y: 240 }  // child
//   ];

//   nodes.forEach((n, i) => {
//     gsap.to(n.g, {
//       duration: 0.6,
//       onUpdate: () => {
//         setPosition(n.g, newPositions[i].x, newPositions[i].y);
//       }
//     });

//     n.x = newPositions[i].x;
//     n.y = newPositions[i].y;
//   });

//   // update edges
//   setTimeout(updateEdges, 50);
// }
// function updateEdges() {
//   setLine(edges[0], nodes[1].x, nodes[1].y, nodes[0].x, nodes[0].y);
//   setLine(edges[1], nodes[1].x, nodes[1].y, nodes[2].x, nodes[2].y);
// }
