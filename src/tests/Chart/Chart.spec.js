import { createLocalVue, mount } from '@vue/test-utils';
import Chart from '../../pages/ChartManagement/index.vue';
import Chartjs from 'chart.js';
import Vuetify from 'vuetify';

describe('Chart: Functionality UT', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const initialData = jest.fn();

    // const initialBarChartLike = jest.fn();
    // const initialBarChartDislike = jest.fn();
    // const initialDoughnutChart = jest.fn();
    // const initialBarChartView = jest.fn();
    // const initialBarChartComment = jest.fn();

    // const getTotalData = jest.fn();

    test('Test function call api get list chart when created', () => {
        const wrapper = mount(Chart, {
            localVue,
            vuetify,
            methods: {
                initialData,
            },
            Chartjs,
        });

        wrapper.vm.initialData();
        expect(initialData).toHaveBeenCalled();

        wrapper.destroy();
    });
});

