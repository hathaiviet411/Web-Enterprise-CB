import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Category from '../../pages/CategoryManagement/index.vue';
import Vuetify from 'vuetify';

describe('Category Management: Component Rendering UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    test('Test category screen is rendered', () => {
        const wrapper = shallowMount(Category, {
            localVue,
            vuetify,
        });

        const CategoryScreen = wrapper.find('.category-screen');
        expect(CategoryScreen.exists()).toBe(true);

        wrapper.destroy();
    });

    test('Test table category list is rendered', () => {
        const wrapper = shallowMount(Category, {
            localVue,
            vuetify,
        });

        const CategoryTable = wrapper.find('.table-category-list');
        expect(CategoryTable.exists()).toBe(true);

        wrapper.destroy();
    });
});

describe('Category Management: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const getListCategory = jest.fn();
    const createNewCategory = jest.fn();
    const updateCategory = jest.fn();
    const removeCategory = jest.fn();
    const close = jest.fn();
    const closeDelete = jest.fn();

    test('Test function call api get list category when created', async() => {
        const wrapper = shallowMount(Category, {
            localVue,
            methods: {
                getListCategory,
            },
            vuetify,
        });

        await wrapper.vm.getListCategory();
        expect(getListCategory).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function fetch data from the api to the table content', async() => {
        const wrapper = shallowMount(Category, {
            localVue,
            methods: {
                getListCategory,
            },
            vuetify,
        });

        const vFields = [
            {
                text: 'Category Name',
                value: 'categoryName',
                sortable: true,
                align: 'start',
            },
            { text: 'First Closure Date', value: 'firstClosureDate', sortable: true },
            { text: 'Final Closure Date', value: 'finalClosureDate', sortable: true },
            { text: 'Actions', value: 'actions', sortable: false },
        ];

        const vItems = [];

        expect(wrapper.vm.vFields).toEqual(vFields);
        expect(wrapper.vm.vItems).toEqual(vItems);

        wrapper.vm.getListCategory();
        expect(getListCategory).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function createNewCategory when click on the register button', async() => {
        const wrapper = mount(Category, {
            localVue,
            methods: {
                createNewCategory,
            },
            vuetify,
        });

        const btnRegister = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnRegister).toBe(true);

        wrapper.vm.editedIndex = -1;
        await wrapper.vm.save();

        expect(createNewCategory).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogCreate when click on the close register button', async() => {
        const wrapper = mount(Category, {
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

    test('Test function updateCategory when click on the update button', async() => {
        const wrapper = mount(Category, {
            localVue,
            methods: {
                updateCategory,
            },
            vuetify,
        });

        const btnUpdate = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnUpdate).toBe(true);

        wrapper.vm.editedIndex = 0;
        await wrapper.vm.save();

        expect(updateCategory).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogUpdate when click on the close update button', async() => {
        const wrapper = mount(Category, {
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

    test('Test function removeCategory when click on the delete button', async() => {
        const wrapper = mount(Category, {
            localVue,
            methods: {
                removeCategory,
            },
            vuetify,
        });

        const btnDelete = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnDelete).toBe(true);

        await wrapper.vm.removeCategory();

        expect(removeCategory).toHaveBeenCalled();

        wrapper.destroy();
    });

    test('Test function closeDialogDelete when click on the close delete button', async() => {
        const wrapper = mount(Category, {
            localVue,
            methods: {
                closeDelete,
            },
            vuetify,
        });

        const btnClose = (wrapper.find('.open-register-modal-btn').exists());
        expect(btnClose).toBe(true);

        await wrapper.vm.closeDelete();
        expect(closeDelete).toHaveBeenCalled();

        wrapper.destroy();
    });
});
