<template>
	<div id="app" style="width: 100vw;height: 100vh;">
		<center>
			<div style="height: 65px;"></div>
			<div class="" style="margin-bottom: 40px;" @click="egg">
				<img src="../static/logo_home.png" style="width: 50%;">
			</div>
			<div class="functionList" :style="{margin:smallScrn?'10px 0px':'30px 0px'}">
				<van-button plain type="default" class="navBtn" @click="homeNav('三元')">命格简算</van-button>
			</div>
			<div class="functionList" :style="{margin:smallScrn?'10px 0px':'30px 0px'}">
				<van-button plain type="default" class="navBtn" @click="homeNav('穿衣')">五行颜色</van-button>
			</div>
			<div class="functionList" :style="{margin:smallScrn?'10px 0px':'30px 0px'}">
				<van-button plain type="default" class="navBtn" @click="homeNav('感应')">命格合婚</van-button>
			</div>
			<div class="functionList" :style="{margin:smallScrn?'10px 0px':'30px 0px'}">
				<van-button plain type="default" class="navBtn" @click="homeNav('号码')">号码分析</van-button>
			</div>
			<div class="functionList" :style="{margin:smallScrn?'10px 0px':'30px 0px'}">
				<van-button plain type="default" class="navBtn" @click="homeNav('卦象')">卦象感应</van-button>
			</div>
			<div class="functionList" :style="{margin:smallScrn?'10px 0px':'30px 0px'}">
				<van-button plain type="default" class="navBtn" @click="homeNav('罗盘')">九宫罗盘</van-button>
			</div>
		</center>
		<van-popup v-model="show" position="right" style="overflow-y: hidden;">
			<router-view @closePage="closePage"></router-view>
		</van-popup>
		<van-dialog v-model="showInput" style="text-align: center;" title="请复制以下数字联系作者索取秘钥"
		 show-cancel-button @confirm="save()">
			<h3>{{changeKey}}</h3>
			<van-field v-model="changePass"  style="border: 1px solid #00ABEB;" type="textarea" placeholder="请粘贴作者提供的秘钥" rows="3" autosize/>
		</van-dialog>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				smallScrn:false,
				eggCount: 0,
				key: 1,
				show: false,
				showInput:false,
				changeKey:"",
				changePass:"",
			}
		},
		created(){
			if(screen.availHeight < 650){
				this.smallScrn = true
			}
			if(!localStorage.changeKey){
				var str = "";
				for (var i = 0; i < 10; i++) {
					str+=parseInt(Math.random()*10)
				}
				localStorage.changeKey = str
			}
			this.changeKey = localStorage.changeKey
		},
		computed: {
			formateSize() {
				return {
					width: screen.availWidth + 'px',
					height: screen.availHeight + 'px'
				}
			},
		},
		methods: {
			egg() {
				this.homeNav('关于');
				// let message
				// this.eggCount++
				// if(this.eggCount > 15){
				// 	return
				// } else if (this.eggCount > 10) {
				// 	message = '别点了>-<'
				// } else if (this.eggCount > 5) {
				// 	message = '你很无聊吗？(⊙o⊙)'
				// } else {
				// 	message = '~o( =∩ω∩= )m喵'
				// }
				// Toast({
				// 	duration: 1000,
				// 	message:message ,
				// 	position: "bottom"
				// });
			},
			homeNav(flag) {
				// if(!this.verificationPass(localStorage.changePass)){
				// 	this.showInput = true;
				// 	return false;
				// }
				this.show = !this.show
				console.log(flag);
				let param = {
					path: ''
				}
				switch (flag) {
					case '三元':
						param.path = '/fate'
						break;
					case '穿衣':
						param.path = '/color'
						break;
					case '感应':
						param.path = '/induction'
						break;
					case '关于':
						param.path = '/about'
						break;
					case '号码':
						param.path = '/number'
						break;
					case '卦象':
						param.path = '/diagrams'
						break;
					case '罗盘':
						param.path = '/compass'
						break;
					default:
						console.warn('错误')
						break;
				}
					this.$router.push(param);
			},
			closePage() {
				this.show = false
			},
			verificationPass(pass){
				try{
					var temp = atob(pass);
					if(temp==localStorage.changeKey){
						return true
					}
				}catch(e){
					return false
				}
			},
			save(){
				localStorage.changePass = this.changePass
			}
		},
	}
</script>

<style scoped="scoped">
	.functionList {
		margin: 30px 0px;
	}

	#app {
		background: linear-gradient(#4cc2d7, #8590fd);
	}

	.navBtn {
		width: 70%;
		border-radius: 5px;
		border: 1px solid white;
		color: white;
		background: rgba(255, 255, 255, 0.1);
	}
</style>
