import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Department from '../../pages/DepartmentManagement/index.vue';
import Vuetify from 'vuetify';

describe('Department Management: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    it('Test department screen is rendered', () => {
        const wrapper = shallowMount(Department, {
            localVue,
            vuetify,
        });

        const DepartmentScreen = wrapper.find('.department-screen');
        expect(DepartmentScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    it('Test table department list is rendered', () => {
        const wrapper = shallowMount(Department, {
            localVue,
            methods: {
                getDepartmentData: jest.fn(),
            },
            vuetify,
        });

        const DepartmentTable = wrapper.find('.table-department-list');
        expect(DepartmentTable.exists()).toBe(true);

        wrapper.destroy();
    });
});

describe('Department Management: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const getDepartmentData = jest.fn();

    it('Test function call api get list department when created', async() => {
        const wrapper = shallowMount(Department, {
            localVue,
            methods: {
                getDepartmentData,
            },
            vuetify,
        });

        expect(getDepartmentData).toHaveBeenCalled();

        wrapper.destroy();
    });

    it('Test function fetch data from the api to the table content', async() => {
        const wrapper = shallowMount(Department, {
            localVue,
            methods: {
                getDepartmentData,
            },
            vuetify,
        });

        const vFields = [
            {
                text: 'Department Name',
                align: 'start',
                sortable: false,
                value: 'departmentName',
            },
            { text: 'Idea Contributed', value: 'numberOfIdea', align: 'center' },
            {
                text: 'Staff Contributed',
                value: 'numberOfContributor',
                align: 'center',
            },
            { text: 'Actions', value: 'actions', sortable: false },
        ];

        const vItems = [];

        expect(wrapper.vm.vFields).toEqual(vFields);
        expect(wrapper.vm.vItems).toEqual(vItems);

        wrapper.destroy();
    });

    it('Test function createNewDepartment when click on the register button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                getDepartmentData,
            },
            vuetify,
        });

        const ButtonOpenModalRegister = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonOpenModalRegister).toBe(true);

        // const ButtonDoRegister = (wrapper.find('.save-btn').exists());
        // expect(ButtonDoRegister).toBe(true);

        wrapper.destroy();
    });
});
