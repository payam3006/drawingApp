const q = console.log;

//use 100vh for mobile responsive
//COP!!!
const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight);
documentHeight();
///////////////////////////////////////////

let allowDraw = false;
let color = "#000000";
let weight = 10;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastPos = {};

const start = (ev) => {
  q("start");
  allowDraw = true;

  lastPos.x = getMousePos(canvas, ev).x;
  lastPos.y = getMousePos(canvas, ev).y;

  q(lastPos);

  draw(ev);
};

const end = () => {
  q("end");
  allowDraw = false;
};

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  let width = rect.right - rect.left;
  let height = rect.bottom - rect.top;
  // q("width", rect.right - rect.left);
  // q("height", rect.bottom - rect.top);
  // q("rect.right", rect.right);

  // q("evt.clientY", evt.clientY);
  // q("rect.top", rect.top);

  return {
    x: ((evt.clientX - rect.left) / width) * 1000,
    y: ((evt.clientY - rect.top) / height) * 1000,
  };
}

function draw(evt) {
  if (allowDraw) {
    var pos = getMousePos(canvas, evt);

    // q(pos.x, pos.y);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, weight / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = weight;
    ctx.beginPath();
    //////////////////NOT WORK HERE///////////////////
    // ctx.lineJoin = "round";
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.x = pos.x;
    lastPos.y = pos.y;
  }
}

function getTouchPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  let width = rect.right - rect.left;
  let height = rect.bottom - rect.top;
  q("width", rect.right - rect.left);
  q("height", rect.bottom - rect.top);
  q(evt);

  q("evt.clientX", evt.targetTouches[0].clientX);

  return {
    x: ((evt.targetTouches[0].clientX - rect.left) / width) * 1000,
    y: ((evt.targetTouches[0].clientY - rect.top) / height) * 1000,
  };
}

function drawInMob(evt) {
  var pos = getTouchPos(canvas, evt);

  q(pos.x, pos.y);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, weight, 0, Math.PI * 2);
  ctx.fill();
}

const selectColor = () => {
  color = `${document.getElementById("colorpicker").value}`;
};

const refresh = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const minus = () => {
  if (weight > 5) {
    weight -= 5;
    document.getElementById("weight").innerText = `${weight}`;
  }
};

const plus = () => {
  if (weight < 50) {
    weight += 5;
    document.getElementById("weight").innerText = `${weight}`;
  }
};
