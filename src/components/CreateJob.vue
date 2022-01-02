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
          <div class="form-group">
            <label for="title">Job Title</label>
            <input type="text">
          </div>
          <div class="form-group">
            <label for="company">Company Name</label>
            <input type="text">
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input type="text">
          </div>

          <div class="form-group">
            <label for="type">What type of employement is it?</label>
            <select
              name=""
              id=""
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
            <input type="text">
          </div>
          <div class="form-group">
            <label for="deadline">Submission deadline</label>
            <input type="text">
          </div>

          <div class="form-group">
            <label for="sector">What Sector is this job categorized under?</label>
            <select
              name=""
              id=""
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
            <button class="btn">Submit Application</button>
          </div>

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

    };
  },
  methods: {
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
