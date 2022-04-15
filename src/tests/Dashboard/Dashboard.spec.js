import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Dashboard from '../../pages/Dashboard/index.vue';
import Vuetify from 'vuetify';

describe('Test Dashboard: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    test('Test Dashboard screen is rendered', () => {
        const wrapper = shallowMount(Dashboard, {
            localVue,
            vuetify,
        });

        const DashboardScreen = wrapper.find('.dashboard-screen');
        expect(DashboardScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test Dashboard list idea is rendered', () => {
        const wrapper = shallowMount(Dashboard, {
            localVue,
            vuetify,
        });

        const DashboardListIdea = wrapper.find('.dashboard-list-idea');
        expect(DashboardListIdea.exists()).toBe(true);

        wrapper.destroy();
    });
});

describe('Test Dashboard: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const getIdeaList = jest.fn();
    const toDetailScreen = jest.fn();

    test('Test function call api get list idea when created', async() => {
        const wrapper = mount(Dashboard, {
            localVue,
            vuetify,
            methods: {
                getIdeaList,
            },
        });

        await wrapper.vm.getIdeaList();
        expect(getIdeaList).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function move to the detail screen when click on the detail button', async() => {
        const wrapper = mount(Dashboard, {
            localVue,
            vuetify,
            methods: {
                toDetailScreen,
            },
        });

        wrapper.vm.toDetailScreen();
        expect(toDetailScreen).toHaveBeenCalled();

        wrapper.destroy();
    });
});

