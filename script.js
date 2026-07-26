const songs=[
{
title:"Song One",
artist:"Artist One",
src:"music/song1.mp3",
cover:"images/cover1.jpg"
},
{
title:"Song Two",
artist:"Artist Two",
src:"music/song2.mp3",
cover:"images/cover2.jpg"
},
{
title:"Song Three",
artist:"Artist Three",
src:"music/song3.mp3",
cover:"images/cover3.jpg"
}
];

let currentSong=0;

const audio=document.getElementById("audio");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const cover=document.getElementById("cover");
const progress=document.getElementById("progress");
const current=document.getElementById("current");
const duration=document.getElementById("duration");
const volume=document.getElementById("volume");
const playlist=document.getElementById("playlist");

function loadSong(index){

audio.src=songs[index].src;
title.innerHTML=songs[index].title;
artist.innerHTML=songs[index].artist;
cover.src=songs[index].cover;

}

loadSong(currentSong);

function playPause(){

if(audio.paused){
audio.play();
}
else{
audio.pause();
}

}

function nextSong(){

currentSong++;

if(currentSong>=songs.length)
currentSong=0;

loadSong(currentSong);
audio.play();

}

function prevSong(){

currentSong--;

if(currentSong<0)
currentSong=songs.length-1;

loadSong(currentSong);
audio.play();

}

audio.addEventListener("loadedmetadata",()=>{

duration.innerHTML=format(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

progress.value=(audio.currentTime/audio.duration)*100;
current.innerHTML=format(audio.currentTime);

});

progress.addEventListener("input",()=>{

audio.currentTime=(progress.value/100)*audio.duration;

});

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

audio.addEventListener("ended",nextSong);

function format(time){

let min=Math.floor(time/60);
let sec=Math.floor(time%60);

if(sec<10)
sec="0"+sec;

return min+":"+sec;

}

songs.forEach((song,index)=>{

let li=document.createElement("li");
li.innerHTML=song.title+" - "+song.artist;

li.onclick=function(){

currentSong=index;
loadSong(index);
audio.play();

};

playlist.appendChild(li);

});
