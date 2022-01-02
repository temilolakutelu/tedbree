<template>
  <div>
    <!--  modal toggle -->
    <!-- <button
      ref="apply"
      class=""
      @click="showModal"
    >Apply</button> -->

    <div
      id="apply"
      class="modal"
      tabindex="-1"
    >
      <div class="modal-content">
        <img
          @click="closeModal"
          class="close-btn m-5"
          src="../assets/img/close.png"
          alt=""
        >
        <div class="form px-16 ">

          <div class="pt-14 pb-10">
            <h4 class="title">{{job.title}}</h4>
            <p class="subtitle"><i class="fas fa-map-marker-alt"></i> {{job.location}}</p>
          </div>
          <div class="form-group">
            <label for="first">First Name</label>
            <input
              type="text"
              v-model="formData.first_name"
            >
          </div>
          <div class="form-group">
            <label for="last">Last Name</label>
            <input
              type="text"
              v-model="formData.last_name"
            >
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              v-model="formData.email"
            >
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input
              type="text"
              v-model="formData.location"
            >
          </div>
          <div class="form-group">
            <label for="location">Phone Number</label>
            <input
              type="text"
              v-model="formData.phone"
            >
          </div>
          <div
            class="form-group"
            @dragover.prevent
            @drop.prevent="dragFile"
          >
            <label
              @drop="dragFile"
              id="file-label"
              for="fileinput"
              data-text="Drag and drop your CV here  or"
              class="file"
            > </label>
            <input
              type="file"
              ref="file"
              @change="handleChange"
              id="fileinput"
              class="file-upload"
            >

          </div>

          <div class="form-group">
            <button
              class="btn"
              @click.prevent="handleApplication(job.id)"
            >Submit Application</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import * as $ from "jquery";
export default {
  name: 'CreateJob',
  data () {
    return {
      isModalVisible: false,
      job: {},
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        location: '',
        cv: ''
      }
    };
  },
  methods: {
    showModal (job) {
      this.job = job;
      document.querySelector("#apply").style.display = "block"

    },
    closeModal () {
      document.querySelector("#apply").style.display = "none"
    },
    handleApplication (id) {
      var file = $('input[type="file"]')[0].files[0];
      let upload;
      var formData = new FormData();
      let vm = this;

      var reader = new FileReader();
      reader.onload = function () {
        upload = vm.dataURItoBlob(reader.result);
        formData.append('first_name', vm.formData.first_name)
        formData.append('last_name', vm.formData.last_name)
        formData.append('email', vm.formData.email)
        formData.append('phone', vm.formData.phone)
        formData.append('location', vm.formData.location)
        formData.set('cv', upload, file.name);

        var req = {
          what: "apply",
          data: formData,
          id
        };

        vm.$request
          .makePostRequest(req)
          .then(res => {
            if (res.type == 'apply') {
              console.log(res)
              vm.$swal.fire("Success", res.data.message, "success");
              location.reload()
            }
          })
          .catch(error => {
            console.log(error)
            vm.$swal.fire("Error", error, "error");
          });
      };
      reader.readAsDataURL(file);
    },
    handleChange () {
      var styleElem;
      if ($('input[type="file"]')[0].files.length) {
        let value = $('input[type="file"]')[0].files[0]
        $("#file-label").attr("data-text", value.name);
        styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.innerHTML = "#file-label:after {display: none;}";
      }
      else {
        $("#file-label").attr("data-text", 'Drag and drop your CV here \n or');
        styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.innerHTML = "#file-label:after {display: none;}";
      }


    },
    dragFile (e) {
      this.$refs.file.files = e.dataTransfer.files;
      this.handleChange()
    },
    //convert data url to blob
    dataURItoBlob (dataURI) {

      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      // create a view into the buffer
      var ia = new Uint8Array(ab);
      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {
        type: mimeString
      });
      return blob;
    }
  }
}
</script>
 <style scoped>
#file-label {
  display: block;
  color: black;
  font-weight: bold;
  letter-spacing: 1.2px;
  font-size: 14px;
  padding-bottom: 5px;
}
input[id="fileinput"] {
  display: none;
}
label[for="fileinput"] {
  height: 240px;
  background-image: url(../assets/img/upload.png);
  background-repeat: no-repeat;
  background-position: top 48px center;
  background-size: 8%;
  color: transparent;
  margin: auto;
  width: 100%;
  transform: translateY(12%);
  border: 0.5px solid var(--blue);
  box-sizing: border-box;
  border-radius: 10px;
}
label[for="fileinput"]:before {
  content: attr(data-text);
  display: block;
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--blue);
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.04em;
  font-weight: 600;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
label[for="fileinput"]:after {
  display: block;
  content: "Browse Files";
  background: var(--blue);
  border-radius: 10px;
  padding: 8px;
  width: 135px;
  line-height: 27px;
  position: absolute;
  bottom: 19px;
  font-size: 14px;
  color: white;
  font-weight: 500;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
label[for="fileinput"] {
  cursor: pointer;
  transition: 400ms ease;
}
</style>
