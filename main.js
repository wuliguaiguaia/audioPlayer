/* 
* 相关DOM id
* sticke 
* platWrap
* pic
* currentTime
* range
* duration
* backward
* playBtn
* forward
*/
class Music {
    constructor() {
        this.playStatus = true;
        this.currentTime = 0;
        this.duration = 0;
        this.timeSkip = 15;
        this.timer = null;
        this.audio = new Audio();
        Object.assign(this, this.getAudioData());
        this.init();
    }

    init() {
        this.initStyle();
        document.title = "";
        document.title = this.title;
        this.audio.src = this.src;
        // this.audio.autoplay = 'autoplay';
        this.enSent = this.enSent.slice(0, 50);
        zybEnsent.innerText = this.enSent;

        let zhSent = '';
        for (let i = 0; i < this.zhSent.length; i++) {
            i !== 0 && i % 22 === 0 ? zhSent += this.zhSent[i] + '<br/>' : zhSent += this.zhSent[i];
        }
        zybZhsent.innerHTML = zhSent;
        zybPic.src = this.pic;
        zybMask.style.backgroundImage = `url(${this.pic})`;
        this.bindEvents();
    }

    getAudioData() {
        return {
            title: "初二英语尖端班第1讲",
            src: "./music.mp3",
            enSent: 'Lorem ipsum do lor sit, amet consectetur adipisicing elit. Repudiandae quia?',
            zhSent: '今日事，今日毕，出自行车自行车！出自行车自行车自行车创造性存在小从中选出',
            pic: './pics/bg.png'
        }
    }

    bindEvents() {
        this.audio.addEventListener('loadedmetadata', _ => {
            this.duration = this.audio.duration
            zybDuration.innerText = this.converTime(this.duration);
            zybRange.setAttribute('max', ~~(this.duration));
        })

        this.audio.addEventListener('timeupdate', _ => {
            this.currentTime = this.audio.currentTime;
            this.currentTimeChange();
        })

        this.audio.addEventListener('play', _ => {
            this.playStatus = true;
            this.playStatusChange();
        })

        this.audio.addEventListener('pause', _ => {
            this.playStatus = false
            this.playStatusChange();
        })

        zybPlayButton.addEventListener('click', _ => {
            this.playStatus = !this.playStatus;
            this.playStatusChange();
        })

        zybRange.addEventListener('input', e => {
            this.currentTime = e.target.value;
            this.currentTimeChange();
            this.audio.currentTime = this.currentTime;
            if (!this.playStatus) {
                this.audio.play()
            }
        })

        zybBackward.addEventListener('click', _ => {
            this.currentTime -= this.timeSkip;
            this.currentTimeChange();
            this.audio.currentTime = this.currentTime;
            if (!this.playStatus) {
                this.audio.play()
            }
        })

        zybForward.addEventListener('click', _ => {
            this.currentTime += this.timeSkip;
            this.currentTimeChange();
            this.audio.currentTime = this.currentTime;
            if (!this.playStatus && this.currentTime < this.duration) {
                this.audio.play()
            }

        })
    }
    initStyle() {
        zybWrap.style.width = screen.width + 'px';
        zybWrap.style.height = screen.height + 'px';

    }

    playStatusChange() {
        let val = this.playStatus;
        let deg = +zybPlatWrap.style.transform.slice(7, -4);
        if (val) {
            zybPlayButton.src = zybPlayButton.dataset.src1;
            zybSticke.src = zybSticke.dataset.src1;
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(_ => {
                deg += 360 / 20000 * 5;
                console.log(deg);
                zybPlatWrap.style.transform = `rotate(${deg}deg)`;
            }, 5);
            this.audio.play();
        } else {
            zybPlayButton.src = zybPlayButton.dataset.src2;
            zybSticke.src = zybSticke.dataset.src2;
            this.audio.pause();
            clearInterval(this.timer);
        }
    }

    currentTimeChange() {
        let val = this.currentTime;
        if (val >= this.duration) {
            val = this.duration;
            this.audio.pause();
        } else if (val <= 0) {
            val = 0;
        }
        this.currentTime = val;
        zybCurrentTime.innerText = this.converTime(val);
        zybRange.style.backgroundSize = `${val / this.duration * 100}% 100%`;
        zybRange.value = val;
    }

    converTime(t) {
        let minutes = ~~(t / 60);
        minutes = (Array(2).join(0) + minutes).slice(-2);
        let seconds = Math.round(t % 60);
        seconds = (Array(2).join(0) + seconds).slice(-2);
        return `${minutes}:${seconds}`;
    }
}
new Music();