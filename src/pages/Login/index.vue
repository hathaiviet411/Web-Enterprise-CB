<template>
  <div>
    <v-app id="inspire">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-card elevation="24">
              <v-card-text class="no-padding">
                <b-row>
                  <b-col v-if="!isMobileMode" cols="6">
                    <div class="login-illustration">
                      <v-img
                        id="logo"
                        fluid
                        center
                        min-height="100%"
                        :src="LoginIllustration"
                        alt="Logo"
                      />
                    </div>
                  </b-col>

                  <b-col :cols="isMobileMode ? 12 : 6">
                    <div class="login-form">
                      <b-row>
                        <b-col cols="12">
                          <v-img
                            id="oval-1"
                            :src="OvalIllustration"
                            alt="oval-1"
                          />
                        </b-col>
                      </b-row>

                      <b-row class="login-description">
                        <b-col cols="12">
                          <h2>Join us</h2>
                          <span>To contribute your ideas to the community</span>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col cols="12">
                          <v-img
                            src="@/assets/images/banner.png"
                            min-width="100%"
                          />
                        </b-col>
                      </b-row>

                      <b-row class="mt-3">
                        <b-col cols="12" class="text-center">
                          <span class="login-option-suggest"
                            >Please contact with administrator if you do not
                            have an account.</span
                          >
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col cols="12">
                          <label>
                            <span>Username</span>
                          </label>
                          <b-form-input
                            v-model="User.username"
                            type="text"
                            placeholder="Username"
                            :disabled="isProcess"
                          />
                        </b-col>

                        <b-col cols="12">
                          <label>
                            <span>Password</span>
                          </label>
                          <b-form-input
                            v-model="User.password"
                            type="password"
                            placeholder="⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄⋄"
                            :disabled="isProcess"
                          />
                        </b-col>

                        <b-col cols="12">
                          <b-row>
                            <b-col cols="6">
                              <b-form-checkbox
                                id="checkbox-remember-me"
                                v-model="isRememberMe"
                                name="checkbox-remember-me"
                                value="checked"
                                unchecked-value="not_checked"
                                :disabled="isProcess"
                              >
                                <span>Remember Me</span>
                              </b-form-checkbox>
                            </b-col>

                            <b-col
                              cols="6"
                              class="text-right"
                              :disabled="isProcess"
                            >
                              <span class="create-account-text"
                                >Forgot password</span
                              >
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col cols="12">
                          <b-button
                            class="btn-login"
                            :disabled="isProcess"
                            @click="doLogin()"
                          >
                            <span class="btn-login-text">Login</span>
                          </b-button>
                        </b-col>
                      </b-row>

                      <b-row class="footer-description">
                        <b-col class="text-center" cols="12">
                          <span>Copyright ©FGW 2021 All Rights Reserved</span>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </v-card-text>
            </v-card>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import LoginIllustration from "@/assets/images/login-logo.png";
import OvalIllustration from "@/assets/images/oval-1.png";

// Helper functions import
import { MakeToast } from "@/toast/toastMessage";
import { resetRouter } from "@/router";

// API import
import { postLogin, getInfo } from "@/api/modules/login";

// API url
const LOGIN_API = "/auth/login";
const GET_INFO = "/auth/info";

export default {
  name: "Login",
  data() {
    return {
      LoginIllustration,
      OvalIllustration,

      User: {
        username: "admin",
        password: "123456",
      },

      isRememberMe: this.$store.getters.isRememberMe,
      isMobileMode: false,

      isProcess: false,
    };
  },
  watch: {
    isRememberMe() {
      this.$store.dispatch("app/setRememberMe", this.isRememberMe);
    },
  },
  created() {
    window.addEventListener("resize", this.handleResizeResolution);
    this.handleResizeResolution();
  },
  destroyed() {
    window.addEventListener("resize", this.handleResizeResolution);
  },
  methods: {
    async doLogin() {
      this.isProcess = true;

      if (this.User.username.length === 0) {
        MakeToast({
          variant: "warning",
          title: "Warning",
          content: "Username is required.",
        });
      } else if (this.User.password.length === 0) {
        MakeToast({
          variant: "warning",
          title: "Warning",
          content: "Password is required.",
        });
      } else if (this.User.password.length < 6) {
        MakeToast({
          variant: "warning",
          title: "Warning",
          content: "Password must be at least 8 characters.",
        });
      } else {
        const USER = {
          username: this.User.username,
          password: this.User.password,
        };

        this.callApiLogin(LOGIN_API, USER);
      }

      this.isProcess = false;
    },

    async callApiLogin(URL, USER) {
      try {
        const response = await postLogin(URL, USER);
        if (response.status === true) {
          const TOKEN = response.data.access_token;
          const EXPIRED_TOKE = response.data.expired_time;
          const REFRESH_TOKEN = response.data.refresh_token;

          await this.$store.dispatch("user/saveLogin", TOKEN);

          try {
            const USER = await getInfo(GET_INFO);
            if (response.status === true) {
              const PROFILE = {
                id: USER.info.user._id,
                isAgreedTerm: USER.info.user.isAgreedTerm,
                username: USER.info.user.username,
                name: USER.info.user.name,
                department_id: "",
                expired_token: EXPIRED_TOKE,
                refresh_token: REFRESH_TOKEN,
                role: USER.info.role.roleName,
              };

              await this.$store.dispatch("user/saveProfile", PROFILE);

              MakeToast({
                variant: "success",
                title: "Login Successful",
                content: "Welcome back, " + this.$store.getters.profile.name,
              });

              resetRouter();

              const ROLE = this.$store.getters.profile.role;

              await this.$store
                .dispatch("role/generateRoutes", ROLE)
                .then((routes) => {
                  for (let route = 0; route < routes.length; route++) {
                    this.$router.addRoute(routes[route]);
                  }
                  this.$router.push("/dashboard/index");
                });
            }
          } catch (error) {
            console.error(error.message);
          }
        }
      } catch (error) {
        MakeToast({
          variant: "error",
          title: "Error",
          content: error.message,
        });
      }
    },

    handleResizeResolution() {
      var windowWidth = window.innerWidth;
      if (windowWidth >= 375 && windowWidth <= 812) {
        this.isMobileMode = true;
      } else {
        this.isMobileMode = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-padding {
  padding: 0 !important;
}

.login-illustration {
  overflow: hidden;
  background-color: $tequila;
  height: 100%;
  text-align: center;
}

.login-form {
  overflow: hidden;
  padding: 50px;

  #oval-1 {
    float: left;
  }

  .google-icon {
    color: rgb(194, 177, 25);
    padding-top: 5px;
  }

  .btn-sign-up {
    margin-top: 20px;
    width: 98%;
    height: 40px;
    font-weight: bold;
    color: $black;
    background-color: $dandelion;
  }

  .login-option-suggest {
    opacity: 0.8;
  }

  .login-description {
    text-align: left;
  }

  .btn-login {
    margin-top: 20px;
    width: 98%;
    background-color: $tawny-port;
    height: 40px;

    .btn-login-text {
      font-weight: 500;
    }
  }

  .create-account-text {
    color: $tawny-port;
    font-weight: bolder;
  }

  .create-account-text:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .footer-description {
    margin-top: 50px;
  }
}
</style>
