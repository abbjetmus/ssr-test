import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({
    baseURL: 'https://lagjobb.se'
})

Vue.prototype.$api = api

export { api, axios }