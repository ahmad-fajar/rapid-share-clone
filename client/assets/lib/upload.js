'use strict'

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello',
    currentStatus: null,
    uploadError: null,
    uploadFieldName: 'photos'
    uploadedFiles: [],
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
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },  // reset()

    // upload data to the server
    save(formData) {
      this.currentStatus = STATUS_SAVING;
      const url = `${BASE_URL}/photos/upload`;
      upload(formData)
        .then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },  // save()

    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });
      // save it
      this.save(formData);
    }  // filesChange()

  },  // methods

  mounted: {
    this.reset()
  },

  created: {

  }
})
