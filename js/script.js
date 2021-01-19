document.addEventListener('DOMContentLoaded', () => {
  const width = 20;

  //add pixel divs
  for (let i = 0; i < width*20; i++) {
    $('.grid').append('<div></div>');
  }
  for (let i = 0; i < width; i++) {
    $('.grid').append('<div class="taken ground"></div>');
  }

  //select grid from DOM
  const grid = document.querySelector('.grid');
  let squares = document.querySelectorAll('.grid div');
  const ScoreDisplay = document.querySelector("#score")
  const StartBtn = document.querySelector("#start-button")

  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2,width*2+1, width*2+2]
  ]
  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]
  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]
  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]
  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  //The colors

  colors = ["tetrominoblue","tetrominored","tetrominogreen","tetrominoorange"]

  let currentPosition = 5 //Math.floor(Math.random()*width)
  let currentRotation = Math.floor(Math.random()*4)
  let currentColor = colors[Math.floor(Math.random()*colors.length)]



  //change the screen size



//randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]
  

  //draw the Tetromino
  function draw () {
    current = theTetrominoes[random][currentRotation]
    current.forEach(index => {
      squares[currentPosition + index].classList.add(currentColor)
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove(currentColor)
    })
  }

  //make the tetromino move down every second
  timerId = setInterval(moveDown, 1000)

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    } else if (e.keyCode === 38) {
      rotate()
    }
  }
  document.addEventListener('keyup', control);

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze function
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentColor = colors[Math.floor(Math.random()*3)]
      currentRotation = Math.floor(Math.random()*4)
      currentPosition = 4 // Math.floor(Math.random()*width)
      draw()
    }
  }

  //move the tetromino left or right unless at edge or blocked by .taken
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      currentPosition +=1
    }
    draw()
  }
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)

    if(!isAtRightEdge) {currentPosition +=1}

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPositon -=1
    }

    draw()
  }
  function rotate() {
    undraw()
    currentRotation +=1
    if (currentRotation === 4) {currentRotation = 0}
    const isAtEdge = current.some(index => (currentPosition + index) % width === width-1) && current.some(index => (currentPosition + index) % width === 0)

    if(isAtEdge) {currentRotation -=1}

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentRotation -=1
    }
    draw()
  }






})