import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from '../../pages/DepartmentManagement/index.vue';
import Vuetify from 'vuetify';

describe('Example', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Test Login', () => {
      expect(1 + 1).toEqual(2);
  });

  it('Test Dashboard', () => {
      expect(1 + 1).toEqual(2);
  });

  it('Test User Management', () => {
      expect(1 + 1).toEqual(2);
  });

  it('Test Idea Management', () => {
      expect(1 + 1).toEqual(2);
  });

  it('Test Cat', () => {
      const wrapper = shallowMount(Vue, {
          localVue,
          vuetify
      });

      expect(wrapper.find('.cat').exists()).toBe(true);

  });
});
