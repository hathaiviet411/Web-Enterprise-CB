import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Login from '../../pages/Login/index.vue';
import Vuetify from 'vuetify';
import store from '@/store';

describe('Test Login: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    test('Test Login screen is rendered', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const LoginScreen = wrapper.find('.login-screen');
        expect(LoginScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test Login image is rendered', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const LoginImage = wrapper.find('.login-illustration');
        expect(LoginImage.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test Login description is rendered', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const LoginImage = wrapper.find('.login-description');
        expect(LoginImage.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test Login sub illustration is rendered', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const LoginSubIllustration = wrapper.find('.sub-illustration');
        expect(LoginSubIllustration.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test Login notification is rendered', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const LoginNotification = wrapper.find('.notification');
        expect(LoginNotification.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test Login form input is rendered', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const LoginImage = wrapper.find('.form-input');
        expect(LoginImage.exists()).toBe(true);

        const usernameInput = wrapper.find('.username-input');
        expect(usernameInput.exists()).toBe(true);

        const passwordInput = wrapper.find('.password-input');
        expect(passwordInput.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test checkbox isRememberMe is exist', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const checkbox = wrapper.find('#checkbox-remember-me');
        expect(checkbox.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test button forgotPassword is exist', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const buttonForgotPassword = wrapper.find('.forgot-password');
        expect(buttonForgotPassword.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test button login is exist', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const buttonLogin = wrapper.find('.btn-login');
        expect(buttonLogin.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test footer description is exist', () => {
        const wrapper = shallowMount(Login, {
            localVue,
            vuetify,
            store,
        });

        const footerDescription = wrapper.find('.footer-description');
        expect(footerDescription.exists()).toBe(true);

        wrapper.destroy();
    });
});

describe('Test Login: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const doLogin = jest.fn();
    const callApiLogin = jest.fn();

    test('Test function validate login form data when click on the login button', async() => {
        const wrapper = mount(Login, {
            localVue,
            methods: {
                doLogin,
            },
            vuetify,
            store,
        });

        const buttonLogin = wrapper.find('.btn-login');
        buttonLogin.trigger('click');

        await wrapper.vm.$nextTick();

        await wrapper.vm.doLogin();
        expect(doLogin).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function call api login after click on the login button and pass validation', async() => {
        const wrapper = mount(Login, {
            localVue,
            methods: {
                doLogin,
                callApiLogin,
            },
            vuetify,
            store,
        });

        const buttonLogin = wrapper.find('.btn-login');
        buttonLogin.trigger('click');

        await wrapper.vm.$nextTick();

        await wrapper.vm.doLogin();
        expect(doLogin).toHaveBeenCalled();

        await wrapper.vm.callApiLogin();
        expect(callApiLogin).toHaveBeenCalled();

        wrapper.destroy();
    });
});
