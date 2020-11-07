<template>
	<div style="width: 100vw;height: 100vh;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="命格合婚" left-text="返回" left-arrow @click-left="$emit('closePage')"/>
		<center style="border-style: solid;border-width: 1px;margin: 10px 0;padding: 10px 0;transition: all linear 0.1s;"
		 :style="{'borderColor':showKeyBord == 'getBoyYear'?'#419dfb':'#EEE'}">
			男
			<div class="yearBox" @click="showKeyBord = 'getBoyYear'">
				<span>{{getBoyYear[0] || ' '}}</span>
				<span>{{getBoyYear[1] || ' '}}</span>
				<span>{{getBoyYear[2] || ' '}}</span>
				<span>{{getBoyYear[3] || ' '}}</span>
			</div>
		</center>
		<center style="border-style: solid;border-width: 1px;margin: 10px 0;padding: 10px 0;transition: all linear 0.1s;"
		 :style="{'borderColor':showKeyBord == 'getGirlYear'?'#ff4444':'#EEE'}">
			女
			<div class="yearBox" @click="showKeyBord = 'getGirlYear'">
				<span>{{getGirlYear[0] || ' '}}</span>
				<span>{{getGirlYear[1] || ' '}}</span>
				<span>{{getGirlYear[2] || ' '}}</span>
				<span>{{getGirlYear[3] || ' '}}</span>
			</div>
		</center>
		<center>
			{{showRes["婚类"]}}
		</center>
		<center>
			{{showRes["注释"]}}
			<br>
			<van-button round v-if="showRes['化解']" tag="div" type="danger" size="small" @click="showDef">化解方法</van-button>
		</center>

		<van-number-keyboard :show="showKeyBord != ''" close-button-text="关闭" @input="onInput" @delete="onDelete"
		 @close="showKeyBord = false" />
	</div>
</template>

<script>
	import echarts from 'echarts';
	import {
		Toast
	} from 'vant';
	import list from './inductionList.json';
	import {
		Dialog
	} from 'vant';

	export default {
		name: 'induction',
		data() {
			return {
				male: "",
				female: "",
				res: "",
				showRes: "",
				showKeyBord: "getBoyYear",
				getBoyYear: "",
				getGirlYear: "",
				fateList: {
					1: "坎",
					3: "震",
					4: "巽",
					9: "离",
					2: "坤",
					7: "兑",
					8: "艮",
					6: "乾",
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
		methods: {
			showDef() {
				let key
				for (key in this.showRes["化解"]) {
					if (key.indexOf(this.fateList[this.male]) != -1 && key.indexOf(this.fateList[this.female]) != -1) {
						break
					}
				}
				Dialog.alert({
					title: "男" + this.fateList[this.male] + "女" + this.fateList[this.female],
					message: this.showRes["化解"][key]
				}).then(() => {
					// on close
				});
			},
			onInput(e) {
				if (this[this.showKeyBord].length == 4) {
					return
				}
				this[this.showKeyBord] += e;
				if (this.getGirlYear.length == 4 && this.getBoyYear.length == 4) {
					this.male = this.resGatter("男", this.getBoyYear);
					console.log("男：", this.male)
					if (this.male) {
						this.female = this.resGatter("女", this.getGirlYear);
						console.log("女：", this.female)
						if (this.female) {
							this.res = this.inductionCalc(this.male, this.female)
							console.log(this.res)
							this.showRes = list[this.res];
						}
					}
				}else if(this.getGirlYear.length == 4){
					this.showKeyBord = 'getBoyYear'
				}else if(this.getBoyYear.length == 4){
					this.showKeyBord = 'getGirlYear'
				}
			},
			onDelete() {
				console.log("del")
				if (this[this.showKeyBord] == "") {
					this.getBoyYear = "";
					this.getGirlYear = "";
				}
				this[this.showKeyBord] = "";
				this.showRes = "";
				this.res = "";
			},
			resGatter(getSex, getYear) {
				getYear *= 1
				if (isNaN(getYear) || getYear > 2099 || getYear < 1900) {
					Toast(getSex + "方年份输入有误")
					return false;
				}
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
				} else if (calcResult == 0) {
					calcResult = 9;
				}
				return calcResult
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
				if (east[a] && east[b]) {
					var calc = east[a] ? east : west;
					var cha = calc[a] > calc[b] ? calc[a] - calc[b] : calc[b] - calc[a];
					if (cha == 0) {
						return "辅弼";
					} else if (cha == 2) {
						return "天乙";
					} else if (cha == 1 && (calc[a] == 1 || calc[b] == 1 || calc[a] == 4 || calc[b] == 4)) {
						return "生气";
					} else {
						return "延年";
					}
				} else if(west[a] && west[b]){
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
