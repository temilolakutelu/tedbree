<template>
  <div id="register">
    <div class=" flex">
      <div class=" container login-bg p-14 ">
        <div class="m-5">
          <img
            class="logo"
            src="../assets/img/logo.png"
            alt=""
          >
          <h2 class="mt-16">Register to find the best
            candidates for your
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
          <h3 class="title">Register</h3>
          <div class="form-group">
            <label for="email">Company Name</label>
            <input
              type="text"
              v-model="formData.name"
            >
          </div>
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
          <div class="form-group">
            <label for="password">Confirm Password</label>
            <input
              type="password"
              v-model="confirmpassword"
            >
          </div>
          <p class="text">Already have an account? <a href="/login">Login</a></p>
          <div class="form-group">
            <button
              @click.prevent="handleRegister"
              class="btn"
            >Register</button>
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
      confirmpassword: '',
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleRegister () {
      var req = {
        what: "register",
        data: this.formData,
      };
      this.$request
        .makePostRequest(req)
        .then(response => {
          console.log(response)
          if (response.type == 'register') {
            this.$swal.fire("Success", response.data.message, "success");
            this.$router.push('/login')
          }
          // this.$store.dispatch('setLoggedIn', true)
          // console.log(response.data)
          // this.$store.dispatch('login', response.data.message[0])
          //   .then(() => {
          //     this.fetchCart();
          //     this.$swal.fire("Success", `Hi ${response.data.message[0].firstname}, Welcome to Marketsquare`, "success");
          //     // this.user = {};
          //   })
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error, "error");
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