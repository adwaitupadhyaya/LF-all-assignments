const circle = document.getElementById("circle");
circle.style.top = "200px";
y = 0;
function draw() {
  circle.style.top = `${y}px`;
  y++;

  if (y + 50 > 400) {
    y -= 1;
  }
  requestAnimationFrame(draw);
}

draw();
