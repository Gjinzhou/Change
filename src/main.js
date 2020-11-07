// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch, {name: 'v-touch'})
const F2 = require('@antv/f2');
window.F2 = F2;

import {
	Toast
} from 'vant';
Vue.use(Vant);
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})

// window.addEventListener("popstate", function(e) { 
//  		console.log(e)
// 			 e.preventDefault = true;
// 		 vm.$children[0].show = false;
// 		window.history.forward(1);
//      //window.location.href = '/#/';
// 		 //location.reload()
//    }, false); 
document.addEventListener('plusready', function(a) {
	var first = null;
	plus.key.addEventListener('backbutton', function() {
		//首次按键，提示‘再按一次退出应用’
		if (vm.$children[0].show) {
			vm.$children[0].show = false
		} else {
			if (!first) {
				first = new Date().getTime();
				Toast({
					duration: 1000,
					message: '再按一次退出应用',
					position: "bottom"
				})
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if (new Date().getTime() - first < 1000) {
					plus.runtime.quit();
				}
			}
		}
	}, false);
});
