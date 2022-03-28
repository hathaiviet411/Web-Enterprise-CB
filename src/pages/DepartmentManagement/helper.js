import { MakeToast } from '@/toast/toastMessage';

export function isPassValidation(DATA = {}) {
    if (DATA) {
        if (DATA.departmentName.length === 0) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Department name is required.',
            });
        } else {
            return true;
        }
    }

    return false;
}
