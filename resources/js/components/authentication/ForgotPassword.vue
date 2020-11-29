<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                    <p class="mb-4">
                      We get it, stuff happens. Just enter your email address
                      below and we'll send you a link to reset your password!
                    </p>
                  </div>
                  <form class="user">
                    <div v-if="forgotPasswordPanel" class="emailPanel">
                      <div class="form-group">
                        <input
                          v-model="data.email"
                          type="text"
                          class="form-control form-control-user"
                          id="email"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <Button type="primary" class="btn-block" @click.prevent="generateOTP" :loading="isUpdating">
                        Reset Password
                      </Button>
                    </div>
                    <div v-else class="otpPanel">
                      <div class="form-group">
                        <input
                          v-model="data.password"
                          type="password"
                          class="form-control form-control-user"
                          id="password"
                          placeholder="Enter Password"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          v-model="data.password_confirmation"
                          type="password"
                          class="form-control form-control-user"
                          id="password_confirmation"
                          placeholder="Re-type Password"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          v-model="data.otp"
                          type="text"
                          class="form-control form-control-user"
                          id="otp"
                          placeholder="Enter OTP"
                        />
                      </div>
                      <Button type="primary" class="btn-block" @click.prevent="forgotPasswordOtpVerify" :loading="isUpdating">
                        Submit
                      </Button>
                    </div>
                  </form>
                  <Divider />
                  <div class="text-center">
                    <router-link to="signup" class="small"
                      >Create an Account!</router-link
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forgotPasswordPanel: true,
      isUpdating: false,
      data: {
        email: "",
        password: "",
        password_confirmation: "",
        otp: "",
      },
    };
  },
  methods: {
    async generateOTP() {
      this.isUpdating = true;
      if (this.data.email.trim() == "") {
        this.isUpdating = false;
        return this.e("Email is required.");
      }

      const res = await this.callApi(
        "post",
        "forgot-password/otp-generate",
        this.data
      );
      if (res.status === 200 && res.data.code === 200) {
        this.forgotPasswordPanel = false;
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Forgot password OTP is sent to your email.");
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
      this.isUpdating = false;
    },

    async forgotPasswordOtpVerify() {
      this.isUpdating = true;
      if (this.data.password.trim() == "") {
        this.isUpdating = false;
        return this.e("Password is required.");
      }
      if (this.data.password_confirmation.trim() == "") {
        this.isUpdating = false;
        return this.e("Confirm password is required.");
      }
      if (this.data.otp.trim() == "") {
        this.isUpdating = false;
        return this.e("OTP is required.");
      }

      const res = await this.callApi(
        "post",
        "forgot-password/otp-verify",
        this.data
      );
      if (res.status === 200 && res.data.code === 200) {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Your password is updated successfully.");
        }

        this.$router.replace({
          name: "login",
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

      this.isUpdating = false;
    },
  },
};
</script>