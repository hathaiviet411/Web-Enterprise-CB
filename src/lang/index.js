import Vue from 'vue';
import VueI18n from 'vue-i18n';

// File translate
import enLocale from './subs/en';
import vnLocale from './subs/vn';

// Function helper
import { getLanguage } from './helper/getLang';

Vue.use(VueI18n);

const messages = {
    en: enLocale,
    vn: vnLocale,
};

const i18n = new VueI18n({
    locale: getLanguage(),
    messages,
});

export default i18n;
