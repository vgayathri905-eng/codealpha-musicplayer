const songs = [
  {
    title: "என்ன சொல்ல போகிறாய்",
    artist: "ஷங்கர் மகாதேவன்",
    src: "songs/song01.mp3",
    cover: "images/cover1.jpg",
    tamil: true
  },
  {
    title: "பச்சை நிறமே",
    artist: "ஹரிஹரன், கிளின்டன் செரெஜோ",
    src: "songs/song02.mp3",
    cover: "images/cover2.jpg",
    tamil: true
  },
  {
    title: "காற்றே என் வாசல்",
    artist: "பி. உன்னிகிருஷ்ணன், கவிதா சுப்ரமணியம்",
    src: "songs/song03.mp3",
    cover: "images/cover3.jpg",
    tamil: true
  },
  {
    title: "கண்டுகொண்டேன் கண்டுகொண்டேன்",
    artist: "ஹரிஹரன், மகாலட்சுமி",
    src: "songs/song04.mp3",
    cover: "images/cover4.jpg",
    tamil: true
  },
  {
    title: "ஸ்நேகிதனே",
    artist: "சாதனா சர்கம், ஸ்ரீனிவாஸ்",
    src: "songs/song05.mp3",
    cover: "images/cover5.jpg",
    tamil: true
  },
  {
    title: "உதயா உதயா",
    artist: "ஹரிஹரன், சாதனா சர்கம்",
    src: "songs/song06.mp3",
    cover: "images/cover6.jpg",
    tamil: true
  },
  {
    title: "நதியே நதியே",
    artist: "உன்னி மேனன்",
    src: "songs/song07.mp3",
    cover: "images/cover7.jpg",
    tamil: true
  },
  {
    title: "ஸ்வாசமே",
    artist: "எஸ். பி. பாலசுப்பிரமணியம், சாதனா சர்கம்",
    src: "songs/song08.mp3",
    cover: "images/cover8.jpg",
    tamil: true
  },
  {
    title: "கொஞ்சும் மைனாக்களே",
    artist: "சாதனா சர்கம்",
    src: "songs/song09.mp3",
    cover: "images/cover9.jpg",
    tamil: true
  },
  {
    title: "மனசுக்குள் ஒரு புயல்",
    artist: "எஸ். பி. பாலசுப்பிரமணியம், சாதனா சர்கம்",
    src: "songs/song10.mp3",
    cover: "images/cover10.jpg",
    tamil: true
  },
  {
    title: "அழகே சுகமா",
    artist: "ஸ்ரீனிவாஸ், சாதனா சர்கம்",
    src: "songs/song11.mp3",
    cover: "images/cover11.jpg",
    tamil: true
  },
  {
    title: "நெந்துக்கிட்டேன்",
    artist: "கார்த்திக், சித்ரா சிவராமன்",
    src: "songs/song12.mp3",
    cover: "images/cover12.jpg",
    tamil: true
  },
  {
    title: "அடா மூன்றெழுத்து",
    artist: "எஸ். பி. பாலசுப்பிரமணியம்",
    src: "songs/song13.mp3",
    cover: "images/cover13.jpg",
    tamil: true
  },
  {
    title: "இஞ்சாரங்கோ",
    artist: "கமல்ஹாசன், கே. எஸ். சித்ரா",
    src: "songs/song14.mp3",
    cover: "images/cover14.jpg",
    tamil: true
  },
  {
    title: "நீதான் என்தன்",
    artist: "பால்ராம், கே. எஸ். சித்ரா",
    src: "songs/song15.mp3",
    cover: "images/cover15.jpg",
    tamil: true
  }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

const playBtn = document.querySelector(".controls button:nth-child(2)");

// Set audio source and load song
function loadSong(index) {
  currentSong = index;
  const song = songs[index];
  title.innerHTML = song.title;
  artist.innerHTML = song.artist;
  cover.src = song.cover;

  // Use decodeURI to handle special characters in file path
  audio.src = song.src;
  audio.load();

  // Update playlist active state
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.style.background = i === index ? "linear-gradient(90deg,#FFD700,#FFA500)" : "";
    li.style.fontWeight = i === index ? "bold" : "normal";
    li.style.color = i === index ? "#1a1a2e" : "#e8c8a8";
  });
}

loadSong(currentSong);

// Play/Pause toggle
function playPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = "▶";
  } else {
    audio.play().catch(err => {
      console.log("Playback prevented:", err);
    });
    playBtn.innerHTML = "⏸";
  }
  isPlaying = !isPlaying;
}

// Next song
function nextSong() {
  audio.pause();
  currentSong++;
  if (currentSong >= songs.length) currentSong = 0;
  loadSong(currentSong);
  if (isPlaying) {
    audio.play().catch(err => console.log("Playback prevented:", err));
  }
}

// Previous song
function prevSong() {
  audio.pause();
  currentSong--;
  if (currentSong < 0) currentSong = songs.length - 1;
  loadSong(currentSong);
  if (isPlaying) {
    audio.play().catch(err => console.log("Playback prevented:", err));
  }
}

// Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
    current.innerHTML = format(audio.currentTime);
  }
});

// Set duration when metadata loaded
audio.addEventListener("loadedmetadata", () => {
  duration.innerHTML = format(audio.duration);
  progress.value = 0;
});

// When song ends, auto play next
audio.addEventListener("ended", () => {
  nextSong();
});

// Seek functionality
progress.addEventListener("input", () => {
  if (audio.duration) {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Play/pause on audio events
audio.addEventListener("play", () => {
  isPlaying = true;
  playBtn.innerHTML = "⏸";
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playBtn.innerHTML = "▶";
});

// Format time in MM:SS
function format(time) {
  if (isNaN(time) || time === Infinity || time === undefined) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}

// Build playlist
songs.forEach((song, index) => {
  let li = document.createElement("li");
  li.innerHTML = song.title + " - " + song.artist;

  li.onclick = function () {
    if (currentSong === index) {
      playPause();
    } else {
      audio.pause();
      currentSong = index;
      loadSong(index);
      audio.play().catch(err => console.log("Playback prevented:", err));
      isPlaying = true;
      playBtn.innerHTML = "⏸";
    }
  };

  playlist.appendChild(li);
});

