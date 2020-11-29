<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form class="user">
                    <div v-if="loginPanel" class="login">
                      <div class="form-group">
                        <input
                          v-model="data.email"
                          type="text"
                          class="form-control form-control-user"
                          id="email"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div class="form-group">
                        <input
                          v-model="data.password"
                          type="password"
                          class="form-control form-control-user"
                          id="password"
                          placeholder="Password"
                        />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck"
                          />
                          <label class="custom-control-label" for="customCheck"
                            >Remember Me</label
                          >
                        </div>
                      </div>
                      <Button
                        type="primary"
                        @click.prevent="generateOTP"
                        :loading="isLogging"
                        class="btn-block"
                      >
                        Login
                      </Button>
                    </div>
                    <div v-else class="loginOtp">
                      <div class="form-group">
                        <input
                          v-model="data.otp"
                          type="text"
                          class="form-control form-control-user"
                          id="otp"
                          placeholder="Enter OTP"
                        />
                      </div>
                      <Button
                        type="primary"
                        @click="loginOtpVerify"
                        :loading="isLogging"
                        class="btn-block"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                  <Divider />
                  <div class="text-center">
                    <router-link to="forgot-password" class="small"
                      >Forgot Password?</router-link
                    >
                  </div>
                  <div class="text-center">
                    <router-link to="signup" class="small"
                      >Create an Account!</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginPanel: true,
      isLogging: false,
      data: {
        email: "",
        password: "",
        otp: "",
      },
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),

    async generateOTP() {
      this.isLogging = true;
      if (this.data.email.trim() == "") {
        this.isLogging = false;
        return this.e("Email is required.");
      }
      if (this.data.password.trim() == "") {
        this.isLogging = false;
        return this.e("Password is required.");
      }

      const res = await this.callApi("post", "login/otp-generate", this.data);
      if (res.status === 200 && res.data.code === 200) {
        this.loginPanel = false;
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Login OTP is sent to your email.");
        }
      } else {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.e(res.data.messages[key]);
          }
        } else {
          this.swr();
        }
      }
      this.isLogging = false;
    },

    async loginOtpVerify() {
      this.isLogging = true;
      if (this.data.otp.trim() == "") {
        this.isLogging = false;
        return this.e("OTP is required.");
      }

      const res = await this.callApi("post", "login/otp-verify", this.data);
      if (res.status === 200 && res.data.code === 200) {
        /** VUEX SIGNIN FUNCTION FOR STORING TOKEN & USER */
        this.signIn(res.data.data).then(() => {
          this.$router.replace({
            name: "dashboard",
          });
        });
      } else {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.e(res.data.messages[key]);
          }
        } else {
          this.swr();
        }
      }

      this.isLogging = false;
    },
  },
};
</script>