'use strict'

const app = new Vue({
  el: '#app',
  data: {
    message : 'Hello',
    username: '',
    password: ''
  },

  methods: {
    login () {
      const a = this;
      axios.post('http://localhost:3000/users', {
        username: a.username,
        password: a.password
      })
      .then(logged => {
        console.log(logged)
        const token = logged.data.rapidToken
        localStorage.setItem('rapidToken', token)

        //windows.location.href = <halaman-tujuan>
      })
      .catch(e => console.log(e))
    },  // end of login()

    logout () {
      localStorage.removeItem('rapidtoken')
      //windows.location.href = <halaman-tujuan>
    }  // end of logout()

  }  // methods

})