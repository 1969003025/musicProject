<template>
<div class="yt">
	
	<div class="zuida">
		<!-- 头部 -->
		<div class="head">
			<div class="header">
			    <h3>悦听</h3>
				<el-input 
				    placeholder="输入歌曲或歌名"
					style="width: 15.625rem;height: 3.125rem;"
				    suffix-icon="el-icon-search"
				    v-model="query" @keyup.enter.native="getInput">
				  </el-input>
			</div>
		</div>
		<!-- 中间 -->
		<div class="center">
			<div class="left">
				<ul>
					<li v-for="item in musicList">
						<div style="display: flex;align-items: center;">
							<img class="image" src="../assets/bb.png" @click="playMusic(item.id)">
							<div class="size">{{item.name}}</div>
						</div>
						<img v-if="item.mvid!=0" @click=playMv(item.mvid) src="../assets/MV.png" style="width: 1.625rem;height: 1.625rem;margin-right: 0.2rem;">
					</li>
				</ul>
			</div>
			<div class="cen">
				<img ref="maxImg" class="cdImage" :class="showRotate?'show':''" src="../assets/cd.png">
				<div class="cdInfo">
					
					<img v-if="musicImg!=''"  class="meinv" :src="musicImg" >
					<img v-else class="meinv" src="../assets/OIP.jpg" >
				</div>
			</div>
			<div class="right">
				<div class="title">热门留言</div>
				<div class="right-text">
					<ul>
						<li v-for="item in contentList">	
							<img class="xiaotu" v-bind:src="item.user.avatarUrl" alt="">
							<div style="width: 6.875rem">
								<div class="username">{{item.user.nickname}}</div>
								<span style="color: #a5a5a5;">{{item.content}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<div style="width: 100%;height: 3.125rem;">
			<audio ref="audio" id="music" @play="palyAudio" @pause="pauseAudio" autoplay="autoplay" style="width: 100%;background: aliceblue;" controls="controls" v-bind:src="musicUrl"></audio>
		</div>
	</div>
	<el-dialog
	  class="dialog"
	  title="提示"
	  width="43.75rem"
	  :visible.sync="isShow"
	  :destroy-on-close="true"
	  center>
	  <div slot="title" class="video_style">
	    	<video id="video" class="video" :src="mvid"  controls="controls"></video>
	  </div>
	  </el-dialog>
</div>

</template>

<script>
import axios from 'axios'
var InterVal
var rotateVal = 0
	export default {
		data() {
			return {
				query:"周杰伦",
				musicList:[],
				musicUrl:"",
				musicImg:"",
				contentList:[],
				mvid:"",
				isShow: false,
				showRotate: false
			}
			
		},
		watch: {
			getMusic: {
				handler(newName, oldName) {
					console.log('>>>>>>>', newName)
				},
				immediate: true
			}
		},
		mounted() {
			this.getInput()
		},
		methods: {
			getInput(){
				const that = this
				const url = 'https://autumnfish.cn/search?keywords='+this.query
				axios.get(url).then((res) => {
					that.musicList = res.data.result.songs
					// console.log(res)
				})
			},
			playMusic(item){
				const that = this 
				axios.get("https://autumnfish.cn/song/url?id="+item).then(function(res){
					that.musicUrl = res.data.data[0].url
				})
				axios.get("https://autumnfish.cn/song/detail?ids="+item).then(function(res){
					// console.log(res)
					that.musicImg = res.data.songs[0].al.picUrl
				})
				axios.get("https://autumnfish.cn/comment/hot?type=0&id="+item).then(function(res){
					// console.log(res)
					that.contentList = res.data.hotComments
				})
			},
			playMv(mvid){
				const that = this
				that.getMusic()
				axios.get("https://autumnfish.cn/mv/url?id="+mvid).then(function(res){
					console.log(res)
					that.isShow = true
					that.mvid = res.data.data.url
					
				})
			},
			palyAudio() {
				if (this.musicUrl!=='') {
					this.showRotate = true
				}
			},
			pauseAudio() {
				if (this.musicUrl!=='') {
					this.showRotate = false
				}
			},
			rotate() {
				
			},
			getMusic() {
				var audio = document.getElementById('music')
				audio.pause()
			}
		
		}
	}
	
		
</script>

<style>
	li {
		list-style-type:none;
	}
	ul {margin:0; padding:0; text-align:left;}
	.yt {
		height: 37.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.zuida {
		width: 43.75rem;
		height: 28.125rem;
		/* background-color: #000066; */
		border-radius: 0.625rem;
		box-shadow: 2px 6px 8px 2px #ffc183;
	}
	.head {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		width: 100%;
		background-color: #7ceaff;
		/* background-color: rgba(0,0,0,.5); */
	}
	.header {
		display: flex;
		align-items: baseline;
		width: 96%;
		margin: 0 auto;
		justify-content: space-between;
	}
	/* 中间 */
	.center {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 20.9375rem;
		background-image: linear-gradient(135deg, #e4ffff , #ffa54a);
		/* background-color: pink; */
	}
	.left {
		height: 100%;
		width: 10.625rem;
		border-right: 1px solid #582e1b;
		/* background-color: #ff5500; */
		overflow: hidden;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	::-webkit-scrollbar {display:none}
	.right {
		border-left: 1px solid #582e1b;
		height: 100%;
		width: 10.625rem;
		/* background-color: #FFF000; */
		overflow: hidden;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.left ul li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 2.5rem;
		line-height: 2.5rem;
	}
	.image {
		margin-left: 0.625rem;
		width: 1.625rem;
		height: 1.625rem;
	}
	.size {
		font-size: 0.875rem;
		margin-left: 0.375rem;
		width: 5rem;
		height: 1.875rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		line-height: 1.875rem;
	}
	.cdImage {
		width: 15.625rem;
		height:  15.625rem;
		
	}
	.show {
		animation: rotate 3s linear infinite;
		transform: 0 0;
	}
	
	.cen {
		position: relative;
		display: flex;
		align-items: center;
	}
	.meinv {
		position: absolute;
		left: 50%; 
		top: 50%;
		margin-top: -3.6rem;    /* 高度的一半 */
		margin-left: -3.6rem;    /* 宽度的一半 */
		border-radius: 100%;
		width: 7.2rem;
		height: 7.2rem;
		animation: rotate 6s linear infinite;
		transform: 0 0;
	}
	@keyframes rotate{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	.title {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		display: flex;
		padding-top: 0.375rem;
		padding-left: 0.375rem;
	}
	.username {
		margin-top: 0.75rem;
		width: 6.875rem;
		height: 1.25rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
	}
	.xiaotu {
		margin-left: 0.4375rem;
		width: 2.8rem;
		height: 2.8rem;
		border-radius: 100%;
	}
	.right-text ul li {
		display: flex;
		justify-content: space-between;
	}
	/* 底部	 *//
	.bottom {
		
		background-color: greenyellow;
	}
	.video {
		width: 43.75rem;
		height: 25rem;
	}
	.video_style {
		position: absolute;
	}
	.dialog .el-dialog__header {
	    padding: 0;
	}
	
	.dialog .el-dialog__body {
	    padding: 0;
	}
	.header .el-input__inner {
		background: rgba(205,244,255,.5);
		border:none;
	}
	
</style>
