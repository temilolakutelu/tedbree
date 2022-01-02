<template>
  <header class="menu">
    <nav class="flex justify-between container-box pt-10">
      <div>
        <img
          src="../assets/img/logo.png"
          alt=""
        >
      </div>

      <ul class="flex justify-between">
        <li class="nav-links "><a href="/">Home</a></li>

        <li class="nav-links "><i class="far fa-bell h-6"></i></li>
        <li class="nav-links"><a href=""><img
              src="../assets/img/avatar.png"
              class="h-9"
              alt=""
            ></a></li>
        <li
          class="nav-links"
          @click="logOut()"
        > Logout </li>
      </ul>
    </nav>
    <div class="container-box ">
      <h2 class="title my-16 ml-10"> Jobs</h2>
    </div>

  </header>

</template>

<script>
export default {
  name: 'TopMenu1',
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


  }
}
</script>
 <style scoped>
.menu {
  height: 250px;
}
</style>
