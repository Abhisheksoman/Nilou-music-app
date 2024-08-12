$(document).ready(function() {
    var currentIndex = 0;
    var songs = []; // Array to hold song objects

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
        songs = JSON.parse(songData); // Parse the JSON string into an array of objects

        // Populate the song list
        var songList = $(".songList ul");
        songList.empty(); // Clear existing songs
        songs.forEach(function(song) {
            songList.append(`<li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.title}</div>
                    <div>${$(this).data('artist-name')}</div>
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

        // Play the first song
        if (songs.length > 0) {
            currentIndex = 0;
            playMusic(songs[currentIndex].title);
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

    $(".card .pause-btn").click(function(e) {
        e.preventDefault();

        // Hide this pause button and show the play button
        $(this).hide();
        $(this).siblings(".play-button").show();

        const mediaElement = $(".playbar")[0];
        if (mediaElement) {
            mediaElement.pause();
        }
    });
});