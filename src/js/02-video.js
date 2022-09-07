
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const PLAYER__KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
    localStorage.setItem(PLAYER__KEY, seconds);

}

const savedTime = Number(localStorage.getItem(PLAYER__KEY));

if (savedTime) {
    player.setCurrentTime(savedTime);
}
