<template>
  <div class="page has-navbar" v-nav="{ title: 'MusicDetail',showBackButton: true, onBackButtonClick: back }">
    <div class="ion-arrow-left-a">aaa</div>
    
    <div class="page-content text-center">
      <div class="MusicDetailContent">
        <div class="MusicDetailContent-img">
          <!-- 播放器特效 -->
          <canvas class="canvas canvas-pattern js-canvas" ></canvas>
          <canvas class="canvas js-duplicate" ></canvas>
          <!-- <img :src="MusicDetailImg" alt=""> -->
          <!-- 播放器进度条 -->
            <div class="progress-bar" style="display: flex;"    ref="progressBar" @click="touchSlider">
              <div class="progress-bar-left"  :style="{width:haveplayed+'px'}"  ref="progressBarLeft"></div>
              <div class="progress-bar-slider"  @mousemove="moveSlider" @mousedown="mouseDown" @mouseup="mouseUp"></div>
              <div class="progress-bar-right" :style="{width:willplay+'px'}" ref="progressBarRight"></div>
            </div>
          </div>
           <audio id ="playerInMusicDetail" loop="loop" src="http://sc1.111ttt.cn/2016/1/12/10/205102107353.mp3"  ref ="playerInMusicDetail" @timeupdate="updateTime" autoplay="true"></audio>
            <div class="playerbar" style="display: flex;" >
              <div class="ion-reply playerbar-perviou "></div>
              <div  :class="played?'ion-pause':'ion-play'" @click="playMusic"></div>
              <div class="ion-forward playerbar-next"></div>
            </div>
        </div>
      </div>
  </div>
</template>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script>
import store from '../vuex/store'
  export default {
    data () { 
      return {
        played:"true",
        haveplayed:'1',
        willplay:'199',
        persent:'0',
        isMouseDown:"false", 
        currentTime:''
      }
    },
    methods: {
      back() {
        let media = document.getElementById("playerInMusicDetail")
        store.commit('savePlayerState',media)
        $router.back('/')
      },
      playMusic(){
        let media = document.getElementById("playerInMusicDetail")
        if(media.paused) {  
        media.play();
        this.played = true;
        } 
        else {  
        media.pause();
        this.played = false;
        console.log(document.getElementsByClassName("ion-play"))
        document.getElementsByClassName("ion-play").className ="ion-pause"
        }  
      },
      //进度条随时间变化
      updateTime(e){
        //console.log(e.target.currentTime);
        let currentTime = e.target.currentTime;
        let duration = e.target.duration
        this.persent = 200*currentTime/duration;
        return this.persent;
      },
      //进度条事件
      touchSlider(e){
        e.preventDefault()
        //点击播放器中的进度条改变播放器播放进度
        let clickprocess = e.clientX-this.$refs.progressBarLeft.getBoundingClientRect().x;
        this.haveplayed = clickprocess;
        this.willplay = 200-clickprocess;
        //修改音频播放进度
        this.$refs.playerInMusicDetail.currentTime = (clickprocess/200)*this.$refs.playerInMusicDetail.duration;
        this.persent = clickprocess;
        
      },
      mouseDown(){
        this.isMouseDown = "true";
      },
      mouseUp(){
        this.isMouseDown = "false";
      },
      moveSlider(e){
        //移动播放器中的小滑块改变播放器播放进度
        e.preventDefault()
        //点击播放器中的进度条改变播放器播放进度
        if(isMouseDown){
        let moveprocess = e.clientX-this.$refs.progressBarLeft.getBoundingClientRect().x;
        this.haveplayed = moveprocess;
        this.willplay = 200-moveprocess;
        //修改音频播放进度
        this.$refs.playerInBottom.currentTime = (moveprocess/200)*this.$refs.playerInBottom.duration;
        this.persent = clickprocess;
        }
      },
      linkToMusicDetail(e){
        //router跳转时保存当前播放的音乐的状态
        let media = document.getElementById("playerInMusicDetail")
        store.commit('savePlayerState',media)
        //console.log(store.state.playercurrenttime)
      }
    },
    watch:{
      persent:function(val){
        this.haveplayed = this.persent;
        this.willplay = 200-this.persent;
        if(this.willplay < 10){
          let media = document.getElementById("playerInBottom")
          store.commit('playNextSong',media)
          let Nextplay= store.state.playerIndex
          media.src =store.state.musicList[Nextplay].musicSrc
        }
        //console.log(val+"sss")
      },
    },
    mounted:  function initMusicDetail() {
      //初始化播放链接
      let media = document.getElementById("playerInMusicDetail")
      let initplay= store.state.playerIndex
      media.src =store.state.musicList[initplay].musicSrc
      //修改当前播放器时间为跳转页面之前的时间
      media.currentTime = store.state.playercurrenttime
      console.log(store.state.playercurrenttime)
      //修改进度条
      //播放动画特效
      const canvas = document.querySelector('.js-canvas');
      const ctx = canvas.getContext('2d');

      const canvas2 = document.querySelector('.js-duplicate');
      const ctx2 = canvas2.getContext('2d');

      const dim = Math.min(window.innerWidth, window.innerHeight) * 0.7;
      const w = dim;
      const h = dim;
      const midX = w >> 1;
      const midY = h >> 1;

      const PI = Math.PI;
      const TO_RADIAN = PI / 180;

      const maxDepth = 5;
      const maxSpread = 90 * TO_RADIAN;

      let autoAnimate = true;
      let divergeAt = 0.5;
      let spread = 45 * TO_RADIAN;
      let tick = 0;

      let autoSpeed = 0.004;
      let autoTick = 0;

      canvas.width = canvas2.width = w;
      canvas.height = canvas2.height = h;

      class Branch {
        constructor(position = {x : 0, y: 0}, length = 100, divergeAt = 0.5, angle = 0, depth = 0, spread = 45 * TO_RADIAN) {
          this.position = position;
          this.length = length;
          this.divergeAt = divergeAt;
          this.angle = angle;
          this.depth = depth;

          this.color = '#000';
          this.spread = spread;
          this.branches = [];

          this.grow();
        }

        grow() {
          if (!this.canBranch) {
            return;
          }

          this.branches = [];

          const nextLength = this.length * 1.7;
          const nextDepth = this.depth + 1;

          this.branches.push(
            new Branch(
              this.growPosition,
              nextLength,
              this.divergeAt,
              this.angle + this.spread,
              nextDepth,
              this.spread
            ),
            new Branch(
              this.growPosition,
              nextLength,
              this.divergeAt,
              this.angle - this.spread,
              nextDepth,
              this.spread
            )
          );
        }

        update(spread, divergeAt) {
          this.spread = spread;
          this.divergeAt = divergeAt;

          this.grow();
        }

        get growPosition() {
          const dl = this.length * this.divergeAt;

          return {
            x: this.position.x + (Math.cos(this.angle) * dl),
            y: this.position.y + (Math.sin(this.angle) * dl),
          };
        }

        get canBranch() {
          return this.depth < maxDepth;
        }
      }

      const rootBranch = new Branch(
        { x: midX, y: midY },
        midY * 0.5,
        divergeAt,
        -90 * TO_RADIAN,
        0,
        spread
      );

      const drawBranch = (branch, phase) => {
        const h = ~~(200 + (160 * phase));
        const l = 50 + ~~(((branch.depth / (maxDepth + 1))) * 50);

        const endX = branch.length;
        const endY = 0;
        const r = 2;

        ctx.save();

        ctx.strokeStyle = `hsl(${h}, 100%, ${l}%)`;
        ctx.translate(branch.position.x, branch.position.y);
        ctx.rotate(branch.angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = `hsl(${h}, 100%, 50%)`;
        ctx.arc(endX, endY, r, 0, PI * 2, false);
        ctx.fill();
        ctx.closePath();

        ctx.restore();

        branch.branches.forEach((b) => {
          drawBranch(b, phase);
        });
      };

      const map = (value, start1, stop1, start2, stop2) => ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

      const clear = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
      };

      const loop = () => {
        let phase = rootBranch.spread / maxSpread;

        clear(phase);

        if (autoAnimate) {
          phase = map(Math.sin(autoTick), -1, 1, 0, 1);

          spread = phase * maxSpread;
          divergeAt = map(Math.sin(autoTick), -1, 1, 0, 0.5);

          autoTick += autoSpeed;
        }

        rootBranch.update(spread, divergeAt);

        drawBranch(rootBranch, phase);

        const numSegments = 12;
        const angleInc = PI * 2 / numSegments;
        let angle = tick;

        for (let i = 0; i < numSegments; i++) {
          ctx2.save();
          ctx2.translate(midX, midY);
          ctx2.rotate(angle);
          ctx2.drawImage(canvas, -w / 2, -h / 2);
          ctx2.restore();
          angle += angleInc;
        }

        tick += 0.002;

        requestAnimationFrame(loop);
      };

      const onPointerMove = (e) => {
        if (autoAnimate) {
          return;
        }

        const target = (e.touches && e.touches.length) ? e.touches[0] : e;
        const { clientX: x, clientY: y } = target;

        const width = window.innerWidth;
        const height = window.innerHeight;

        spread = (x / width) * maxSpread;
        divergeAt = y / height;
      };
      //加入点击改变特效
      document.body.addEventListener('mousemove', onPointerMove);
      document.body.addEventListener('touchmove', onPointerMove);

      document.addEventListener('mouseenter', () => {
        autoAnimate = false;
      });

      document.addEventListener('mouseleave', () => {
        autoAnimate = true;
      });

      loop();
    }
  }
</script>
<style>
  .MusicDetailContent-img{
    align-self:center;
    width: 80%;
    height: 500px;
  }
  html,body {
    margin:0;
    padding:0;
    overflow:hidden;
    background-color:#000000
  }
  body {
    height:100vh;
    /* display:flex; */
    align-items:center;
    justify-content:center;
  }
  .canvas {
    margin-left: 20%;
    display:block;
    border-radius:50%;
    width: 80%;
    height: auto;
  }
  .canvas-pattern {
    display:none;
  }
</style>

