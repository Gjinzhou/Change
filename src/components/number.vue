<template>
	<div style="width: 100vw;height: 100vh;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="号码分析" left-text="返回" left-arrow @click-left="$emit('closePage')"/>
		<center>
			<div class="yearBox" @click="showKeyBord = true">
				<span>{{getNumber[0] || ' '}}</span>
				<span>{{getNumber[1] || ' '}}</span>
				<span>{{getNumber[2] || ' '}}</span>
				<span>{{getNumber[3] || ' '}}</span>
				<span>{{getNumber[4] || ' '}}</span>
				<span>{{getNumber[5] || ' '}}</span>
				<span>{{getNumber[6] || ' '}}</span>
				<span>{{getNumber[7] || ' '}}</span>
				<span>{{getNumber[8] || ' '}}</span>
				<span>{{getNumber[9] || ' '}}</span>
				<span>{{getNumber[10] || ' '}}</span>
			</div>
		</center>
		<van-radio-group v-model="sexSelect">
			<van-cell-group style="display: flex;">
				<van-cell title="男" clickable @click="sexSelect='男';startAnalysis(true)" style="border-right: 1px solid #EEE;">
					<van-radio name="男" />
				</van-cell>
				<van-cell title="女" clickable @click="sexSelect='女';startAnalysis(true)">
					<van-radio name="女" />
				</van-cell>
			</van-cell-group>
		</van-radio-group>
		<div id="main" style="width: 375px;height:375px;margin-top: 60px;transform: scale(0.9);" ref="eChart"></div>
		<van-number-keyboard :show="showKeyBord" close-button-text="关闭" @input="onInput" @delete="onDelete"
		 @close="showKeyBord = !showKeyBord" />
	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	import echarts from 'echarts'

	export default {
		name: 'number',
		data() {
			return {
				sexSelect: "男",
				getYear: "",
				showKeyBord: true,
				getNumber: "",
			}
		},
		methods: {
			onInput(e) {
				if (this.getNumber.length == 11) {
					return
				}
				this.getNumber += e
				if (this.getNumber.length == 11) {
					this.startAnalysis();
				}
			},
			onDelete(e) {
				this.getNumber = ""
			},
			startAnalysis(key) {
				console.log("开始分析");
				if (!/^[1]\d{10}/.test(this.getNumber)) {
					if (!key) {
						Toast("号码输入有误")
					}
					return false;
				}
				this.showKeyBord = false
				var myChart = echarts.init(this.$refs.eChart);

				let tarNum = this.getNumber.replace(/[5]/g, this.sexSelect == "男" ? "2" : "8");
				let resArr = [0, 0, 0, 0, 0, 0, 0, 0]
				for (var i = 0; i < 10; i++) {
					if (tarNum[i] == "0" || tarNum[i + 1] == "0") {
						continue;
					}
					resArr[this.inductionCalc(tarNum[i] * 1, tarNum[i + 1] * 1)]++;
				}
				//this.inductionCalc()

				//标准配置
				let option = {
					title: {
						text: '号码分析',
						subtext: '仅提供简要分析'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						orient: 'vertical',
						x: 'right',
						y: 'bottom',
						data: ['分析结果']
					},
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: true
							},
						}
					},
					polar: [{
						indicator: [{
							text: '延年',
							max: 4,
						}, {
							text: '天乙',
							max: 4
						}, {
							text: '生气',
							max: 4
						}, {
							text: '辅弼',
							max: 4
						}, {
							text: '五鬼',
							max: 4,
						}, {
							text: '六煞',
							max: 4
						}, {
							text: '祸害',
							max: 4
						}, {
							text: '绝命',
							max: 4
						}, ]
					}],
					calculable: true,
					series: [{
						name: '分析',
						type: 'radar',
						data: [{
							value: resArr,
							name: '号码'
						}]
					}]
				};

				myChart.setOption(option);

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
						return "3";
					} else if (cha == 2) {
						return "2";
					} else if (cha == 1 && (calc[a] == 1 || calc[b] == 1 || calc[a] == 4 || calc[b] == 4)) {
						return "1";
					} else {
						return "0";
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
						return "7";
					} else if (cha == 2) {
						return "4";
					} else if (cha == 1 && (calc1[a] == 1 || calc2[b] == 1 || calc1[a] == 4 || calc2[b] == 4)) {
						return "6";
					} else {
						return "5";
					}
				}
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
	}
</script>

<style scoped="scoped">
	.yearBox {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.yearBox span {
		width: 20px;
		height: 40px;
		font-size: 20px;
		line-height: 50px;
		margin: 2px;
		border-bottom: 1px solid #CCCCCC;
	}
</style>
