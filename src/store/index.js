import { createStore } from 'vuex'

const authStore = createStore({
  state () {
    return {
      twitter: {
        user: {
          img: "",
          name: ""
        },
        auth: {
          accessToken: "",
          accessSecret: ""
        },
        client: undefined
      }
    }
  },
  mutations: {
    setTwitterAuth(state, data) {
      state.twitter.auth = data
    },
    setTwitterClient(state, c) {
      state.twitter.client = c
    },
    setTwitterUser(state, u) {
      state.twitter.user = u
    }
  },
  getters: {
    twitterAuthed (state) {
      return state.twitter.user.name != ""
    },
    twitterUser (state) {
      return state.twitter.user
    },
    twitterAuth (state) {
      return state.twitter.auth
    }
  }
})

export default authStore