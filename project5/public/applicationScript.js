const gCanvas = document.querySelector('.c')
const gCtx = gCanvas.getContext('2d');



// 2. wait for window to load
window.onload = () => {
  // sketch
  gCanvas.width = 400;
  gCanvas.height = 300;
  gCanvas.addEventListener('mousedown', onMouseDown)
  document.querySelector('#clear').addEventListener('click', onClear)
  document.querySelector('#save').addEventListener('click', onSave)



}


// sketch in canvas
// Referenced from Frederik De Bleser https://www.youtube.com/watch?v=7akcEo_-yQ4
function onMouseDown(e) {
  e.preventDefault();  
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

}

function onMouseMove(e) {
  e.preventDefault();
  gCtx.fillRect(e.offsetX-4, e.offsetY-4, 3, 3);
}

function onMouseUp(e) {
  e.preventDefault();
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

function onClear() {
  gCtx.clearRect(0, 0, 500, 500);
}

function onSave() {
  gCanvas.toBlob((blob) => {
    const timestamp = Date.now().toString();
    const a = document.createElement('a');
    document.body.append(a);
    a.download = `export-${timestamp}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  });
}
