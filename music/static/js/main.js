$(document).ready(function() {
        var songUrls = $(this).data('song-url');
        var songTitles = $(this).data('song-title');
        var currentIndex = 0;


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
            const mediaElement = $("#music-player")[0];

            updateMediaElement(mediaElement, songUrl, songTitle);
            if (mediaElement) {
                mediaElement.play();
            }
        });

        $('#next-btn').click(function() {
            currentIndex = (currentIndex + 1) % songUrls.length;
            updateAudioPlayer();
            playAudio();
        });

        $('#prev-btn').click(function() {
            currentIndex = (currentIndex - 1 + songUrls.length) % songUrls.length;
            updateAudioPlayer();
            playAudio();
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

        function updateMediaElement(mediaElement, songUrl, songTitle, songThumbnail) {
            $(mediaElement).find("source").attr('src', songUrl);
            mediaElement.load(); // Reload the audio element with the new source
            $('#current-song-title').text(songTitle);
        }

        function updateAudioPlayer() {
            var mediaElement = $("#music-player")[0];
            var songUrl = songUrls[currentIndex];
            var songTitle = songTitles[currentIndex];
            var songThumbnail = songThumbnails[currentIndex];

            updateMediaElement(mediaElement, songUrl, songTitle, songThumbnail);
        }

        function playAudio() {
            var mediaElement = $("#music-player")[0];
            if (mediaElement) {
                mediaElement.play();
            }
        }

        window.toggleSongList = function(element) {
            $(element).toggleClass('active');
            $(element).next('.heading').slideToggle();
        };
    });

$(document).ready(function() {
    $('.info').click(function() {
        var songUrl = $(this).data('song-url');
        var songTitle = $(this).data('song-title');
        var songThumbnail = $(this).data('song-thumbnail');

        $('#music-source').attr('src', songUrl);
        $('#current-song-title').text(songTitle);
        $('#thumbnail').attr('src', songThumbnail);

        var musicPlayer = document.getElementById('music-player');
        musicPlayer.load();
        musicPlayer.play();
    });
});