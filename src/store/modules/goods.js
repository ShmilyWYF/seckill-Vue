import { fetchSeckillGoods, goodsList } from '@/api/article'
import store from '@/store'
import { error } from 'autoprefixer/lib/utils'

const state = {
  goodsList: [],
  seckillgoods: []
}

const mutations = {
  SET_LIST: (state, newList) => {
    state.goodsList = newList
  },
  SET_SECKILL_GOODS: (state, newDATA) => {
    state.seckillgoods.push(newDATA)
  }
}

const actions = {
  async getList({ commit }) {
    return new Promise((resolve, reject) => {
      console.log(this.state.goodsList, '---------', store.getters.goodsList)
      if (store.getters.goodsList.length > 0) {
        resolve(store.getters.goodsList)
      } else {
        goodsList().then(res => {
          const { data } = res
          commit('SET_LIST', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      }
    }
    )
  },
  async getSeckillInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      fetchSeckillGoods(id).then(res => {
        const { data } = res
        commit('SET_SECKILL_GOODS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
