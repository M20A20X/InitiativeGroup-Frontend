import { PAGE_REDIRECT_TIME } from 'assets/static/common';

export const redirectPage = (url: string, relative = true, target = '_blank', redirectTime = PAGE_REDIRECT_TIME) => {
    setTimeout(
        () => window.open(relative ? `${window.location.href}/${url}` : url, target, 'noopener,noreferrer'),
        redirectTime
    );
};
