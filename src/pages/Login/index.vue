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
												:src="LoginIllustration"
												alt="Logo"
											/>
											<h2 class="first-slogan">
												Turn your ideal into reality.
											</h2>
											<span
												class="second-slogan"
											>Collect Ideals System - Give away your IDEALS - Receive
												your FUTURE</span>
										</div>
									</b-col>

									<b-col :cols="isMobileMode ? 12 : 6">
										<div class="login-form">
											<b-row>
												<b-col cols="12">
													<v-img
														id="oval-1"
														mix-height="100%"
														:src="OvalIllustration"
														alt="oval-1"
													/>
												</b-col>
											</b-row>

											<b-row class="login-description">
												<b-col cols="12">
													<h2>Join us</h2>
													<span>To contribute your ideals to the community</span>
												</b-col>
											</b-row>

											<b-row>
												<b-col cols="12">
													<b-button variant="light" class="btn-sign-up">
														<v-icon left>mdi-account-plus</v-icon>
														<span>Sign up</span>
													</b-button>
												</b-col>
											</b-row>

											<b-row class="mt-3">
												<b-col cols="12" class="text-center">
													<span
														class="login-option-suggest"
													>or Sign in with CLS Account</span>
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
															>
																<span>Remember Me</span>
															</b-form-checkbox>
														</b-col>

														<b-col cols="6" class="text-right">
															<span
																class="create-account-text"
															>Forgot password</span>
														</b-col>
													</b-row>
												</b-col>
											</b-row>

											<b-row>
												<b-col cols="12">
													<b-button class="btn-login" @click="doLogin()">
														<span class="btn-login-text">Login</span>
													</b-button>
												</b-col>
											</b-row>

											<b-row class="footer-description">
												<b-col cols="6">
													<span>Not Registered Yet?</span>
												</b-col>
												<v-spacer />
												<b-col cols="6" class="text-right">
													<span
														class="create-account-text"
													>Create an account</span>
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
import LoginIllustration from '@/assets/images/login-logo.png';
import OvalIllustration from '@/assets/images/oval-1.png';

// Helper functions import
import { MakeToast } from '@/toast/toastMessage';

// API import
import { postLogin } from '@/api/modules/login';

const LOGIN_API = '/auth/login';

export default {
    name: 'Login',
    data() {
        return {
            LoginIllustration,
            OvalIllustration,

            User: {
                username: 'admin',
                password: '123456',
            },

            isRememberMe: 'not_checked',
            isMobileMode: false,
        };
    },
    created() {
        window.addEventListener('resize', this.handleResizeResolution);
        this.handleResizeResolution();
    },
    destroyed() {
        window.addEventListener('resize', this.handleResizeResolution);
    },
    methods: {
        async doLogin() {
            this.isProcess = true;

            if (this.User.username.length === 0) {
                MakeToast({
                    variant: 'warning',
                    title: 'Warning',
                    content: 'Username is required.',
                });
            } else if (this.User.password.length === 0) {
                MakeToast({
                    variant: 'warning',
                    title: 'Warning',
                    content: 'Password is required.',
                });
            } else if (this.User.password.length < 6) {
                MakeToast({
                    variant: 'warning',
                    title: 'Warning',
                    content: 'Password must be at least 8 characters.',
                });
            } else {
                const USER = {
                    username: this.User.username,
                    password: this.User.password,
                };

                const response = await postLogin(LOGIN_API, USER);

                if (response.status === true) {
                    this.$router.push({ path: '/dashboard/index' });
                }
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

	.first-slogan {
		color: $tawny-port;
		font-weight: 600;
	}

	.second-slogan {
		color: $tawny-port;
		font-weight: 400;
	}
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
		opacity: 0.6;
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
