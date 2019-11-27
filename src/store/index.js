import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [
      {  'id': 1,
         'name': 'luna',
         'age' : 5,
         'race' : 'Golden Retrieve'
      },
      {  'id': 2,
         'name': 'jack',
         'age' : 8,
         'race' : 'Samoyed'
      },
      {  'id': 3,
         'name': 'pricila',
         'age' : 2,
         'race' : 'Border Collie'
      },
      {  'id': 4,
         'name': 'Bo',
         'age' : 10,
         'race' : 'Siberian Husky'
      },
      {  'id': 5,
         'name': 'John',
         'age' : 1,
         'race' : 'Golden Retrieve'
      }
    ]  
  },
  getters: {
    list: state => state.list
  },
  mutations: {
    saveList (state, listInput) {
      state.list = listInput
    }
  },
  actions: {
  },
  modules: {
  }
})
