const gCanvas = document.querySelector('.c')
const gCtx = gCanvas.getContext('2d');

// 2. wait for window to load
window.onload = () => {
    
    // sketch
    gCanvas.addEventListener('mousedown', onMouseDown)
    document.querySelector('#clear').addEventListener('click', onClear)
    // document.querySelector('#save').addEventListener('click', onSave);

}


// sketch in canvas

function onMouseDown(e) {
    // e.preventDefault();  
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    // console.log(e.offsetX, e.offsetY)
    // console.log(e.clientX, e.clientY)

}

function onMouseMove(e) {
  e.preventDefault();
  gCtx.fillRect(e.offsetX, e.offsetY, 3, 3);
//   gCtx.fillRect(e.clientX-530, e.clientY-241, 3, 3);
}

function onMouseUp(e) {
  e.preventDefault();
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

function onClear() {
    let canvasContainer = document.querySelector('.canvasContainer')
    // canvasContainer.innerHTML = ''
    console.log(canvasContainer)
    // let newCanvas = document.createElement('canvas')
    // newCanvas.classList.add('c')
    // canvasContainer.appendChild(newCanvas)
}

// function onSave() {
//   gCanvas.toBlob((blob) => {
//     const timestamp = Date.now().toString();
//     const a = document.createElement('a');
//     document.body.append(a);
//     a.download = `export-${timestamp}.png`;
//     a.href = URL.createObjectURL(blob);
//     a.click();
//     a.remove();
//   });
// }
