import * as thr from './three.js/build/three.module.js'

let cKey = new Audio('./piano-mp3/C3.mp3')
let dKey = new Audio('./piano-mp3/D3.mp3')
let eKey = new Audio('./piano-mp3/E3.mp3')
let fKey = new Audio('./piano-mp3/F3.mp3')
let gKey = new Audio('./piano-mp3/G3.mp3')
let aKey = new Audio('./piano-mp3/A3.mp3')
let bKey = new Audio('./piano-mp3/B3.mp3')

let cKey2 = new Audio('./piano-mp3/C4.mp3')
let dKey2 = new Audio('./piano-mp3/D4.mp3')
let eKey2 = new Audio('./piano-mp3/E4.mp3')
let fKey2 = new Audio('./piano-mp3/F4.mp3')
let gKey2 = new Audio('./piano-mp3/G4.mp3')
let aKey2 = new Audio('./piano-mp3/A4.mp3')
let bKey2 = new Audio('./piano-mp3/B4.mp3')

let db = new Audio('./piano-mp3/Db3.mp3')
let eb = new Audio('./piano-mp3/Eb3.mp3')
let gb = new Audio('./piano-mp3/Gb3.mp3')
let ab = new Audio('./piano-mp3/Ab3.mp3')
let bb = new Audio('./piano-mp3/Bb3.mp3')

let db2 = new Audio('./piano-mp3/Db4.mp3')
let eb2 = new Audio('./piano-mp3/Eb4.mp3')
let gb2 = new Audio('./piano-mp3/Gb4.mp3')
let ab2 = new Audio('./piano-mp3/Ab4.mp3')
let bb2 = new Audio('./piano-mp3/Bb4.mp3')

let cDown = 'z'
let dDown = 'x'
let eDown = 'c'
let fDown = 'v'
let gDown = 'b'
let aDown = 'n'
let bDown = 'm'

let cDown2 = 'q'
let dDown2 = 'w'
let eDown2 = 'e'
let fDown2 = 'r'
let gDown2 = 't'
let aDown2 = 'y'
let bDown2 = 'u'

let dbDown = 's'
let ebDown = 'd'
let gbDown = 'g'
let abDown = 'h'
let bbDown = 'j'

let dbDown2 = '2'
let ebDown2 = '3'
let gbDown2 = '5'
let abDown2 = '6'
let bbDown2 = '7'

let state = 0

let scene, camera, renderer

let width = window.innerWidth
let height = window.innerHeight
let aspect = width / height

const buttonsDiv = document.getElementById('buttons')

camera = new thr.PerspectiveCamera(75, aspect, 0.1, 1000)
renderer = new thr.WebGLRenderer({ antialias: true })
scene = new thr.Scene()
camera.position.set(3, 15, 15)
camera.lookAt(0, 0, 0)

renderer.setSize(width, height)

document.body.appendChild(renderer.domElement)
renderer.domElement.style.margin = 'auto'

const directionalLight = new thr.DirectionalLight('white', 1)
directionalLight.position.set(1, 9, 1)
scene.add(directionalLight)

const whiteTiles = []
const blackTiles = []

const whiteTileGeometry = new thr.BoxGeometry(2, 1, 10)
const whiteTileMaterial = new thr.MeshStandardMaterial({ color: 'white' })
let currWhiteX = -15

const blackTileGeometry = new thr.BoxGeometry(0.9, 1, 7)
const blackTileMaterial = new thr.MeshStandardMaterial({ color: 'black' })
let currBlackX = -14

for (let i = 0; i < 14; i++) {
  whiteTiles[i] = new thr.Mesh(whiteTileGeometry, whiteTileMaterial)
  whiteTiles[i].position.x = currWhiteX + i * 2.1
  whiteTiles[i].geometry.center()
  scene.add(whiteTiles[i])

  whiteTiles[i].geometry.computeBoundingBox()
  const boundingBox = whiteTiles[i].geometry.boundingBox
  const pivotPoint = new thr.Vector3(
    (boundingBox.max.x - boundingBox.min.x) / 2,
    0,
    boundingBox.min.z
  )

  whiteTiles[i].geometry.translate(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z)
  whiteTiles[i].position.x += pivotPoint.x
  whiteTiles[i].position.y += pivotPoint.y
  whiteTiles[i].position.z += pivotPoint.z
}

for (let i = 0; i < 14; i++) {
  const button = document.createElement('button')
  i == 0 && (button.textContent = cDown)
  i == 1 && (button.textContent = dDown)
  i == 2 && (button.textContent = eDown)
  i == 3 && (button.textContent = fDown)
  i == 4 && (button.textContent = gDown)
  i == 5 && (button.textContent = aDown)
  i == 6 && (button.textContent = bDown)
  i == 7 && (button.textContent = cDown2)
  i == 8 && (button.textContent = dDown2)
  i == 9 && (button.textContent = eDown2)
  i == 10 && (button.textContent = fDown2)
  i == 11 && (button.textContent = gDown2)
  i == 12 && (button.textContent = aDown2)
  i == 13 && (button.textContent = bDown2)

  button.style.position = 'absolute'
  button.className = 'btn' + ' white-' + i

  const tilePosition = whiteTiles[i].position.clone()
  const buttonPosition = tilePosition.project(camera)

  if (i <= 6) {
    buttonPosition.x = ((buttonPosition.x + 1.05) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 1) / 2) * height) / 2
    buttonPosition.x -= i * 4
  }

  if (i >= 7 && i <= 9) {
    buttonPosition.x = ((buttonPosition.x + 1.01) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 1) / 2) * height) / 2
    buttonPosition.x += i * 2.2
  }

  if (i >= 10 && i <= 13) {
    buttonPosition.x = ((buttonPosition.x + 0.915) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 1.01) / 2) * height) / 2
    buttonPosition.x += i * 10
  }

  buttonPosition.y += i * 9

  button.style.left = buttonPosition.x + 'px'
  button.style.top = buttonPosition.y + 'px'

  function handleKeyDown(e) {
    if (i == 0) {
      cDown = e.key
      button.textContent = cDown
    }
    if (i == 1) {
      dDown = e.key
      button.textContent = dDown
    }
    if (i == 2) {
      eDown = e.key
      button.textContent = eDown
    }
    if (i == 3) {
      fDown = e.key
      button.textContent = fDown
    }
    if (i == 4) {
      gDown = e.key
      button.textContent = gDown
    }
    if (i == 5) {
      aDown = e.key
      button.textContent = aDown
    }
    if (i == 6) {
      bDown = e.key
      button.textContent = bDown
    }
    if (i == 7) {
      cDown2 = e.key
      button.textContent = cDown2
    }
    if (i == 8) {
      dDown2 = e.key
      button.textContent = dDown2
    }
    if (i == 9) {
      eDown2 = e.key
      button.textContent = eDown2
    }
    if (i == 10) {
      fDown2 = e.key
      button.textContent = fDown2
    }
    if (i == 11) {
      gDown2 = e.key
      button.textContent = gDown2
    }
    if (i == 12) {
      aDown2 = e.key
      button.textContent = aDown2
    }
    if (i == 13) {
      bDown2 = e.key
      button.textContent = bDown2
    }

    document.removeEventListener('keydown', handleKeyDown)
  }

  if (state == 2) {
  }
  button.onclick = function () {
    button.textContent = '?'
    document.addEventListener('keydown', handleKeyDown)
  }

  buttonsDiv.appendChild(button)
}

for (let i = 0; i < 13; i++) {
  blackTiles[i] = new thr.Mesh(blackTileGeometry, blackTileMaterial)
  blackTiles[i].position.x = currBlackX + i * 2.1
  blackTiles[i].position.y += 0.5
  blackTiles[i].position.z -= 2.25
  if (i != 2 && i != 6 && i != 9) {
    scene.add(blackTiles[i])
  }
}

for (let i = 0; i < 13; i++) {
  if (i == 2 || i == 6 || i == 9) {
    continue
  }
  const button = document.createElement('button')

  i == 0 && (button.textContent = dbDown)
  i == 1 && (button.textContent = ebDown)
  i == 3 && (button.textContent = gbDown)
  i == 4 && (button.textContent = abDown)
  i == 5 && (button.textContent = bbDown)
  i == 7 && (button.textContent = dbDown2)
  i == 8 && (button.textContent = ebDown2)
  i == 10 && (button.textContent = gbDown2)
  i == 11 && (button.textContent = abDown2)
  i == 12 && (button.textContent = bbDown2)

  button.style.position = 'absolute'
  button.className = 'btn2' + ' black-' + i

  const tilePosition = blackTiles[i].position.clone()
  const buttonPosition = tilePosition.project(camera)

  if (i < 3) {
    buttonPosition.x = ((buttonPosition.x + 1.25) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 0.6) / 2) * height) / 2
    buttonPosition.x -= i * 15
    buttonPosition.y += i * 9
  }

  if (i >= 3 && i < 7) {
    buttonPosition.x = ((buttonPosition.x + 1.24) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 0.56) / 2) * height) / 2
    buttonPosition.x -= i * 15
    buttonPosition.y += i * 9
  }

  if (i >= 7 && i < 10) {
    buttonPosition.x = ((buttonPosition.x + 1.2) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 0.52) / 2) * height) / 2
    buttonPosition.x -= i * 10
    buttonPosition.y += i * 9
  }

  if (i >= 10 && i < 13) {
    buttonPosition.x = ((buttonPosition.x + 1.11) / 2) * width
    buttonPosition.y = ((-(buttonPosition.y - 0.52) / 2) * height) / 2
    buttonPosition.x -= i * 3
    buttonPosition.y += i * 9
  }

  button.style.left = buttonPosition.x + 'px'
  button.style.top = buttonPosition.y + 'px'

  function handleKeyDown(e) {
    if (i == 0) {
      dbDown = e.key
      button.textContent = dbDown
    }
    if (i == 1) {
      ebDown = e.key
      button.textContent = ebDown
    }
    if (i == 3) {
      gbDown = e.key
      button.textContent = gbDown
    }
    if (i == 4) {
      abDown = e.key
      button.textContent = abDown
    }
    if (i == 5) {
      bbDown = e.key
      button.textContent = bbDown
    }

    if (i == 7) {
      dbDown2 = e.key
      button.textContent = dbDown2
    }
    if (i == 8) {
      ebDown2 = e.key
      button.textContent = ebDown2
    }
    if (i == 10) {
      gbDown2 = e.key
      button.textContent = gbDown2
    }
    if (i == 11) {
      abDown2 = e.key
      button.textContent = abDown2
    }
    if (i == 12) {
      bbDown2 = e.key
      button.textContent = bbDown2
    }
    document.removeEventListener('keydown', handleKeyDown)
  }

  button.onclick = function () {
    button.textContent = '?'
    document.addEventListener('keydown', handleKeyDown)
  }

  buttonsDiv.appendChild(button)
}

window.addEventListener('keydown', (e) => {
  if (state == 0) {
    if (e.key == cDown && whiteTiles[0].rotation.x == 0) {
      whiteTiles[0].rotation.x += 0.05
      cKey.currentTime = 0
      cKey.play()
    }
    if (e.key == dDown && whiteTiles[1].rotation.x == 0) {
      whiteTiles[1].rotation.x += 0.05
      dKey.currentTime = 0
      dKey.play()
    }
    if (e.key == eDown && whiteTiles[2].rotation.x == 0) {
      whiteTiles[2].rotation.x += 0.05
      eKey.currentTime = 0
      eKey.play()
    }
    if (e.key == fDown && whiteTiles[3].rotation.x == 0) {
      whiteTiles[3].rotation.x += 0.05
      fKey.currentTime = 0
      fKey.play()
    }
    if (e.key == gDown && whiteTiles[4].rotation.x == 0) {
      whiteTiles[4].rotation.x += 0.05
      gKey.currentTime = 0
      gKey.play()
    }
    if (e.key == aDown && whiteTiles[5].rotation.x == 0) {
      whiteTiles[5].rotation.x += 0.05
      aKey.currentTime = 0
      aKey.play()
    }
    if (e.key == bDown && whiteTiles[6].rotation.x == 0) {
      whiteTiles[6].rotation.x += 0.05
      bKey.currentTime = 0
      bKey.play()
    }
    if (e.key == cDown2 && whiteTiles[7].rotation.x == 0) {
      whiteTiles[7].rotation.x += 0.05
      cKey2.currentTime = 0
      cKey2.play()
    }
    if (e.key == dDown2 && whiteTiles[8].rotation.x == 0) {
      whiteTiles[8].rotation.x += 0.05
      dKey2.currentTime = 0
      dKey2.play()
    }
    if (e.key == eDown2 && whiteTiles[9].rotation.x == 0) {
      whiteTiles[9].rotation.x += 0.05
      eKey2.currentTime = 0
      eKey2.play()
    }
    if (e.key == fDown2 && whiteTiles[10].rotation.x == 0) {
      whiteTiles[10].rotation.x += 0.05
      fKey2.currentTime = 0
      fKey2.play()
    }
    if (e.key == gDown2 && whiteTiles[11].rotation.x == 0) {
      whiteTiles[11].rotation.x += 0.05
      gKey2.currentTime = 0
      gKey2.play()
    }
    if (e.key == aDown2 && whiteTiles[12].rotation.x == 0) {
      whiteTiles[12].rotation.x += 0.05
      aKey2.currentTime = 0
      aKey2.play()
    }
    if (e.key == bDown2 && whiteTiles[13].rotation.x == 0) {
      whiteTiles[13].rotation.x += 0.05
      bKey2.currentTime = 0
      bKey2.play()
    }
    if (e.key == dbDown && blackTiles[0].rotation.x == 0) {
      blackTiles[0].rotation.x += 0.05
      db.currentTime = 0
      db.play()
    }
    if (e.key == ebDown && blackTiles[1].rotation.x == 0) {
      blackTiles[1].rotation.x += 0.05
      eb.currentTime = 0
      eb.play()
    }
    if (e.key == gbDown && blackTiles[3].rotation.x == 0) {
      blackTiles[3].rotation.x += 0.05
      gb.currentTime = 0
      gb.play()
    }
    if (e.key == abDown && blackTiles[4].rotation.x == 0) {
      blackTiles[4].rotation.x += 0.05
      ab.currentTime = 0
      ab.play()
    }
    if (e.key == bbDown && blackTiles[5].rotation.x == 0) {
      blackTiles[5].rotation.x += 0.05
      bb.currentTime = 0
      bb.play()
    }

    if (e.key == dbDown2 && blackTiles[7].rotation.x == 0) {
      blackTiles[7].rotation.x += 0.05
      db2.currentTime = 0
      db2.play()
    }
    if (e.key == ebDown2 && blackTiles[8].rotation.x == 0) {
      blackTiles[8].rotation.x += 0.05
      eb2.currentTime = 0
      eb2.play()
    }
    if (e.key == gbDown2 && blackTiles[10].rotation.x == 0) {
      blackTiles[10].rotation.x += 0.05
      gb2.currentTime = 0
      gb2.play()
    }
    if (e.key == abDown2 && blackTiles[11].rotation.x == 0) {
      blackTiles[11].rotation.x += 0.05
      ab2.currentTime = 0
      ab2.play()
    }
    if (e.key == bbDown2 && blackTiles[12].rotation.x == 0) {
      blackTiles[12].rotation.x += 0.05
      bb2.currentTime = 0
      bb2.play()
    }
  }
})

window.addEventListener('keyup', (e) => {
  if (state == 0) {
    if (e.key == cDown) {
      whiteTiles[0].rotation.x -= 0.05
    }
    if (e.key == dDown) {
      whiteTiles[1].rotation.x -= 0.05
    }
    if (e.key == eDown) {
      whiteTiles[2].rotation.x -= 0.05
    }
    if (e.key == fDown) {
      whiteTiles[3].rotation.x -= 0.05
    }
    if (e.key == gDown) {
      whiteTiles[4].rotation.x -= 0.05
    }
    if (e.key == aDown) {
      whiteTiles[5].rotation.x -= 0.05
    }
    if (e.key == bDown) {
      whiteTiles[6].rotation.x -= 0.05
    }
    if (e.key == cDown2) {
      whiteTiles[7].rotation.x -= 0.05
    }
    if (e.key == dDown2) {
      whiteTiles[8].rotation.x -= 0.05
    }
    if (e.key == eDown2) {
      whiteTiles[9].rotation.x -= 0.05
    }
    if (e.key == fDown2) {
      whiteTiles[10].rotation.x -= 0.05
    }
    if (e.key == gDown2) {
      whiteTiles[11].rotation.x -= 0.05
    }
    if (e.key == aDown2) {
      whiteTiles[12].rotation.x -= 0.05
    }
    if (e.key == bDown2) {
      whiteTiles[13].rotation.x -= 0.05
    }
    if (e.key == dbDown) {
      blackTiles[0].rotation.x -= 0.05
    }
    if (e.key == ebDown) {
      blackTiles[1].rotation.x -= 0.05
    }
    if (e.key == gbDown) {
      blackTiles[3].rotation.x -= 0.05
    }
    if (e.key == abDown) {
      blackTiles[4].rotation.x -= 0.05
    }
    if (e.key == bbDown) {
      blackTiles[5].rotation.x -= 0.05
    }
    if (e.key == dbDown2) {
      blackTiles[7].rotation.x -= 0.05
    }
    if (e.key == ebDown2) {
      blackTiles[8].rotation.x -= 0.05
    }
    if (e.key == gbDown2) {
      blackTiles[10].rotation.x -= 0.05
    }
    if (e.key == abDown2) {
      blackTiles[11].rotation.x -= 0.05
    }
    if (e.key == bbDown2) {
      blackTiles[12].rotation.x -= 0.05
    }
  }
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

function toggleButtons(show) {
  var buttons = document.querySelectorAll('.btn')

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = show ? 'block' : 'none'
  }

  var buttons = document.querySelectorAll('.btn2')

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = show ? 'block' : 'none'
  }
}

const offBtn = document.getElementById('offBtn')
const onBtn = document.getElementById('onBtn')
const setBtn = document.getElementById('setBtn')

onBtn.addEventListener('click', function () {
  toggleButtons(true)
})

offBtn.addEventListener('click', function () {
  toggleButtons(false)
})

function handleButtonClick(button) {
  offBtn.classList.remove('selected')
  onBtn.classList.remove('selected')

  button.classList.add('selected')
}

offBtn.addEventListener('click', function () {
  handleButtonClick(offBtn)
  state = 0
})

onBtn.addEventListener('click', function () {
  handleButtonClick(onBtn)
  state = 1
})
