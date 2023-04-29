/* GET THE VARIABLES */
const songImg = document.querySelectorAll(".song-img");
const songName = document.querySelectorAll(".song-name");
const songArtist = document.querySelectorAll(".song-artist");
const songList = document.querySelector(".song-list");
const songAudio = document.querySelector(".song-audio");

/* <<=============================================================>> */
const progressBar = document.querySelector("#progress-bar");
const timeStart = document.querySelector(".time-start");
const timeEnd = document.querySelector(".time-end");
const volumeBar = document.querySelector("#volume-bar");

/* GET ICON */
const playBtn = document.querySelector(".play-icon");
const nextBtn = document.querySelector(".next-icon");
const prevBtn = document.querySelector(".prev-icon");
const shuffleBtn = document.querySelector(".shuffle-icon");
const repeatBtn = document.querySelector(".repeat-icon");
const volumeBtn = document.querySelector(".volume-icon");

/* INIT SOME VARIABLES */
SONG_INDEX = 0;
IS_PLAYING = true;
IS_SHUFFLE = false;
IS_REPEAT = false;
IS_MUTE = true;
IS_TRACKING = true;

/* SONG DATA */
/* got 10 songs in this list */
const SONG_DATA = [
  {
    title: "Catch A Flight",
    artist: "Trabbey",
    image: "https://i.scdn.co/image/ab67616d0000b273e19f56b0e334e0272b34f1bd",
    duration: "02:55",
    file: "catch-a-flight.mp3",
  },
  {
    title: "Circles",
    artist: "Matee",
    image: "https://i.scdn.co/image/ab67616d0000b273e945b299e39d35637e2a5496",
    file: "circles.mp3",
    duration: "03:23",
  },
  {
    title: "Drowning",
    artist: "Malloy",
    image: "https://i.scdn.co/image/ab67616d0000b273f1407daad0a81f7b98a24115",
    file: "drowning.mp3",
    duration: "03:25",
  },
  {
    title: "Happy Again",
    artist: "Trotro",
    image: "https://i.scdn.co/image/ab67616d0000b273eb754b96435b7ecb3af67eb8",
    file: "happy-again.mp3",
    duration: "02:21",
  },
  {
    title: "Heaven",
    artist: "Rocky Beatz",
    image: "https://i.scdn.co/image/ab67616d00001e02c15539d193cd3f848ff5a12b",
    file: "heaven.mp3",
    duration: "02:13",
  },
  {
    title: "In A While",
    artist: "Young Neco",
    image: "https://i.scdn.co/image/ab67616d0000b27359853c93bc85ca304cdbb3c0",
    file: "in-a-while.mp3",
    duration: "03:37",
  },
  {
    title: "Sad To See",
    artist: "Gollwing",
    image: "https://i.scdn.co/image/ab67616d00001e0200e9d4b7272c7a1a4ba90177",
    file: "sad-to-see.mp3",
    duration: "02:15",
  },
  {
    title: "Seemless",
    artist: "beatsflare",
    image: "https://i.scdn.co/image/ab67616d0000b273d9120b4c27054b48e0565cca",
    file: "seemless.mp3",
    duration: "03:01",
  },
  {
    title: "Time Is Runing",
    artist: "Bapop",
    image: "https://i.scdn.co/image/ab67616d00001e02f6bebb36140380a2e4cbf3c3",
    file: "time-is-runing.mp3",
    duration: "02:20",
  },
  {
    title: "Uber",
    artist: "trabbey",
    image: "https://i.scdn.co/image/ab67616d0000b273e19822709a0682b4bd89ee18",
    file: "uber.mp3",
    duration: "02:21",
  },
];
/* ============================================================ */

// HANLDE LOAD SONG INFO
function handleLoadSong() {
  handleLoadProgressBar();
  songImg.forEach((image) =>
    image.setAttribute("src", SONG_DATA[SONG_INDEX].image)
  );
  songName.forEach((item) => (item.textContent = SONG_DATA[SONG_INDEX].title));
  songArtist.forEach(
    (item) => (item.textContent = SONG_DATA[SONG_INDEX].artist)
  );
  songAudio.setAttribute("src", `./songs/${SONG_DATA[SONG_INDEX].file}`);
}
handleLoadSong();

/* RENDER ALL THE SONGS IN HTML */
function renderSong() {
  SONG_DATA.forEach((song, index) => {
    const template = `<li data-index="${index}" onClick="handleClickSongItem(event)" class="song-item">
    <div class="song-item-info">
      <img
        class="song-item-img"
        src="${song.image}"
        alt=""
      />
      <span>
        <h1 class="song-item-name">${song.title}</h1>
        <p class="song-item-artist">${song.artist}</p>
      </span>
    </div>
    <div class="song-item-time">
      <span class="heart-icon">
        <i class="fa-solid fa-heart"></i>
      </span>
      <p>${song.duration}</p>
    </div>
  </li>`;
    songList.insertAdjacentHTML("beforeend", template);
  });
}
renderSong();

// HANDLE CLICK SONG ITEM
function handleClickSongItem(event) {
  const songItemIndex = event.target.dataset.index;
  SONG_INDEX = songItemIndex;
  handleLoadSong();
  handleActiveSong();
  IS_PLAYING = true;
  handlePlayAndPause();
}

// ACITVE BACKGROUND FOR SONG-ITEM
function handleActiveSong() {
  const songElements = document.querySelectorAll(".song-item");
  songElements.forEach((item) => item.classList.remove("active"));
  songElements[SONG_INDEX].classList.add("active");
}

// HANDLE PLAY AND PAUSE SONG
playBtn.addEventListener("click", handlePlayAndPause);
function handlePlayAndPause() {
  if (IS_PLAYING) {
    songAudio.play();
    handleActiveSong();
    playBtn.classList.add("active");
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    songImg.forEach((img) => img.classList.add("active"));
    IS_PLAYING = false;
  } else {
    songAudio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    songImg.forEach((img) => img.classList.remove("active"));
    IS_PLAYING = true;
  }
}

// HANDLE NEXT SONG
nextBtn.addEventListener("click", handleNextSong);
function handleNextSong() {
  if (IS_SHUFFLE) {
    handleShuffleSong();
  } else {
    SONG_INDEX++;
    if (SONG_INDEX > SONG_DATA.length - 1) {
      SONG_INDEX = 0;
    }
  }
  handleActiveSong();
  handleLoadSong();
  IS_PLAYING = true;
  handlePlayAndPause();
}

// HANDLE PREV SONG
prevBtn.addEventListener("click", handlePrevSong);
function handlePrevSong() {
  SONG_INDEX--;
  if (SONG_INDEX < 0) {
    SONG_INDEX = SONG_DATA.length - 1;
  }
  IS_PLAYING = true;
  handleLoadSong();
  handlePlayAndPause();
}

// HANDLE ACTVE SHUFFLE BTN
shuffleBtn.addEventListener("click", handleActiveShuffle);
function handleActiveShuffle() {
  if (IS_TRACKING) {
    shuffleBtn.classList.add("active");
    IS_TRACKING = false;
    IS_SHUFFLE = true;
  } else {
    shuffleBtn.classList.remove("active");
    IS_TRACKING = true;
    IS_SHUFFLE = false;
  }
}

// HANDLE ACTIVE SHUFFLE SONG
let shuffleSongs = [];
function handleShuffleSong() {
  if (shuffleSongs.length === SONG_DATA.length - 1) {
    shuffleSongs = [];
  }
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * SONG_DATA.length);
  } while (shuffleSongs.includes(randomIndex));
  shuffleSongs.push(randomIndex);
  SONG_INDEX = randomIndex;
  handleLoadSong();
  handleActiveSong();
}

// HANDLE ACTVE REPEAT BTN
repeatBtn.addEventListener("click", handleRepeatSong);
function handleRepeatSong() {
  repeatBtn.classList.toggle("active");
  IS_REPEAT = true;
}

// HANDLE LOAD PROGRESS BAR
const timer = setInterval(handleLoadProgressBar, 500);
function handleLoadProgressBar() {
  const currentTime = songAudio.currentTime;
  const duration = songAudio.duration;

  progressBar.max = duration;
  progressBar.value = currentTime;

  timeStart.textContent = handeFormatTime(currentTime);
  if (!duration) {
    timeEnd.textContent = "00:00";
  } else {
    timeEnd.textContent = handeFormatTime(duration);
  }
}
handleLoadProgressBar();

progressBar.addEventListener("change", function (e) {
  songAudio.currentTime = e.target.value;
});

// HANDLE FORMAT TIME
function handeFormatTime(number) {
  let minutes = Math.floor(number / 60);
  let seconds = Math.floor(number % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

// SONG END
songAudio.addEventListener("ended", function () {
  if (IS_SHUFFLE) {
    handleShuffleSong();
  } else if (IS_REPEAT) {
    IS_PLAYING = true;
    handlePlayAndPause();
  } else {
    SONG_INDEX++;
    if (SONG_INDEX > SONG_DATA.length - 1) {
      SONG_INDEX = 0;
    }
  }
  handleActiveSong();
  handleLoadSong();
  IS_PLAYING = true;
  handlePlayAndPause();
});

// HANDLE VOLUME
volumeBtn.addEventListener("click", handleToggleVolume);
function handleToggleVolume() {
  if (IS_MUTE) {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    volumeBar.value = 0;
    songAudio.volume = 0;
    IS_MUTE = false;
  } else {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    volumeBar.value = 100;
    songAudio.volume = 1;
    IS_MUTE = true;
  }
}

volumeBar.addEventListener("change", function (e) {
  const volumeVal = e.target.value / 100;
  songAudio.volume = volumeVal;
  if (songAudio.volume === 0) {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  }
});
