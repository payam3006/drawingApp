const q = console.log;
let allowDraw = false;
let color = "#000000";
let weight = 10;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const start = (ev) => {
  q("start");
  allowDraw = true;
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

    q(pos.x, pos.y);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, weight, 0, Math.PI * 2);
    ctx.fill();
  }
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
