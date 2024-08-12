console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs = [];
let currAlbumId;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

function playMusic(index, pause = false) {
    const track = songs[index];
    currentSong.src = track.url; // Assuming 'url' is the field with the URL to play
    if (!pause) {
        currentSong.play();
        document.getElementById('play').src = "{% static 'photos/pause.svg' %}";
    }
    document.querySelector(".songinfo").innerText = track.title;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

function handleAlbumClick(albumElement) {
    songs = JSON.parse(albumElement.dataset.songs);

    // Display the song list
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        songUL.innerHTML += `<li><img class="invert" width="34" src="${song.thumbnail}" alt="">
            <div class="info">
                <div>${song.title}</div>
                <div>Unknown Artist</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="{% static 'photos/play.svg' %}" alt="">
            </div></li>`;
    });

    // Attach click event to each song in the list
    Array.from(songUL.getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(index);
        });
    });

    playMusic(0); // Play the first song by default
}

function displayAlbums() {
    console.log("displaying albums");

    // Attach event listeners to album cards
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", () => handleAlbumClick(e));
    });
}

function initializePlayer() {
    // Attach event listeners to play, next, and previous buttons
    document.getElementById('play').addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            document.getElementById('play').src = "static/photos/pause.png";
        } else {
            currentSong.pause();
            document.getElementById('play').src = "static/photos/play.png";
        }
    });

        document.getElementById('prevButton').addEventListener("click", () => {
        currentSong.pause();
        let index = songs.findIndex(song => song.url === currentSong.src);

        // Decrease index and play the previous song if possible
        if (index > 0) {
            playMusic(index - 1);
        } else {
            // Optional: If at the first song, loop back to the last song
            playMusic(songs.length - 1);
        }
    });

    document.getElementById('nextButton').addEventListener("click", () => {
        currentSong.pause();
        let index = songs.findIndex(song => song.url === currentSong.src);

        // Increase index and play the next song if possible
        if (index < songs.length - 1) {
            playMusic(index + 1);
        } else {
            // Optional: If at the last song, loop back to the first song
            playMusic(0);
        }
    });

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Add event listeners for volume control and seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    document.querySelector(".range input").addEventListener("change", e => {
        currentSong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume>img").src = currentSong.volume > 0 ? "static/photos/volume.png" : "static/photos/mute.png";
    });

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.png")) {
            e.target.src = "static/photos/mute.png";
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "static/photos/volume.png";
            currentSong.volume = 0.10;
            document.querySelector(".range input").value = 10;
        }
    });

    // Add event listeners for hamburger and close buttons
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });
}

function main() {
    displayAlbums();
    initializePlayer();
}

main();
