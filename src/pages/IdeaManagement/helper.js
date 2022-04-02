import { MakeToast } from '@/toast/toastMessage';

export function isPassValidation(DATA = {}) {
    if (DATA) {
        if (DATA.file.length === 0 || DATA.file === undefined) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'File is required.',
            });
        } else if (DATA.file.size > 2000000) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'File size must be less than 50MB',
            });
        } else if (DATA.title.length === 0) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Idea title is required.',
            });
        } else if (DATA.category === null) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Idea category is required.',
            });
        } else if (DATA.editorData === 'Enter your idea content here...') {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Idea content is required.',
            });
        } else if (DATA.author.length === 0) {
            MakeToast({
                variant: 'warning',
                title: 'Warning',
                content: 'Author is required.',
            });
        } else {
            return true;
        }
    }

    return false;
}
