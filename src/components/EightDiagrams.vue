<template>
	<div style="width: 100vw;height: 100vh;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="卦象感应" left-text="返回" left-arrow @click-left="$emit('closePage')"/>
		<div style="display: flex;justify-content: center;align-items: center;margin-top: 50px;border: 1px solid #CCC;">
			<van-picker style="flex-grow: 1;" :columns="HexagramList" @change="onChangeA" />
			<div>——</div>
			<van-picker style="flex-grow: 1;" :columns="HexagramList" @change="onChangeB" />
		</div>
		<center style="line-height: 70px;font-size: 25px;background: #EEE;border-bottom: 1px solid #CCC;" :style="{color:colorMap[result]}">
			[ {{result}} ]
		</center>
	</div>
</template>

<script>
	export default {
		name: 'induction',
		data() {
			return {
				currentRate:0,
				result:'辅弼',
				ChangeA:1,
				ChangeB:1,
				HexagramList: [{
						text: '坎水一',
						value: 1
					},
					{
						text: '坤土二',
						value: 2
					},
					{
						text: '震木三',
						value: 3
					},
					{
						text: '巽木四',
						value: 4
					},
					{
						text: '乾金六',
						value: 6
					},
					{
						text: '兑金七',
						value: 7
					},
					{
						text: '艮土八',
						value: 8
					},
					{
						text: '离火九',
						value: 9
					}
				],
				colorMap:{
					"五鬼":"red",
					"六煞":"red",
					"祸害":"red",
					"绝命":"red",
					"天乙":"green",
					"延年":"green",
					"辅弼":"green",
					"生气":"green",
				}
			}
		},
		computed: {
			formateSize(){
				return {
					width:screen.availWidth+'px',
					height:screen.availHeight+'px'
				}
			},
		},
		methods: {
			onChangeA(e, i) {
				this.ChangeA = i.value
				this.result = this.inductionCalc(this.ChangeA,this.ChangeB)
			},
			onChangeB(e, i) {
				this.ChangeB = i.value
				this.result = this.inductionCalc(this.ChangeA,this.ChangeB)
			},
			inductionCalc(a, b) {
				var east = {
					1: 1,
					3: 2,
					4: 3,
					9: 4
				};
				var west = {
					2: 1,
					7: 2,
					8: 3,
					6: 4
				}
				//判断是否同宫位
				if ((east[a] && east[b]) || (west[a] && west[b])) {
					var calc = east[a] ? east : west;
					var cha = calc[a] > calc[b] ? calc[a] - calc[b] : calc[b] - calc[a];
					if (cha == 0) {
						return "辅弼";
					} else if (cha == 2) {
						return "生气";
					} else if (cha == 1 && (calc[a] == 1 || calc[b] == 1 || calc[a] == 4 || calc[b] == 4)) {
						return "天乙";
					} else {
						return "延年";
					}
				} else {
					var calc1; //与a绑定
					var calc2; //与b绑定
					if (east[a]) {
						calc1 = east;
						calc2 = west;
					} else {
						calc1 = west;
						calc2 = east;
					}
					//判断绝命;
					var cha = calc1[a] > calc2[b] ? (calc1[a] - calc2[b]) : (calc2[b] - calc1[a]);
					if (cha == 0) {
						return "绝命";
					} else if (cha == 2) {
						return "五鬼";
					} else if (cha == 1 && (calc1[a] == 1 || calc2[b] == 1 || calc1[a] == 4 || calc2[b] == 4)) {
						return "祸害";
					} else {
						return "六煞";
					}
				}
			}
		},
	}
</script>

<style scoped="scoped">
</style>
