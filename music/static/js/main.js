$(document).ready(function() {
    var currentIndex = 0;
    var songUrls = window.songUrls || []; // Get the song URLs from the global scope
    var songTitles = window.songTitles || []; // Get the song titles from the global scope

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

        // Get the song data from the card
        var songData = $(this).closest('.card').data('songs');
        var songs = JSON.parse(songData); // Parse the JSON string into an array of objects

        // Populate the song list
        var songList = $(".songList ul");
        songList.empty(); // Clear existing songs
        songs.forEach(function(song) {
            songList.append(`<li>
                <img class="invert" width="34" src="{% static 'photos/music.svg' %}" alt="">
                <div class="info">
                    <div>${song.title}</div>
                    <div>${$(this).data('artist-name')}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="{% static 'photos/play.svg' %}" alt="">
                </div>
            </li>`);
        });

        // Attach click event to each song in the list
        songList.find('li').on('click', function() {
            var trackTitle = $(this).find('.info div:first').text();
            playMusic(trackTitle);
        });

        // Play the first song
        if (songs.length > 0) {
            currentIndex = 0;
            playMusic(songs[currentIndex].title);
        }
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

    function playMusic(track) {
        var song = songs.find(s => s.title === track);
        if (song) {
            const mediaElement = $("#music-player")[0];
            mediaElement.src = song.url; // Set the audio source to the song URL
            mediaElement.play(); // Play the audio

            // Update the song info display
            $('#current-song-title').text(track);
            document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
        }
    }

    document.getElementById('prevButton').addEventListener('click', prevSong);
    document.getElementById('nextButton').addEventListener('click', nextSong);

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

    function updateMediaElement(mediaElement, songUrl, songTitle) {
        $(mediaElement).find("source").attr('src', songUrl);
        mediaElement.load(); // Reload the audio element with the new source
        $('#current-song-title').text(songTitle);
    }

    function playAudio() {
        var mediaElement = $("#music-player")[0];
        if (mediaElement) {
            mediaElement.play();
        }
    }

    // Initial load
    updateAudioPlayer();
});