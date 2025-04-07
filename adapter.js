"use strict";
class VlcPlayer {
    playVlc(fileName) {
        console.log(`Playing vlc file: ${fileName}`);
    }
    playMp4(fileName) {
        // Do nothing
    }
}
class Mp4Player {
    playVlc(fileName) {
        // Do nothing
    }
    playMp4(fileName) {
        console.log(`Playing mp4 file: ${fileName}`);
    }
}
class MediaAdapter {
    constructor(audioType) {
        if (audioType === "vlc") {
            this.advancedPlayer = new VlcPlayer();
        }
        else if (audioType === "mp4") {
            this.advancedPlayer = new Mp4Player();
        }
        else {
            throw new Error("Unsupported format");
        }
    }
    play(audioType, fileName) {
        if (audioType === "vlc") {
            this.advancedPlayer.playVlc(fileName);
        }
        else if (audioType === "mp4") {
            this.advancedPlayer.playMp4(fileName);
        }
    }
}
class AudioPlayer {
    play(audioType, fileName) {
        if (audioType === "mp3") {
            console.log(`Playing mp3 file: ${fileName}`);
        }
        else if (audioType === "vlc" || audioType === "mp4") {
            const adapter = new MediaAdapter(audioType);
            adapter.play(audioType, fileName);
        }
        else {
            console.log("Invalid media format. Only mp3, mp4, and vlc are supported.");
        }
    }
}
const player = new AudioPlayer();
player.play("mp3", "song.mp3");
player.play("mp4", "video.mp4");
player.play("vlc", "movie.vlc");
player.play("avi", "weird.avi");
