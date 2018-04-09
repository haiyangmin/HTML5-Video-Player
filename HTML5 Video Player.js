(function () {
var video, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn,method,playList,playItems,playListBox,height, width, videoHeight, videoWidth,listHeight,listBoxWidth,togglebtn,togglebtnBox,videoBox ,nextBtn,lastBtn,currentVideo,source,currentVideoName;
function intializePlayer(){
// Set object references
currentVideo= "The walking dead episode 1"+ ".mp4";
currentVideoName=document.getElementById("currentVideoName");
currentVideoName.textContent="The walking dead episode 1";
video = document.getElementById("my-video");
playbtn = document.getElementById("playpausebtn");
lastBtn = document.getElementById("backwardbtn");
nextBtn= document.getElementById("forwardbtn");
seekslider = document.getElementById("seekslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
mutebtn = document.getElementById("mutebtn");
volumeslider = document.getElementById("volumeslider");
fullscreenbtn = document.getElementById("fullscreenbtn");
playItems = document.querySelectorAll('.play-item');
playListBox= document.getElementById("play-list");
playListBox.style.height = (window.innerHeight-40) + "px";
playListBox.style.width = 300 + "px";
togglebtnBox = document.getElementById("toggleplaylist");
togglebtn = document.getElementById("togglelist");
videoBox = document.getElementById("video-container");
// move all text into <span>
// they occupy exactly the place necessary for the text,
for (let li of playlist.querySelectorAll('li')) {
let span = document.createElement('span');
li.prepend(span);
span.append(span.nextSibling); // move the text node into span
}
// catch clicks on whole tree
playlist.addEventListener("click",playVideo,false);

function playVideo(e) {
if (e.target.tagName != 'SPAN') {
return;
}
loadVideo(e);
let childrenContainer = event.target.parentNode.querySelector('ul');
if (childrenContainer != null) {
childrenContainer.hidden = !childrenContainer.hidden;
}
else return;
}

// Add event listeners
playbtn.addEventListener("click",playPause,false);
lastBtn.addEventListener("click",playLastOne,false);
nextBtn.addEventListener("click",playNextOne,false);
seekslider.addEventListener("change",videoSeek,false);
video.addEventListener("timeupdate",seektimeupdate,false);
mutebtn.addEventListener("click",videoMute,false);
volumeslider.addEventListener("change",setvolume,false);
fullscreenbtn.addEventListener("click",toggleFullScreen,false);
video.addEventListener("ended", endHandler,false);
video.controls = false;
togglebtnBox.addEventListener('click', toggleArrowbtn,false);
resize();
}
window.onload = intializePlayer;
window.onresize = resize;
function toggleArrowbtn(){
playListBox.hidden = !playListBox.hidden ;
if (playListBox.hidden){
videoBox.setAttribute("class","wide");
playListBox.style.width=0 + "px";
togglebtn.className = "fa fa-angle-left";
resize();
}
else {
videoBox.setAttribute("class","video-container");
playListBox.style.width = 300 + "px";
togglebtn.className ="fa fa-angle-right";
resize();
}
}
function playLastOne(){
for (let item of playItems) {
if ((item.textContent +".mp4")== currentVideo){
video.src = item.previousElementSibling.textContent+".mp4" ;
currentVideo = item.previousElementSibling.textContent+".mp4" ;
currentVideoName.textContent = item.previousElementSibling.textContent;
break;
}
}
video.load();
video.play();
updateButton();
}
function playNextOne(){
for (let item of playItems) {
if ((item.textContent +".mp4")== currentVideo && (item.nextElementSibling.textContent != null)){
video.src = item.nextElementSibling.textContent+".mp4" ;
currentVideo = item.nextElementSibling.textContent+".mp4" ;
currentVideoName.textContent = item.nextElementSibling.textContent;
break;
}
}
video.load();
video.play();
updateButton();
}

function endHandler() {
if (currentVideo == "The walking dead episode 13.mp4" || currentVideo == "Castle season 8 episode 22.mp4"){
reSetButton();
 }
else {
playNextOne();
 }
}

function resize(){
height = window.innerHeight;
width = window.innerWidth;
listBoxWidth= document.getElementById("play-list").offsetWidth;
if(width > 768) {
videoHeight = height-95;
videoWidth = width -listBoxWidth;
if(videoWidth/videoHeight > 16/9){
document.getElementById("my-video").style.height = videoHeight + "px";
document.getElementById("my-video").style.width = (videoHeight*16)/9 + "px";
document.getElementById("my-video").style.top= ((height-95)-videoHeight)/2 + "px";
document.getElementById("play-list").style.height = (window.innerHeight-40) + "px";
}
else if (videoWidth/videoHeight < 16/9){
document.getElementById("my-video").style.width = videoWidth + "px";
document.getElementById("my-video").style.height = (videoWidth*9)/16 + "px";
document.getElementById("my-video").style.top= ((height-95)-(videoWidth*9)/16)/2 + "px";
document.getElementById("play-list").style.height = (window.innerHeight-40) + "px";
}
else {
document.getElementById("my-video").style.width = videoWidth + "px";
document.getElementById("my-video").style.height = videoHeight + "px";
document.getElementById("my-video").style.top= ((height-95)-videoHeight)/2 + "px";
document.getElementById("play-list").style.height = (window.innerHeight-40) + "px";
}
}
if(width <= 768) {
document.getElementById("my-video").style.width ="calc(100% - 8px)";
document.getElementById("my-video").style.height =height-95+ "px";
document.getElementById("my-video").style.top=0 + "px";
}
}
function playPause() {
const method = video.paused ? "play" : "pause";
video[method]();
updateButton();
}
function updateButton() {
if(video.paused || video.ended) {
playbtn.className = "fa fa-play";
}
else {
playbtn.className = "fa fa-pause";
}
}
function reSetButton() {
playbtn.className = "fa fa-play";
seekslider.value = 0;
}
function videoSeek(){
var seekto = video.duration * (seekslider.value / 100);
video.currentTime = seekto;
}
function seektimeupdate(){
var nt = video.currentTime * (100 / video.duration);
seekslider.value = nt;
var curmins = Math.floor(video.currentTime / 60);
var cursecs = Math.floor(video.currentTime - curmins * 60);
var durmins = Math.floor(video.duration / 60);
var dursecs = Math.floor(video.duration - durmins * 60);
if(cursecs < 10){ cursecs = "0"+cursecs; }
if(dursecs < 10){ dursecs = "0"+dursecs; }
if(curmins < 10){ curmins = "0"+curmins; }
if(durmins < 10){ durmins = "0"+durmins; }
curtimetext.innerHTML = curmins+":"+cursecs;
durtimetext.innerHTML = durmins+":"+dursecs;
}
function videoMute(){
if(video.muted){
video.muted = false;
updateVolBtn();
} else {
video.muted = true;
updateVolBtn();
}
}
function updateVolBtn(){
if(video.muted){
mutebtn.className = "fa fa-volume-off";
volumeslider.value = 0;
} else {
mutebtn.className = "fa fa-volume-up";
volumeslider.value = 80;
}
}
function setvolume(){
video.volume = volumeslider.value / 100;
}
function toggleFullScreen(){
if(video.requestFullScreen){
video.requestFullScreen();
} else if(video.webkitRequestFullScreen){
video.webkitRequestFullScreen();
} else if(video.mozRequestFullScreen){
video.mozRequestFullScreen();
}
}
function loadVideo() {
if (event.target.parentNode.className == "play-item"){
video.src = event.target.textContent + ".mp4";
currentVideo= event.target.textContent + ".mp4";
currentVideoName.textContent= event.target.textContent;
//alert(currentVideo);
video.load();
video.play();
updateButton();
}
else return;
}
})();
