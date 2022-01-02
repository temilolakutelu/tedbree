<template>
  <div id="login">
    <div class=" flex">
      <div class=" container login-bg p-14 ">
        <div class="px-16">
          <img
            class="logo"
            src="../assets/img/logo.png"
            alt=""
          >
          <h2 class="mt-40">Find the best <br>
            candidates for your <br>
            organisation.</h2>
          <img
            class="login-img"
            src="../assets/img/login-img.png"
            alt=""
          >
        </div>
      </div>
      <div class="rec2">
      </div>
      <div class="container  login-form">
        <div class="flex  justify-between logo-sm">
          <div>
            <img
              class="m-8"
              src="../assets/img/logo.png"
              alt=""
            >

          </div>
          <img
            src="../assets/img/ellipse-group2.png"
            alt=""
          >
        </div>
        <div class="logo-lg flex  justify-end ">
          <img
            src="../assets/img/ellipse-group2.png"
            alt=""
          >

        </div>
        <form class="px-24">
          <h3 class="title">Login</h3>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              v-model="formData.email"
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="formData.password"
            >
          </div>
          <p class="text">You do not have an account? <a href="/register">Register</a></p>
          <div class="form-group">
            <button
              @click.prevent="handleLogin"
              class="btn"
            >Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script> 

export default {
  name: 'Login',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      var req = {
        what: "login",
        data: this.formData,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          if (response.type == 'login') {
            this.$store.dispatch('login', response.data.token)
              .then(() => {
                this.$router.push('/jobs')
              })
          }

        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    }
  }
}
</script>
<style  scoped>
.text {
  color: var(--icon);
  font-size: 14px;
}
.text a {
  font-weight: bold;
}
</style> 