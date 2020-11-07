import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import fate from '@/components/fate'
import color from '@/components/color'
import induction from '@/components/induction'
import about from '@/components/about'
import number from '@/components/number'
import EightDiagrams from '@/components/EightDiagrams'
import compass from '@/components/compass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/fate',
      name: 'fate',
      component: fate
    },
    {
      path: '/color',
      name: 'color',
      component: color
    },
		{
      path: '/induction',
      name: 'induction',
      component: induction
    },
	{
      path: '/about',
      name: 'about',
      component: about
    },
	{
      path: '/diagrams',
      name: 'diagrams',
      component: EightDiagrams
    },
	{
      path: '/number',
      name: 'number',
      component: number
    },
		{
      path: '/compass',
      name: 'compass',
      component: compass
    },
  ]
})
