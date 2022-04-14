import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Idea from '../../pages/IdeaManagement/index.vue';
import Vuetify from 'vuetify';
import store from '@/store';

describe('Idea Management: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    test('Test idea screen is rendered', () => {
        const wrapper = shallowMount(Idea, {
            localVue,
            vuetify,
            store,
        });

        const IdeaScreen = wrapper.find('.idea-screen');
        expect(IdeaScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test table idea list is rendered', () => {
        const wrapper = shallowMount(Idea, {
            localVue,
            vuetify,
            store,
        });

        const IdeaTable = wrapper.find('.table-idea-list');
        expect(IdeaTable.exists()).toBe(true);

        wrapper.destroy();
    });
});

describe('Idea Management: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const initData = jest.fn();
    const getListUsers = jest.fn();
    const getListDepartment = jest.fn();
    const getListCategory = jest.fn();
    const createNewIdea = jest.fn();
    const updateIdea = jest.fn();
    const deleteIdea = jest.fn();
    const close = jest.fn();
    const closeDelete = jest.fn();

    test('Test function call api get list idea when created', async() => {
        const wrapper = shallowMount(Idea, {
            localVue,
            methods: {
                initData,
                getListUsers,
                getListDepartment,
                getListCategory,
            },
            vuetify,
            store,
        });

        await wrapper.vm.initData();
        await wrapper.vm.getListUsers();
        await wrapper.vm.getListDepartment();
        await wrapper.vm.getListCategory();

        expect(initData).toHaveBeenCalled();
        expect(getListUsers).toHaveBeenCalled();
        expect(getListDepartment).toHaveBeenCalled();
        expect(getListCategory).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function fetch data from the api to the table content', async() => {
        const wrapper = shallowMount(Idea, {
            localVue,
            methods: {
                initData,
                getListUsers,
            },
            vuetify,
            store,
        });

        const vFields = [
            { text: 'Idea', align: 'start', sortable: false, value: 'ideaTitle' },
            { text: 'Category', sortable: false, value: 'category' },
            { text: 'Department', sortable: false, value: 'department' },
            { text: 'Likes', sortable: false, value: 'likes' },
            { text: 'Dislikes', sortable: false, value: 'dislikes' },
            { text: 'Views', sortable: false, value: 'viewCount' },
            { text: 'Author', sortable: false, value: 'user' },
            { text: 'Posted Date', sortable: false, value: 'createdAt' },
            { text: 'Zip Download', sortable: false, value: 'zip', align: 'center' },
            { text: 'Actions', sortable: false, value: 'actions' },
        ];

        const vItems = [];

        expect(wrapper.vm.vFields).toEqual(vFields);
        expect(wrapper.vm.vItems).toEqual(vItems);

        await wrapper.vm.initData();
        await wrapper.vm.getListUsers();

        expect(initData).toHaveBeenCalled();
        expect(getListUsers).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function createIdea when click on the register button', async() => {
        const wrapper = mount(Idea, {
            localVue,
            methods: {
                createNewIdea,
            },
            vuetify,
            store,
        });

        const btnRegister = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnRegister).toBe(true);

        await wrapper.vm.createNewIdea();
        expect(createNewIdea).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogCreate when click on the close register button', async() => {
        const wrapper = mount(Idea, {
            localVue,
            methods: {
                close,
            },
            vuetify,
            store,
        });

        const btnClose = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnClose).toBe(true);

        await wrapper.vm.close();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function updateIdea when click on the update button', async() => {
        const wrapper = mount(Idea, {
            localVue,
            methods: {
                updateIdea,
            },
            vuetify,
            store,
        });

        const btnUpdate = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnUpdate).toBe(true);

        await wrapper.vm.updateIdea();
        expect(updateIdea).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogUpdate when click on the close update button', async() => {
        const wrapper = mount(Idea, {
            localVue,
            methods: {
                close,
            },
            vuetify,
            store,
        });

        const btnClose = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnClose).toBe(true);

        await wrapper.vm.close();
        expect(close).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function deleteIdea when click on the delete button', async() => {
        const wrapper = mount(Idea, {
            localVue,
            methods: {
                deleteIdea,
            },
            vuetify,
            store,
        });

        const btnDelete = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnDelete).toBe(true);

        await wrapper.vm.deleteIdea();
        expect(deleteIdea).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogDelete when click on the close delete button', async() => {
        const wrapper = mount(Idea, {
            localVue,
            methods: {
                closeDelete,
            },
            vuetify,
            store,
        });

        const btnClose = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnClose).toBe(true);

        await wrapper.vm.closeDelete();
        expect(closeDelete).toHaveBeenCalled();

        wrapper.destroy();
    });
});
