# audio-player
### 控制进度
1、loadedmetadata 音视频元数据加载完成后触发，拿到duration

2、timeupdate 播放位置发生改变，拿到currentTime 

3、通过改变playStatus控制播放状态

联动行为：播放按钮，播放杆，光碟转动
```js
playStatusChange() {
    let val = this.playStatus;
    if (val) {
        zybPlayButton.src = zybPlayButton.dataset.src1;
        zybSticke.src = zybSticke.dataset.src1;
        this.audio.play();
        zybPlatWrap.classList.remove('pause');
    } else {
        zybPlayButton.src = zybPlayButton.dataset.src2;
        zybSticke.src = zybSticke.dataset.src2;
        this.audio.pause();
        zybPlatWrap.classList.add('pause');
    }
}
```
4、通过改变currentTime控制播放进度，三种渠道：
1. range的input事件
2. 左右按钮增加15s或减少15s
3. 音频正常播放

联动行为：range进度及背景，音频currentTime，播放时间

边界处理：为0%播放，为100%暂停，0%~100%播放，
```js
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
```

### 移动端
1、点击出现蓝色透明背景
```css
* {
  -webkit-tap-highlight-color: transparent;
}
```
2、禁止用户选中
```css
::selection{
    user-select: none;
}
```
### css相关
1、动画：animation-play-state 控制转动，可选true、false

2、进度条样式重置
```css
input[type="range"]:focus {
  outline: none;
}
input[type="range"] {
  -webkit-appearance: none;
  margin: 0 10px;
  vertical-align: 4px;
  width: 65%;
  height: 2px;
  background: linear-gradient(#fff, #fff) no-repeat rgb(255, 255, 255, 0.3);
  background-size: 0% 100%;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  border-radius: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  margin-top: -5px;
  cursor: pointer;
}
```

可能会出现的问题：
1. 自动播放失败

可以优化的地方：
1. 预加载
