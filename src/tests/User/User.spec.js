import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import User from '../../pages/UserManagement/index.vue';
import Vuetify from 'vuetify';

describe('User Management: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    test('Test user screen is rendered', () => {
        const wrapper = shallowMount(User, {
            localVue,
            vuetify,
        });

        const UserScreen = wrapper.find('.user-screen');
        expect(UserScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test table user list is rendered', () => {
        const wrapper = shallowMount(User, {
            localVue,
            vuetify,
        });

        const UserTable = wrapper.find('.table-user-list');
        expect(UserTable.exists()).toBe(true);

        wrapper.destroy();
    });
});

describe('User Management: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const initData = jest.fn();
    const getListRole = jest.fn();
    const getListDepartment = jest.fn();
    const getUserData = jest.fn();
    const createUser = jest.fn();
    const updateUser = jest.fn();
    // const deleteUser = jest.fn();
    const close = jest.fn();
    // const closeDelete = jest.fn();

    test('Test function call api get list user when created', async() => {
        const wrapper = shallowMount(User, {
            localVue,
            methods: {
                initData,
                getListRole,
                getListDepartment,
                getUserData,
            },
            vuetify,
        });

        await wrapper.vm.initData();
        await wrapper.vm.getListRole();
        await wrapper.vm.getListDepartment();
        await wrapper.vm.getUserData();

        expect(initData).toHaveBeenCalled();
        expect(getListRole).toHaveBeenCalled();
        expect(getListDepartment).toHaveBeenCalled();
        expect(getUserData).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function fetch data from the api to the table content', async() => {
        const wrapper = shallowMount(User, {
            localVue,
            methods: {
                initData,
                getUserData,
            },
            vuetify,
        });

        const vFields = [
            {
                text: 'Username',
                align: 'start',
                sortable: false,
                value: 'user.username',
            },
            {
                text: 'Full name',
                align: 'start',
                sortable: false,
                value: 'user.name',
            },
            { text: 'User Email', value: 'user.email', align: 'center' },
            { text: 'User Role', value: 'role.roleName', align: 'center' },
            {
                text: 'Department',
                value: 'department.departmentName',
                align: 'center',
            },
            {
                text: 'Agreed with Term',
                value: 'user.isAgreedTerm',
                align: 'center',
            },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ];

        const vItems = [];

        expect(wrapper.vm.vFields).toEqual(vFields);
        expect(wrapper.vm.vItems).toEqual(vItems);

        await wrapper.vm.initData();
        await wrapper.vm.getUserData();

        expect(initData).toHaveBeenCalled();
        expect(getUserData).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function createUser when click on the register button', async() => {
        const wrapper = mount(User, {
            localVue,
            methods: {
                createUser,
            },
            vuetify,
        });

        const btnRegister = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnRegister).toBe(true);

        wrapper.vm.editedIndex = -1;
        await wrapper.vm.save();
        expect(createUser).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogCreate when click on the close register button', async() => {
        const wrapper = mount(User, {
            localVue,
            methods: {
                close,
            },
            vuetify,
        });

        const btnClose = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnClose).toBe(true);

        await wrapper.vm.close();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogUpdate when click on the close update button', async() => {
        const wrapper = mount(User, {
            localVue,
            methods: {
                close,
            },
            vuetify,
        });

        const btnClose = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnClose).toBe(true);

        await wrapper.vm.close();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function updateUser when click on the update button', async() => {
        const wrapper = mount(User, {
            localVue,
            methods: {
                updateUser,
            },
            vuetify,
        });

        const btnOpenMOdalUpdate = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnOpenMOdalUpdate).toBe(true);

        wrapper.vm.editedIndex = 0;
        await wrapper.vm.save();

        expect(updateUser).toHaveBeenCalled();

        wrapper.destroy();
    });

    // test('Test function deleteUser when click on the delete button', async() => {
    //     const wrapper = mount(User, {
    //         localVue,
    //         methods: {
    //             deleteUser,
    //         },
    //         vuetify,
    //     });

    //     const btnOpenMOdalDelete = (wrapper.find('.open-register-modal-btn').exists());
    //     expect(btnOpenMOdalDelete).toBe(true);

    //     await wrapper.vm.deleteUser();

    //     expect(deleteUser).toHaveBeenCalled();

    //     wrapper.destroy();
    // });

    // test('Test function closeDialogDelete when click on the close delete button', async() => {
    //     const wrapper = mount(User, {
    //         localVue,
    //         methods: {
    //             closeDelete,
    //         },
    //         vuetify,
    //     });

    //     const ButtonCloseModalDelete = (wrapper.find('.open-register-modal-btn').exists());
    //     expect(ButtonCloseModalDelete).toBe(true);

    //     await wrapper.vm.closeDelete();
    //     expect(close).toHaveBeenCalled();

    //     wrapper.destroy();
    // });
});
