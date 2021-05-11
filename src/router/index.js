import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/farmers',
    name: 'farmers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Farmer/Farmers.vue')
  },
  {
    path: '/add-farmer',
    name: 'add-farmer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Farmer/AddFarmer.vue')
  },
  {
    path: '/farmer/:farmer_id',
    name: 'farmer',
    component: () => import('../views/Farmer/FarmerDetails')
  },
  {
    path: '/farmer-farms/:farmer_id',
    name: 'farmer-farms',
    component: () => import('../views/Farm/Farms')
  },
  {
    path: '/farms',
    name: 'farms',
    component: () => import('../views/Farm/Farms')
  },
  {
    path: '/agreement/:farmer_id',
    name: 'agreement',
    component: ()=> import('../views/Farmer/Agreement')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
