<template>
	<div style="width: 100vw;height: 100vh;">
		<van-nav-bar title="九宫罗盘" left-text="返回" left-arrow @click-left="$emit('closePage')"/>
		
	</div>
</template>

<script>
	export default {
		name: 'about',
		data() {
			return {
			}
		},
	}
</script>

<style scoped>
</style>
