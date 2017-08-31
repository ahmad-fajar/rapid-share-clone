'use strict'

let BASE_URL = 'http://localhost:3000'

const app = new Vue({
  el: '#app',
  data: {
    message : 'Hello',
    username: '',
    password: ''
  },

  methods: {
    login () {
      console.log('klik');
      const a = this;
      axios.post(`${BASE_URL}/users`, {
        username: a.username,
        password: a.password
      })
      .then(logged => {
        console.log(logged)
        const token = logged.data.rapidToken
        localStorage.setItem('rapidToken', token)
        window.location.href = 'home.html'
      })
      .catch(e => console.log(e))
    },  // end of login()

    logout () {
      console.log('klik')
      localStorage.removeItem('rapidToken')
      window.location.href = 'index.html'
    }  // end of logout()

  }  // methods

})
