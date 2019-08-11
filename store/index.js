import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      tasks: []
    }),
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      setTasksRef: firestoreAction(({ bindFirestoreRef }, ref ) => {
        bindFirestoreRef('tasks', ref)
      })
    },
    getters: {
      getTasks: (state) => {
        return state.tasks
      },
    },
  })
}

export default createStore;
