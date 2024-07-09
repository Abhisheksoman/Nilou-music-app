$(document).ready(function() {
    $(".card .play-button").click(function(e) {
        e.preventDefault();

        // Pause all currently playing media
        const allMediaElements = document.querySelectorAll(".media");
        for (let i = 0; i < allMediaElements.length; i++) {
            allMediaElements[i].pause();
        }

        // Hide all play buttons and show all pause buttons
        $(".card .play-button").show();
        $(".card .pause-btn").hide();

        // Show the pause button for the clicked media item
        $(this).hide();
        $(this).siblings(".pause-btn").show();

        // Logic to play the specific media
        var songUrl = $(this).data('song-url');
        var songTitle = $(this).data('song-title');
        var songArtist = $(this).data('song-artist');
        const mediaElement = $("#music-player")[0];

        updateMediaElement(mediaElement, songUrl, songTitle, songArtist);
        if (mediaElement) {
            mediaElement.play();
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

    function updateMediaElement(mediaElement, songUrl, songTitle, songArtist) {
        $(mediaElement).find("source").attr('src', songUrl);
        mediaElement.load(); // Reload the audio element with the new source
        $('#current-song-title').text(songTitle);
        $('#current-song-artist').text(songArtist);
    }
});