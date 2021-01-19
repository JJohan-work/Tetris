document.addEventListener('DOMContentLoaded', () => {
  let width = 30;
  let height = 50;
  let speed = 10;

  function changeWidth(id,w) {
    var el = document.getElementById(id);
    var main = document.getElementsByTagName("main")[0]
    el.style.width = String(w*20)+"px";
    main.style.width = String((w*20)+10)+"px";
  }

  function changeHeight(id,h,w) {
    var el = document.getElementById(id);
    var main = document.getElementsByTagName("main")[0]
    el.style.height = String(h*20)+"px";
  }

    //The Tetrominoes
    function generateTetrominos(width) {
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
  
      return [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    }


  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //add pixel divs
  function generatePixel(width, height) {
    changeWidth("grid",width);
    changeHeight("grid",height,width);

    for (let i = 0; i < width*height-width; i++) {
      $('.grid').append('<div></div>');
    }
    for (let i = 0; i < width; i++) {
      $('.grid').append('<div class="taken ground"></div>');
    }
    grid = document.querySelector('.grid');
    squares = document.querySelectorAll('.grid div');
    currentPosition = randomIntFromInterval(0,width-4);
    return generateTetrominos(width);
  }

  let theTetrominoes = generatePixel(width,height);
  //select grid from DOM
  const ScoreDisplay = document.querySelector("#score")
  const StartBtn = document.querySelector("#start-button")


  //The colors

  colors = ["tetrominoblue","tetrominored","tetrominogreen","tetrominoorange"]

  let currentRotation = randomIntFromInterval(0,3)
  let currentColor = colors[Math.floor(Math.random()*colors.length)]



  //change the screen size
  shrink.onclick = () => {
    const myNode = document.getElementById("grid");
    myNode.innerHTML = '';
    width = width - 1;
    theTetrominoes = generatePixel(width, height);
  }
  grow.onclick = () => {
    const myNode = document.getElementById("grid");
    myNode.innerHTML = '';
    width = width + 1;
    theTetrominoes = generatePixel(width, height);
  }

  contract.onclick = () => {
    const myNode = document.getElementById("grid");
    myNode.innerHTML = '';
    height = height - 1;
    theTetrominoes = generatePixel(width, height);
  }

  expand.onclick = () => {
    const myNode = document.getElementById("grid");
    myNode.innerHTML = '';
    height = height + 1;
    theTetrominoes = generatePixel(width, height);
  }


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
  let toggle = true;

  function startstop() {
    if (toggle) {
      timerId = setInterval(moveDown, speed);
      toggle = !toggle;
    } else {
      clearTimeout(timerId);
      const myNode = document.getElementById("grid");
      myNode.innerHTML = '';
      generatePixel(width, height);
      toggle = !toggle;
    }
  };

  startButton.onclick=function(){startstop()}

  //assign functions to keyCodes
  function control(e) {
    console.log(e.keyCode === 38 || e.keyCode == 87)
    if(e.keyCode === 37 || e.keyCode === 65) {
      moveLeft()
    } else if (e.keyCode === 39 || e.keyCode == 68) {
      moveRight()
    } else if (e.keyCode === 40 || e.keyCode == 83) {
      moveDown()
    } else if (e.keyCode === 38 || e.keyCode == 87) {
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
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentColor = colors[Math.floor(Math.random()*colors.length)];
      currentRotation = randomIntFromInterval(0,3)
      currentPosition = randomIntFromInterval(0,width-4)
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
      currentPosition -=1
    }

    draw()
  }
  function rotate() {
    undraw()
    currentRotation ++
    if (currentRotation === current.length) {currentRotation = 0}
    current = theTetrominoes[random][currentRotation]
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (isAtLeftEdge && isAtRightEdge) {
      if (currentRotation === 0){currentRotation = 3}
      else {currentRotation -= 1}
      current = theTetrominoes[random][currentRotation]
    }
    draw()
  }






})