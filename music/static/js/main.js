$(document).ready(function() {
    var currentIndex = 0;
    var songUrls = window.songUrls; // Get the song URLs from the global scope
    var songTitles = window.songTitles; // Get the song titles from the global scope

    $(".card .play-button").click(function(e) {
        e.preventDefault();

        // Pause all currently playing media
        $(".media").each(function() {
            this.pause();
        });

        // Hide all play buttons and show all pause buttons
        $(".card .play-button").show();
        $(".card .pause-btn").hide();

        // Show the pause button for the clicked media item
        $(this).hide();
        $(this).siblings(".pause-btn").show();

        // Logic to play the specific media
        var songUrl = $(this).data('song-url');
        var songTitle = $(this).data('song-title');
        const mediaElement = $("#music-player")[0];
        updateMediaElement(mediaElement, songUrl, songTitle);

        if (mediaElement) {
            mediaElement.play();
        }

        // Populate the song list
        var songList = $(".songList ul");
        songList.empty(); // Clear existing songs
        songTitles.forEach(function(title) {
            songList.append(`<li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${title}</div>
                    <div>Artist Name</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`);
        });

        // Attach click event to each song in the list
        songList.find('li').on('click', function() {
            var trackTitle = $(this).find('.info div:first').text();
            playMusic(trackTitle);
        });
    });

    $(".card .pause-btn").click(function(e) {
        e.preventDefault();

        // Hide this pause button and show the play button
        $(this).hide();
        $(this).siblings(".play-button").show();

        const mediaElement = $("#music-player")[0];
        if (mediaElement) {
            mediaElement.pause();
        }
    });

    function updateMediaElement(mediaElement, songUrl, songTitle) {
        $(mediaElement).find("source").attr('src', songUrl);
        mediaElement.load(); // Reload the audio element with the new source
        $('#current-song-title').text(songTitle);
    }

    function nextSong() {
        currentIndex = (currentIndex + 1) % songUrls.length;
        updateAudioPlayer();
        playAudio();
    }

    function prevSong() {
        currentIndex = (currentIndex - 1 + songUrls.length) % songUrls.length;
        updateAudioPlayer();
        playAudio();
    }

    function updateAudioPlayer() {
        var mediaElement = $("#music-player")[0];
        var songUrl = songUrls[currentIndex];
        var songTitle = songTitles[currentIndex];
        updateMediaElement(mediaElement, songUrl, songTitle);
    }

    function playAudio() {
        var mediaElement = $("#music-player")[0];
        if (mediaElement) {
            mediaElement.play();
        }
    }

    document.getElementById('prevButton').addEventListener('click', prevSong);
    document.getElementById('nextButton').addEventListener('click', nextSong);

    // Initial load
    updateAudioPlayer();
});