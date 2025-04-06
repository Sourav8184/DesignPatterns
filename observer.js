"use strict";
class UserSubscriber {
    constructor(name) {
        this.name = name;
    }
    update(videoTitle) {
        console.log(`🔔 ${this.name} got notified: New video "${videoTitle}" uploaded!`);
    }
}
class YoutubeChannel {
    constructor(channelName) {
        this.subscriber = [];
        this.name = channelName;
    }
    addSubscriber(subscriber) {
        this.subscriber.push(subscriber);
    }
    removeSubscriber(subscriber) {
        this.subscriber = this.subscriber.filter((sub) => sub !== subscriber);
    }
    videoUpload(title) {
        console.log(`📺 ${this.name} uploaded: "${title}"`);
        this.subscriber.map((subscriber) => {
            subscriber.update(title);
        });
    }
}
const YtChannel1 = new YoutubeChannel("codeWithMe");
const subscriber1 = new UserSubscriber("A");
const subscriber2 = new UserSubscriber("B");
const subscriber3 = new UserSubscriber("C");
YtChannel1.addSubscriber(subscriber1);
YtChannel1.addSubscriber(subscriber2);
YtChannel1.addSubscriber(subscriber3);
YtChannel1.videoUpload("ReactJs");
YtChannel1.removeSubscriber(subscriber2);
YtChannel1.videoUpload("Angular");
const YtChannel2 = new YoutubeChannel("Adarsh Jha [ NIT Kurukshetra ]");
const subscriber4 = new UserSubscriber("D");
const subscriber5 = new UserSubscriber("E");
YtChannel2.addSubscriber(subscriber4);
YtChannel2.addSubscriber(subscriber5);
YtChannel2.videoUpload("NodeJs");
YtChannel2.removeSubscriber(subscriber4);
YtChannel2.videoUpload("ExpressJs");
