'use strict'

// untuk status uploader
const STATUS_INITIAL = 0
const STATUS_SAVING  = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED  = 3

// base url api
const BASE_URL = 'http://localhost:3000'

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello',
    currentStatus: null,
    uploadError: null,
    uploadFieldName: 'image',
    uploadedFiles: [],
    files:[]
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },  // computed

  methods: {
    // reset form to initial state

    getAllFile () {
      let self = this
      axios.get(`${BASE_URL}/files`)
      .then(response => {
        self.files = response.data
      })
    }, // getAllFile()

    deleteFile (id) {
      axios.delete(`${BASE_URL}/files/${id}`)
      .then(r => {
        this.files.splice(id, 1)
      })
    },

    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },  // reset()

    // upload data to the server
    save(formData) {
      console.log('save')
      console.log('form data', formData)
      this.currentStatus = STATUS_SAVING;

      axios.post(`${BASE_URL}/files/add`, formData)
      .then(up => {
        // console.log('up', up)
        this.uploadedFiles = [].concat(up)
        this.currentStatus = STATUS_SUCCESS
      })
      .catch(e => {
        console.log(e.response.data)
        this.currentStatus = STATUS_FAILED
      })

    },  // save()

    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      formData.append('image', fileList[0])
      console.log(formData)
      this.save(formData);
    }  // filesChange()

  },  // methods

  mounted () {
    this.reset()
  },

  created () {
    this.getAllFile()
  }

})
