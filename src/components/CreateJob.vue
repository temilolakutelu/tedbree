<template>
  <div>

    <!--  modal toggle -->
    <!-- <button
      class="create-button"
      @click="showModal"
    >Post Job</button> -->

    <div
      id="createjob"
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
            <h3 class="title">New Job</h3>
            <p class="subtitle">Kindly provide the required information to get matched with suitable candidates</p>
          </div>
          <form @submit.prevent="handleCreate">
            <div class="form-group">
              <label for="title">Job Title</label>
              <input
                type="text"
                v-model="job.title"
              >
            </div>

            <div class="form-group">
              <label for="location">Location</label>
              <input
                type="text"
                v-model="job.location"
              >
            </div>

            <div class="form-group">
              <label for="type">What type of employement is it?</label>
              <select
                name=""
                id=""
                v-model="job.type"
              >
                <option
                  selected
                  value=""
                >Select option</option>
                <option>Full-time</option>
                <option>Temporary</option>
                <option>Contract</option>
                <option>Permanent</option>
                <option>Internship</option>
                <option>Volunteer</option>
              </select>
            </div>
            <div class="form-group">
              <label for="salary">Salary range</label>
              <input
                type="text"
                v-model="job.salary"
              >
            </div>

            <div class="form-group">
              <label for="sector">What Sector is this job categorized under?</label>
              <select
                name=""
                id=""
                v-model="job.category"
              >
                <option
                  selected
                  value=""
                >Select option</option>
                <option>Tech</option>
                <option>Hospitality</option>
                <option>Customer Service</option>
                <option>Marketing</option>

              </select>
            </div>
            <div class="form-group">
              <label for="sector"> Work Conditions</label>
              <select
                name=""
                id=""
                v-model="job.work_condition"
              >
                <option
                  selected
                  value=""
                >Select option</option>
                <option>Remote</option>
                <option>Part Remote</option>
                <option>On-Premise</option>

              </select>
            </div>
            <div class="form-group">
              <label for="benefits">Benefits</label>
              <input
                type="text"
                v-model="job.benefits"
              >
            </div>
            <div class="form-group">
              <label for="salary">Description</label>
              <textarea
                v-model="job.description"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn"
              >Submit Application</button>
            </div>
          </form>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
// import * as $ from "jquery";
export default {
  name: 'CreateJob',
  data () {
    return {
      job: {
        title: '',
        description: '',
        location: '',
        category: '',
        benefits: '',
        salary: '',
        type: '',
        work_condition: ''
      }
    };
  },
  methods: {
    handleCreate () {
      let vm = this;
      var formData = new FormData();
      formData.append('title', vm.job.title)
      formData.append('description', vm.job.description)
      formData.append('location', vm.job.location)
      formData.append('category', vm.job.category)
      formData.append('benefits', vm.job.benefits)
      formData.append('salary', vm.job.salary)
      formData.append('type', vm.job.type)
      formData.append('work_condition', vm.job.work_condition)

      var req = {
        what: "createjob",
        data: formData,
        useToken: true
      };

      vm.$request
        .makePostRequest(req)
        .then(res => {
          if (res.type == 'createjob') {
            console.log(res)
            this.job = {
              title: '',
              description: '',
              location: '',
              category: '',
              benefits: '',
              salary: '',
              type: '',
              work_condition: ''
            }
            vm.$swal.fire("Success", res.data.message, "success");
            location.reload()
          }
        })
        .catch(error => {
          console.log(error)
          vm.$swal.fire("Error", error, "error");
        });
    },
    showModal () {
      document.querySelector("#createjob").style.display = "block"

    },
    closeModal () {
      document.querySelector("#createjob").style.display = "none"
    }
  }
}
</script>
 <style scoped>
</style>
