const choices = document.querySelectorAll('.color-choice');
let penColor = document.querySelector('#pen-choice').value;
let bgColor = document.querySelector('#bg-choice').value;
const modes = document.querySelectorAll('.color-mode');
let currentMode = 'color';

const grid = document.querySelector('.grid');
const sizeSlider = document.querySelector('#size');
let size = sizeSlider.value;
const clearBtn = document.querySelector('#clear');
const dimensions = document.querySelector('#dimensions');

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

function makeGrid(size) {
  // Define the grid rows & columns
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; 
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  // Create grid items
  for (let i = 0; i < size * size; i++) { 
    let gridItem = document.createElement('div'); // Create item
    gridItem.classList.add('grid-item'); // Give it a class
    gridItem.addEventListener('mousedown', changeColor); // Allow it to change color when mouse is down
    gridItem.addEventListener('mouseover', changeColor); // Allow it to change color when mouse is over it
    grid.appendChild(gridItem); // Add item to the grid
  }

  dimensions.innerText = `Canvas size: ${size} x ${size}`;
}

function setMode() {
  modes.forEach(mode => {
    if (mode === this) {
      currentMode = this.id;
      mode.classList.add('active-mode');
    } else {
      mode.classList.remove('active-mode');
    }
  })
}

function setColorChoice() {
  if (this.id === 'pen-choice') {
    penColor = this.value;
  }
  if (this.id === 'bg-choice') {
    bgColor = this.value;
    grid.style.backgroundColor = bgColor;
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  
  if (currentMode === 'color') {
    this.style.backgroundColor = penColor;
  } else if (currentMode === 'rainbow') {
    let h = () => Math.floor(Math.random() * 360); // Get random hue
    let rainbow = `hsl(${h()}, 100%, 60%)`;
    this.style.backgroundColor = rainbow;
  } else if (currentMode === 'pastel') {
    let h = () => Math.floor(Math.random() * 360); // Get random hue
    let pastel = `hsl(${h()}, 90%, 85%)`;
    this.style.backgroundColor = pastel;
  } else {
    this.style.backgroundColor = 'transparent';
  }
}

function clearGrid() {
  grid.innerHTML = ""; // Make grid empty
  makeGrid(size);
}

function changeGridSize() {
  size = this.value;
  clearGrid();
}

makeGrid(size);
document.querySelector('#color').classList.add('active-mode');
modes.forEach(mode => mode.addEventListener('click', setMode));
choices.forEach(choice => choice.addEventListener('change', setColorChoice));
clearBtn.addEventListener('click', clearGrid);
sizeSlider.addEventListener('change', changeGridSize);


