// 1. global variables
let instruction
let inspectInstruction

// 2. wait for window to load
window.onload = () => {
    instruction = document.getElementById('instructions')
    inspectInstruction = document.getElementById('inspectInstruction')

    // enlarge instruction
    instruction.addEventListener('click', () => {
        inspectInstruction.style.display = 'flex'
        instruction.style.transform = 'translateY(150px)'
    })
    inspectInstruction.addEventListener('click', () => {
        inspectInstruction.style.display = 'none'
        instruction.style.transform = 'translateY(0px)'
    })

}