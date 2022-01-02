<template>
  <div>
    <header class="menu">
      <nav class="flex justify-between container-box pt-10">
        <div>
          <img
            src="../assets/img/logo2.png"
            alt=""
          >
        </div>

        <ul class="flex justify-between">
          <li
            v-if="$store.getters.isLoggedIn"
            class="nav-links "
          ><a href="/jobs">My Jobs</a></li>
          <li
            v-if="!$store.getters.isLoggedIn"
            class="nav-links"
          ><a href="/login">Login</a> </li>
          <li
            v-if="!$store.getters.isLoggedIn"
            class="nav-links"
          ><a href="/register">Register</a></li>
          <li
            @click="logOut()"
            v-if="$store.getters.isLoggedIn"
            class="nav-links "
          > Logout </li>
          <li
            class=" nav-links create-button"
            @click="showModal"
          >
            Post Job
          </li>
        </ul>
      </nav>
      <div class="container-box ">
        <h2 class="title my-16 ml-10"> Find Your Dream Job</h2>
      </div>

    </header>
    <!-- createjob modal -->
    <CreateJob ref="createjob"> </CreateJob>

  </div>

</template>

<script> 
import CreateJob from '@/components/CreateJob.vue'
export default {
  name: 'TopMenu1',
  components: {
    CreateJob
  },
  methods: {
    logOut () {
      var req = {
        what: "logout",
        useToken: true,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          if (response.type == 'logout') {
            this.$store.dispatch('setLoggedIn', false)
            this.$router.push('/')
          }

        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    },
    showModal () {
      this.$refs.createjob.showModal()
    }

  }
}
</script>
 <style scoped>
</style>
