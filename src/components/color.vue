<template>
	<div style="width: 100vw;height: 100vh;">
		<div style="height: 35px;background: white;width: 100%;"></div>
		<van-nav-bar title="五行与穿衣" left-text="返回" left-arrow @click-left="$emit('closePage')"/>
		<div class="result">
			<center class="head">
				<!-- {{selectDate | formatDate}},今日为{{dayPost}}日,{{theFiveElements[0]+"属"+theFiveElements[1]}} -->
			</center>
			<van-swipe indicator-color="white" :loop="false" :initial-swipe	="9">
			  <van-swipe-item v-for="item in 21" :key="item">
				<color-item :dateVal="new Date(new Date().getTime()+((item-10)*86400000))"></color-item>>
			  </van-swipe-item>
			</van-swipe>
		</div>
	</div>
</template>

<script>
	import colorList from './colorList.vue';
	import colorItem from './colorItem.vue';
	
	export default {
		name: 'color',
		data() {
			return {
				dayPost:"",
				colorList: colorList,
				theFiveElementsKey: '金',
				selectDate: "",
				theFiveElements: ""
			}
		},
		components:{
			colorItem
		},
		mounted() {
			this.selectDate = new Date()
			this.calcColor(this.selectDate)
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
			changeDate() {
				console.log(this.selectDate);
				this.calcColor(this.selectDate)
			},
			calcColor(nowTime) {
				var theFiveElements
				var nowDate = new Date(nowTime);
				var nowDay = nowDate.getDate();
				var mont = nowDate.getMonth();
				var s = nowDate.getFullYear() + "";
				s = s.slice(2);
				mont = mont - 2
				if (mont < 0) {
					mont += 12;
					s -= 1;
				}
				var mArr = [0, 31, 1, 32, 2, 33, 4, 34, 5, 35, 6, 37];
				var u = s % 4;
				var r = parseInt(s / 4) * 6 + 5 * (parseInt(s / 4) * 3 + u) + mArr[mont] + nowDay - 6;
				var daypost = r % 60;
				var daypostArr = ["癸亥", "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉", "甲戌", "乙亥", "丙子", "丁丑", "戊寅",
					"己卯", "庚辰", "辛巳", "壬午", "癸未", "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未", "丙申", "丁酉",
					"戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑", "甲寅", "乙卯", "丙辰",
					"丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌"
				]
				this.dayPost = daypostArr[daypost]
				var myKey = daypostArr[daypost].slice(1)
				theFiveElements = ["子水", "丑土", "寅木", "卯木", "辰土", "巳火", "午火", "未土", "申金", "酉金", "戌土", "亥水"];
				for (var i = 0; i < theFiveElements.length; i++) {
					if (theFiveElements[i].indexOf(myKey) != -1) {
						var theFiveElementsKey = theFiveElements[i].slice(1);
						break
					}
				};
				console.log(theFiveElements[i]);
				console.log(theFiveElementsKey);
				this.theFiveElements = theFiveElements[i]
				this.theFiveElementsKey = theFiveElementsKey
			},
			formatDate(value) {
				let temp = value;
				return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
			}
		},
		filters: {
			formatDate(value) {
				let temp = new Date(value);
				return temp.getFullYear() + '年' + (temp.getMonth() + 1) + '月' + temp.getDate() + '日';
			}
		}
	}
</script>

<style scoped>
	.text {
		-webkit-writing-mode: vertical-rl;
		/*horizontal-tb:水平方向自上而下的书写*/
		/*vertical-rl：垂直方向 自右而左方向书写*/
		/*vertical-lr：垂直方向 自左而右方向书写*/
		writing-mode: vertical-rl;
		writing-mode: tb-rl;
		/*ie下的写法  t-上b-下r-右l-左 ,可以自由组合    bt-rl,lr-tb*/
		/* font-size: 14px; */
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.head{
		font-size: 14px;
	}
	/* .dateSelecter {
		width: 50px;
		background: white;
	} */

	.result {
		width: 300px;
		margin-left: 50%;
		transform: translateX(-50%);
		/* transform: rotate(90deg); */
		/* margin-top: 120px; */
	}
</style>
