<template>
	<div style="width: 100vw;height: 100vh;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="三元命计算" left-text="返回" :right-text="showRes?'查看流年':''" left-arrow @click-left="$emit('closePage')" @click-right="openFleetingTime"/>
		<center>
			<div class="yearBox" @click="showKeyBord = true">
				<span>{{getYear[0] || ' '}}</span>
				<span>{{getYear[1] || ' '}}</span>
				<span>{{getYear[2] || ' '}}</span>
				<span>{{getYear[3] || ' '}}</span>
			</div>
		</center>
		<van-radio-group v-model="sexSelect">
			<van-cell-group style="display: flex;">
				<van-cell title="男" clickable @click="sexSelect='男'" style="border-right: 1px solid #EEE;">
					<van-radio name="男" />
				</van-cell>
				<van-cell title="女" clickable @click="sexSelect='女'">
					<van-radio name="女" />
				</van-cell>
			</van-cell-group>
		</van-radio-group>

		<van-steps direction="vertical" :active="2" :active-color="sexSelect=='女'?'#ff4444':'#1989fa'" v-if="showRes">
			<van-step class="resCell">
				<h3>
					{{getYear*1 -2}}
					<span>{{resGatter(sexSelect, getYear*1 -2)}}</span>
				</h3>
			</van-step>
			<van-step class="resCell">
				<h3>
					{{getYear*1 -1}}
					<span>{{resGatter(sexSelect, getYear*1 -1)}}</span>
				</h3>
			</van-step>
			<van-step class="resCell">
				<h3>
					{{getYear*1}}
					<span>{{resGatter(sexSelect, getYear*1)}}</span>
				</h3>
			</van-step>
			<van-step class="resCell">
				<h3>
					{{getYear*1 +1}}
					<span>{{resGatter(sexSelect, getYear*1 +1)}}</span>
				</h3>
			</van-step>
			<van-step class="resCell">
				<h3>
					{{getYear*1 +2}}
					<span>{{resGatter(sexSelect, getYear*1 +2)}}</span>
				</h3>
			</van-step>
			<van-step class="resCell">
				<h3>
					{{getYear*1 +3}}
					<span>{{resGatter(sexSelect, getYear*1 +3)}}</span>
				</h3>
			</van-step>
			<van-step class="resCell">
				<h3>
					{{getYear*1 +4}}
					<span>{{resGatter(sexSelect, getYear*1 +4)}}</span>
				</h3>
			</van-step>
		</van-steps>
		<van-number-keyboard :show="showKeyBord" close-button-text="关闭" @input="onInput" @delete="onDelete" @close="showKeyBord = !showKeyBord" />
		<van-popup v-model="showRecently" position="bottom">
			<center>
				<div id="main" style="width: 375px;height:300px;margin-top: 20px;transform: scale(0.9);" ref="eChart"></div>
			</center>
		</van-popup>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import { Toast } from 'vant';
	
	export default {
		name: 'fate',
		data() {
			return {
				showKeyBord:true,
				showRecently: false,
				getYear: '',
				sexSelect: '男',
				showRes: 0
			}
		},
		computed: {
			formateSize() {
				return {
					width: screen.availWidth + 'px',
					height: screen.availHeight + 'px'
				}
			},
		},
		mounted() {
			try{
				plus.key.addEventListener('backbutton', ()=>{
					if(this.showRecently){
						this.showRecently = false;
					}else{
						this.$emit('closePage');
					}
				}, false);
			}catch(e){
				console.log("运行环境不为安卓")
			}
		},
		methods: {
			openFleetingTime() {
				this.showRecently = !this.showRecently
				console.log(this.$refs);
				let self = this;
				setTimeout(() => {
					var myChart = echarts.init(self.$refs.eChart);

					let yearArr = [];
					let fateArr = [];
					for (let i = 0; i < 7; i++) {
						let tarYear = new Date().getFullYear() * 1 + (4 - i);
						if (tarYear == new Date().getFullYear()) {
							let param = {
								value: tarYear,
								textStyle: {
									fontSize: 20,
									color: 'red'
								}
							}
							yearArr.unshift(param);
						}else{
							yearArr.unshift(tarYear);
						}
						//fateArr.push(this.resGatter(this.sexSelect, this.getYear*1 +( 4-i)))
						let res = this.inductionCalc(this.resGatter(this.sexSelect, tarYear), this.resGatter(this.sexSelect, this.getYear))
						fateArr.unshift(res)
					}

					let option = {
						title: {
							text: '近年流年变化',
							subtext: '仅供参考'
						},
						tooltip: {
							trigger: 'axis',
							formatter: '{b0} {c0}'
						},
						legend: {
							data: ['流年']
						},
						toolbox: {
							show: false,
							feature: {
								magicType: {
									show: true,
									type: ['line', 'bar']
								}
							}
						},
						calculable: true,
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: yearArr
						}],
						yAxis: [{
							data: ['绝命', '祸害', '六煞', '五鬼', '辅弼', '生气', '天乙', '延年']
						}],
						series: [{
							name: '流年',
							type: 'line',
							data: fateArr,
							markPoint: {
								symbolSize:40,
								data: [{
										type: 'max',
										name: '最佳',
									},
									{
										type: 'min',
										name: '最差'
									}
								]
							},
							markLine: {
								data: [{
									type: 'average',
									name: '平均值'
								}]
							},
							itemStyle : { normal: {label : {show: true}}}
						}]
					};
					console.log(option)
					myChart.setOption(option);
				}, 10)
			},
			inductionCalc(a, b) {
				var east = {
					"坎水一": 1,
					"震木三": 2,
					"巽木四": 3,
					"离火九": 4
				};
				var west = {
					"坤土二": 1,
					"兑金七": 2,
					"艮土八": 3,
					"乾金六": 4
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
			},
			onInput(e) {
				if (this.getYear.length == 4) {
					return
				}
				this.getYear += e
				if (this.getYear.length == 4) {
					this.startCalc();
				}
			},
			onDelete() {
				this.getYear = '';
				this.showRes = 0
			},
			startCalc() {
				let getYear = this.getYear * 1
				if (isNaN(getYear) || getYear > 2099 || getYear < 1900) {
					Toast("年份输入有误")
					return false;
				}
				this.showRes = 1
			},
			resGatter(getSex, getYear) {
				if (getSex == "男") {
					if (getYear < 2000) {
						var calcResult = (2000 - getYear) % 9;
					} else {
						var calcResult = (2099 - getYear) % 9;
					}
				} else {
					if (getYear < 2000) {
						var calcResult = (getYear - 1900 + 5) % 9;
					} else {
						var calcResult = (getYear - 2000 + 6) % 9;
					}
				}
				if (calcResult == 5 && getSex == "男") {
					calcResult = 2;
				} else if (calcResult == 5 && getSex == "女") {
					calcResult = 8;
				}
				switch (calcResult) {
					case 0:
						var fate = "离火九"
						break;
					case 1:
						var fate = "坎水一"
						break;
					case 2:
						var fate = "坤土二"
						break;
					case 3:
						var fate = "震木三"
						break;
					case 4:
						var fate = "巽木四"
						break;
					case 6:
						var fate = "乾金六"
						break;
					case 7:
						var fate = "兑金七"
						break;
					case 8:
						var fate = "艮土八"
						break;
				}
				return fate
			},
		}
	}
</script>

<style scoped>
	.resCell {
		height: 30px;
	}

	.resCell h3 {
		display: flex;
		font-weight: 400;
	}

	.resCell h3 span {
		flex-grow: 1;
		text-align: right;
	}

	.yearBox {
		display: flex;
		justify-content: center;
	}

	.yearBox span {
		width: 50px;
		height: 50px;
		font-size: 30px;
		line-height: 50px;
		margin: 10px;
		border: 1px solid #CCCCCC;
	}
</style>
