import { MakeToast } from '@/toast/toastMessage';

export function isPassValidation(DATA = {}) {
    if (DATA) {
        if (DATA.categoryName.length === 0) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Category name is required.',
            });
        } else if (DATA.firstClosureDate.length === 0) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'First closure date is required.',
            });
        } else if (DATA.finalClosureDate.length === 0) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Final closure date is required.',
            });
        } else {
            return true;
        }
    }

    return false;
}
