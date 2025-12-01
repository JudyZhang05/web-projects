const gCanvas = document.querySelector('.c')
const gCtx = gCanvas.getContext('2d');



// 2. wait for window to load
window.onload = () => {
    
    // sketch
    gCanvas.addEventListener('mousedown', onMouseDown)
    document.querySelector('#clear').addEventListener('click', onClear)
    document.querySelector('#save').addEventListener('click', () => {

    })

}


// sketch in canvas

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
    gCtx.clearRect(0, 0, 500, 200);
}


html2canvas(document.getElementById('cWrapper')).then((canvas) => {
    const img = canvas.toDataURL('image/png');
        // const imageElement = document.createElement('img');
        // imageElement.src = img;
        // document.getElementById('output').appendChild(imageElement);
        console.log(img)
});


// function onSave() {
//   gCanvas.toBlob((blob) => {
//     const timestamp = Date.now().toString();
//     const a = document.createElement('a');
//     // document.body.append(a);
//     a.download = `export-${timestamp}.png`;
//     a.href = URL.createObjectURL(blob);
//     console.log(a)
//     // a.click();
//     // a.remove();
//   });
// }

// function onSave() {
//     html2canvas(document.getElementById('cWrapper')).then((canvas) => {
//         const img = canvas.toDataURL('image/png');
//         // const imageElement = document.createElement('img');
//         // imageElement.src = img;
//         // document.getElementById('output').appendChild(imageElement);
//         console.log(img)
//     });
// }


// Source - https://stackoverflow.com/a
// Posted by Kaiido
// Retrieved 2025-12-01, License - CC BY-SA 3.0
// input.onchange = function() {

//   var formData = new FormData();
//   formData.append('file', this.files[0], 'yourFileName.ext');

//   var xhr = new XMLHttpRequest();
//   xhr.onload = callback; // assuming you've got a callback function
//   xhr.open('POST', yourServerSideFileHandlerScript);
//   xhr.send(formData);

// };


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
