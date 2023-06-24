const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")

const btPlay = document.querySelector(".play")
const imgPlay = document.querySelector("#img-play")
const btPause = document.querySelector(".pause")
const btStop = document.querySelector(".stop")
const imgStop = document.querySelector("#img-stop")
const btAdd = document.querySelector(".add")
const imgAdd = document.querySelector("#img-add")
const btSub = document.querySelector(".sub")
const imgSub = document.querySelector("#img-sub")

const btArvore = document.querySelector(".button-arvore")
const imgArvore = document.querySelector("#img-arvore")
const btChuva = document.querySelector(".button-chuva")
const imgChuva = document.querySelector("#img-chuva")
const btCafeteria = document.querySelector(".button-cafeteria")
const imgCafeteria = document.querySelector("#img-cafeteria")
const btLareira = document.querySelector(".button-lareira")
const imgLareira = document.querySelector("#img-lareira")

const musicArvore = new Audio("./assets/audios/floresta.wav")
const musicChuva = new Audio("./assets/audios/chuva.wav")
const musicCafeteria = new Audio("./assets/audios/cafeteria.wav")
const musicLareira = new Audio("./assets/audios/lareira.wav")

const ctrlEnabledColor = "#323238"
const ctrlDisabledColor = "#e1e1e6"

const btDeselectedColor = "#e1e1e6"
const imgDeselectedColor = "#323238"
const btSelectedColor = "#02799d"
const imgSelectedColor = "#ffffff"

let minutes
let seconds
let timeOut

function controlDisabled(image, button) {
  image.style.fill = ctrlDisabledColor
  button.style.cursor = "auto"
  button.disabled = true
}

function controlEnabled(image, button) {
  image.style.fill = ctrlEnabledColor
  button.style.cursor = "pointer"
  button.disabled = false
}

function updateTimer() {
  minutes = Number(minutesDisplay.textContent)
  seconds = Number(secondsDisplay.textContent)
}

function updateDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, 0)
  secondsDisplay.textContent = String(seconds).padStart(2, 0)

  // Habilitar/Desabilitar botão "Play"
  if (minutes > 0 || seconds > 0) {
    controlEnabled(imgPlay, btPlay)
  } else {
    controlDisabled(imgPlay, btPlay)
  }

  // Desabilitar botão "Pause"
  if (minutes <= 0 && seconds <= 0) {
    btPause.classList.add("hide")
    btPlay.classList.remove("hide")
  }

  // Desabilitar botão "Stop"
  if (minutes <= 0 && seconds <= 0) {
    controlDisabled(imgStop, btStop)
  }

  // Habilitar/Desabilitar botão "Add"
  if (minutes < 20 || (minutes == 20 && seconds == 0)) {
    controlEnabled(imgAdd, btAdd)
  } else {
    controlDisabled(imgAdd, btAdd)
  }

  // Habilitar/Desabilitar botão "Sub"
  if (minutes >= 5) {
    controlEnabled(imgSub, btSub)
  } else {
    controlDisabled(imgSub, btSub)
  }
}

function buttonMusicDeselected(image, button) {
  image.style.fill = imgDeselectedColor
  button.style.backgroundColor = btDeselectedColor
  // button.style.cursor = "pointer"
  // button.disabled = false
}

function buttonMusicSelected(image, button) {
  image.style.fill = imgSelectedColor
  button.style.backgroundColor = btSelectedColor
  // button.style.cursor = "auto"
  // button.disabled = true
}

function countdown() {
  timeOut = setTimeout(() => {
    updateTimer()
    if (minutes <= 0 && seconds <= 0) {
      clearTimeout(timeOut)

      buttonMusicDeselected(imgArvore, btArvore)
      buttonMusicDeselected(imgChuva, btChuva)
      buttonMusicDeselected(imgCafeteria, btCafeteria)
      buttonMusicDeselected(imgLareira, btLareira)

      musicArvore.pause()
      musicChuva.pause()
      musicCafeteria.pause()
      musicLareira.pause()

      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }

    --seconds

    updateDisplay(minutes, seconds)
    countdown()
  }, 1000)
}

updateDisplay(0, 0)

btPlay.addEventListener("click", function () {
  btPlay.classList.add("hide")
  btPause.classList.remove("hide")

  controlEnabled(imgStop, btStop)

  countdown()
})

btPause.addEventListener("click", function () {
  btPause.classList.add("hide")
  btPlay.classList.remove("hide")

  clearTimeout(timeOut)
})

btStop.addEventListener("click", function () {
  btPause.classList.add("hide")
  btPlay.classList.remove("hide")

  clearTimeout(timeOut)
  updateDisplay(0, 0)
})

btArvore.addEventListener("click", function () {
  if (musicArvore.paused) {
    buttonMusicSelected(imgArvore, btArvore)
    buttonMusicDeselected(imgChuva, btChuva)
    buttonMusicDeselected(imgCafeteria, btCafeteria)
    buttonMusicDeselected(imgLareira, btLareira)

    musicArvore.play()
    musicChuva.pause()
    musicCafeteria.pause()
    musicLareira.pause()
    musicArvore.loop = true
  } else {
    buttonMusicDeselected(imgArvore, btArvore)
    musicArvore.pause()
  }
})

btChuva.addEventListener("click", function () {
  if (musicChuva.paused) {
    buttonMusicSelected(imgChuva, btChuva)
    buttonMusicDeselected(imgCafeteria, btCafeteria)
    buttonMusicDeselected(imgLareira, btLareira)
    buttonMusicDeselected(imgArvore, btArvore)

    musicChuva.play()
    musicCafeteria.pause()
    musicLareira.pause()
    musicArvore.pause()
    musicChuva.loop = true
  } else {
    buttonMusicDeselected(imgChuva, btChuva)
    musicChuva.pause()
  }
})

btCafeteria.addEventListener("click", function () {
  if (musicCafeteria.paused) {
    buttonMusicSelected(imgCafeteria, btCafeteria)
    buttonMusicDeselected(imgLareira, btLareira)
    buttonMusicDeselected(imgArvore, btArvore)
    buttonMusicDeselected(imgChuva, btChuva)

    musicCafeteria.play()
    musicLareira.pause()
    musicArvore.pause()
    musicChuva.pause()
    musicCafeteria.loop = true
  } else {
    buttonMusicDeselected(imgCafeteria, btCafeteria)
    musicCafeteria.pause()
  }
})

btLareira.addEventListener("click", function () {
  if (musicLareira.paused) {
    buttonMusicSelected(imgLareira, btLareira)
    buttonMusicDeselected(imgArvore, btArvore)
    buttonMusicDeselected(imgChuva, btChuva)
    buttonMusicDeselected(imgCafeteria, btCafeteria)

    musicLareira.play()
    musicArvore.pause()
    musicChuva.pause()
    musicCafeteria.pause()
    musicLareira.loop = true
  } else {
    buttonMusicDeselected(imgLareira, btLareira)
    musicLareira.pause()
  }
})

btAdd.addEventListener("click", function () {
  updateTimer()
  minutes = minutes + 5

  updateDisplay(minutes, seconds)
})

btSub.addEventListener("click", function () {
  updateTimer()
  minutes = minutes - 5

  updateDisplay(minutes, seconds)
})
