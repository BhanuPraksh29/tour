const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");

let writingMode = false;
let lastPositionX, lastPositionY;

canvas.addEventListener("pointerdown", handlePointerDown, { passive: true });
canvas.addEventListener("pointerup", handlePointerUp, { passive: true });
canvas.addEventListener("pointermove", handlePointerMove, { passive: true });

function handlePointerDown(event) {
  writingMode = true;
  ctx.beginPath();
  const [positionX, positionY] = getCursorPosition(event);
  ctx.moveTo(positionX, positionY);
  lastPositionX = positionX;
  lastPositionY = positionY;
}

function handlePointerUp() {
  writingMode = false;
}

function handlePointerMove(event) {
  if (!writingMode) return;
  const [positionX, positionY] = getCursorPosition(event);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
  lastPositionX = positionX;
  lastPositionY = positionY;
}

function getCursorPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const positionX = event.clientX - rect.left;
  const positionY = event.clientY - rect.top;
  return [positionX, positionY];
}

// Set some canvas properties
ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = "round";

// Clear button functionality
document.getElementById("clear-button").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
