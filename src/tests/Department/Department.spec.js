import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Department from '../../pages/DepartmentManagement/index.vue';
import Vuetify from 'vuetify';

describe('Department Management: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    test('Test department screen is rendered', () => {
        const wrapper = shallowMount(Department, {
            localVue,
            vuetify,
        });

        const DepartmentScreen = wrapper.find('.department-screen');
        expect(DepartmentScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test table department list is rendered', () => {
        const wrapper = shallowMount(Department, {
            localVue,
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
    const createNewDepartment = jest.fn();
    const updateDepartment = jest.fn();
    const deleteDepartment = jest.fn();
    const close = jest.fn();
    const closeDelete = jest.fn();

    test('Test function call api get list department when created', async() => {
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

    test('Test function fetch data from the api to the table content', async() => {
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

    test('Test function createNewDepartment when click on the register button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                createNewDepartment,
            },
            vuetify,
        });

        const ButtonOpenModalRegister = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonOpenModalRegister).toBe(true);

        wrapper.vm.editedIndex = -1;
        await wrapper.vm.save();
        expect(createNewDepartment).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogCreate when click on the close register button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                close,
            },
            vuetify,
        });

        const ButtonCloseModalRegister = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonCloseModalRegister).toBe(true);

        await wrapper.vm.close();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogUpdate when click on the close update button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                close,
            },
            vuetify,
        });

        const ButtonCloseModalUpdate = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonCloseModalUpdate).toBe(true);

        await wrapper.vm.close();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogDelete when click on the close delete button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                closeDelete,
            },
            vuetify,
        });

        const ButtonCloseModalDelete = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonCloseModalDelete).toBe(true);

        await wrapper.vm.closeDelete();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function updateDepartment when click on the update button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                updateDepartment,
            },
            vuetify,
        });

        const ButtonOpenModalUpdate = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonOpenModalUpdate).toBe(true);

        wrapper.vm.editedIndex = 0;
        await wrapper.vm.save();
        expect(updateDepartment).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function deleteDepartment when click on the delete button', async() => {
        const wrapper = mount(Department, {
            localVue,
            methods: {
                deleteDepartment,
            },
            vuetify,
        });

        const ButtonOpenModalDelete = (wrapper.find('.open-register-modal-btn').exists());
        expect(ButtonOpenModalDelete).toBe(true);

        await wrapper.vm.deleteItemConfirm();
        expect(deleteDepartment).toHaveBeenCalled();

        wrapper.destroy();
    });
});
