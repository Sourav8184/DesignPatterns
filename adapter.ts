interface AdvancedMediaPlayer {
  playVlc(fileName: string): void;
  playMp4(fileName: string): void;
}

class VlcPlayer implements AdvancedMediaPlayer {
  playVlc(fileName: string): void {
    console.log(`Playing vlc file: ${fileName}`);
  }

  playMp4(fileName: string): void {
    // Do nothing
  }
}

class Mp4Player implements AdvancedMediaPlayer {
  playVlc(fileName: string): void {
    // Do nothing
  }

  playMp4(fileName: string): void {
    console.log(`Playing mp4 file: ${fileName}`);
  }
}

interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}

class MediaAdapter implements MediaPlayer {
  private advancedPlayer: AdvancedMediaPlayer;

  constructor(audioType: string) {
    if (audioType === "vlc") {
      this.advancedPlayer = new VlcPlayer();
    } else if (audioType === "mp4") {
      this.advancedPlayer = new Mp4Player();
    } else {
      throw new Error("Unsupported format");
    }
  }

  play(audioType: string, fileName: string): void {
    if (audioType === "vlc") {
      this.advancedPlayer.playVlc(fileName);
    } else if (audioType === "mp4") {
      this.advancedPlayer.playMp4(fileName);
    }
  }
}

class AudioPlayer implements MediaPlayer {
  play(audioType: string, fileName: string): void {
    if (audioType === "mp3") {
      console.log(`Playing mp3 file: ${fileName}`);
    } else if (audioType === "vlc" || audioType === "mp4") {
      const adapter = new MediaAdapter(audioType);
      adapter.play(audioType, fileName);
    } else {
      console.log(
        "Invalid media format. Only mp3, mp4, and vlc are supported."
      );
    }
  }
}

const player = new AudioPlayer();

player.play("mp3", "song.mp3");
player.play("mp4", "video.mp4");
player.play("vlc", "movie.vlc");
player.play("avi", "weird.avi");
