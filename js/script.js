document.addEventListener('DOMContentLoaded', () => {
  const width = 20;

  //add pixel divs
  for (let i = 0; i < 400; i++) {
    $('.grid').append('<div></div>');
  }
  for (let i = 0; i < width; i++) {
    $('.grid').append('<div class="taken"></div>');
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

  let currentPosition = Math.floor(Math.random()*width)
  let currentRotation = Math.floor(Math.random()*4)
  let currentColor = colors[Math.floor(Math.random()*colors.length)]
  console.log(currentRotation);



  //change the screen size



//randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]
  

  //draw the Tetromino
  function draw () {
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
  timerId = setInterval(moveDown, 100)

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
      currentPosition = Math.floor(Math.random()*width)
      currentColor = colors[Math.floor(Math.random()*3)]
      currentRotation = Math.floor(Math.random()*4)
      draw()
    }
  }

  //move the tetromino left or right unless at edge or blocked by .taken








})