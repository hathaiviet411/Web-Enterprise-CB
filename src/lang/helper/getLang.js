import Cookies from 'js-cookie';

/**
 * Function get Current Language in Cookies
 * @returns Current Language (String)
 */
export function getLanguage() {
    const language = Cookies.get('language');

    if (language) {
        return language;
    }

    return process.env.VUE_APP_LANGUAGE || 'en';
}
