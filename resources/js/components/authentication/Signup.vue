<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user">
                <div class="form-group">
                  <input
                    v-model="data.name"
                    type="text"
                    class="form-control form-control-user"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="data.email"
                    type="text"
                    class="form-control form-control-user"
                    id="email"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="data.password"
                    type="password"
                    class="form-control form-control-user"
                    id="password"
                    placeholder="Enter Password"
                  />
                </div>
                <Button
                  type="primary"
                  class="btn-block"
                  @click.prevent="register"
                  :loading="isRegistering"
                >
                  Register Account
                </Button>
              </form>
              <Divider />
              <div class="text-center">
                <router-link to="forgot-password" class="small"
                  >Forgot Password?</router-link
                >
              </div>
              <div class="text-center">
                <router-link to="login" class="small"
                  >Already have an account? Login!</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegistering: false,
      data: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      this.isRegistering = true;
      if (this.data.name.trim() == "") {
        this.isRegistering = false;
        return this.e("Name is required.");
      }
      if (this.data.email.trim() == "") {
        this.isRegistering = false;
        return this.e("Email is required.");
      }
      if (this.data.password.trim() == "") {
        this.isRegistering = false;
        return this.e("Password is required.");
      }

      const res = await this.callApi("post", "register", this.data);
      if (res.status === 200 && res.data.code === 200) {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Account Creation Successful.");
        }

        this.data.name = "";
        this.data.email = "";
        this.data.password = "";
      } else {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.e(res.data.messages[key]);
          }
        } else {
          this.swr();
        }
      }
      this.isRegistering = false;
    },
  },
};
</script>