<template>
	<div style="width: 100vw;height: 100vh;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="九宫罗盘" left-text="返回" left-arrow @click-left="$emit('closePage')"/>
		<div style="height:40px;"></div>
		<img src="./compass.jpg" style="width: 100vw;" :style="{transform: 'rotate(-'+Math.round(540 - alpha)+'deg)'}">
		<center style="margin-top:70px;">
			指南针<br><van-switch v-model="compass" />
		</center>
	</div>
</template>

<script>
	export default {
		name: 'about',
		data() {
			return {
				alpha:"",
				compass:true
			}
		},watch: {
			compass(flag) {
				if(flag){
					ondeviceorientationabsolute = (event)=>{
						this.alpha = parseInt(event.alpha)
					}
				}else{
					this.alpha = 180;
					ondeviceorientationabsolute = null;
				}
			}
		},
		created() {
			ondeviceorientationabsolute = (event)=>{
				this.alpha = parseInt(event.alpha)
			}
		},
		beforeDestroy() {
			this.compass = false;
		}
	}
</script>

<style scoped>
</style>
