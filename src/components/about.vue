<template>
	<div style="width: 100vw;height: 100vh;background: linear-gradient(#4cc2d7, #8590fd);color: white;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="关于作者" left-text="返回" left-arrow @click-left="$emit('closePage')" />

		<center>
			<div>
				<!-- <img src="../../static/aboutMe.jpg" style="width: 200px;margin-top: 20px;border-radius: 20px;"> -->
				<br>
				<h4>
					委托自北京红人学院晋城分院
				</h4>
				软件作者：郭锦洲<br>
				<span style="font-size: 12px;">Software author: Guo Jinzhou</span><br>
				<br>
				联系方式：<a href="tel:19133113349">19133113349</a>
				<br>
				版本：V5.0.0 Build01
			</div>
		</center>

	</div>
</template>

<script>
	export default {
		name: 'color',
		data() {
			return {}
		},
		computed: {
			formateSize() {
				return {
					width: screen.availWidth + 'px',
					height: screen.availHeight + 'px'
				}
			},
		},
	}
</script>

<style scoped>
</style>
