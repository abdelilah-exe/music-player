// Get references to HTML elements we need to control
const progressBar = document.getElementById("progress-bar");
const audioPlayer = document.getElementById("audio-player");
const playPauseIcon = document.getElementById("play-pause-icon");
const playPauseBtn = document.getElementById("play-pause-btn");

// Variable to track if audio is currently playing or paused
let isPlaying = false;

// Set up progress bar when audio metadata loads (gets duration info)
audioPlayer.addEventListener('loadedmetadata', function() {
    progressBar.max = audioPlayer.duration;
    progressBar.value = 0;
});

// Make sure progress bar max value equals song duration when audio is ready to play
audioPlayer.addEventListener('canplay', function() {
    if (audioPlayer.duration && progressBar.max !== audioPlayer.duration) {
        progressBar.max = audioPlayer.duration;
    }
});

// Function to switch between play and pause states
function togglePlayPause() {
    if (isPlaying) {
        // If playing, pause the audio and switch icon to play
        audioPlayer.pause();
        playPauseIcon.classList.remove("bx-pause");
        playPauseIcon.classList.add("bx-play");
        isPlaying = false;
    } else {
        // If paused, play the audio and switch icon to pause
        audioPlayer.play();
        playPauseIcon.classList.remove("bx-play");
        playPauseIcon.classList.add("bx-pause");
        isPlaying = true;
    }
}

// Listen for clicks on the play/pause button
playPauseBtn.addEventListener('click', togglePlayPause);

// Update progress bar position as audio plays
audioPlayer.addEventListener('timeupdate', function() {
    if (audioPlayer.duration) {
        progressBar.value = audioPlayer.currentTime;
    }
});

// Allow user to seek to different position by dragging progress bar
progressBar.addEventListener('input', function() {
    audioPlayer.currentTime = progressBar.value;
});

// Reset everything when song finishes playing
audioPlayer.addEventListener('ended', function() {
    playPauseIcon.classList.remove("bx-pause");
    playPauseIcon.classList.add("bx-play");
    isPlaying = false;
    progressBar.value = 0;
});