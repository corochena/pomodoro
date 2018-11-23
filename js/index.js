var canvas = $('canvas')[0];
var ctx = canvas.getContext("2d");
canvas.width = document.getElementById("clock").clientWidth;
canvas.height = document.getElementById("clock").clientHeight;
var W = canvas.width;
var H = canvas.height;
var totalTime = Number($('#workTime').val())*60;
var startTime;

ctx.font = "40px sans-serif";
ctx.fillStyle = "navy";
ctx.fillText("Click here to start", W/2 - 150, W/2 + 20);

function animate(t) {
  var seconds = (Date.now() - startTime) / 1000;
  
  ctx.beginPath();
  ctx.fillStyle = "silver";
  ctx.rect(0, 0, W, H);
  ctx.fill();
  
  ctx.beginPath();
  ctx.strokeStyle = "navy";
  ctx.lineWidth = 100;
  ctx.arc(W/2, W/2, W/2 * 0.8, -Math.PI / 2, 2 * Math.PI / totalTime * seconds - Math.PI / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.arc(W/2, W/2, W/2 * 0.6, 0, 7);
  ctx.stroke();

  
  ctx.textAlign = 'center';
  ctx.font = '80px sans-serif';
  ctx.fillStyle = "black";
  ctx.fillText(format(Math.round(totalTime - seconds)), W/2, W/2 + 30);
  
  if (seconds <= totalTime)
    requestAnimationFrame(animate);
}

$('#plus').on("click", function(e) {
  $('#workTime').val(Number($('#workTime').val()) + 1);
});

$('#minus').on("click", function() {
  $('#workTime').val(Number($('#workTime').val()) - 1);
});

$('canvas').on("click", function() {
  totalTime = Number($('#workTime').val()) * 60;
  startTime = Date.now();
  requestAnimationFrame(animate);
});

function format(segs) {
  if (segs < 1) return "0:00";
  var min = Math.floor(segs / 60);
  var s = Math.floor(segs - min * 60);

  return min + (s < 10 ? ":0":":") + s ;
}