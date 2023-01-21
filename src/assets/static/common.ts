import { PAGE_URL } from 'assets/static/urls';
import logoIcon from 'assets/images/logo.png';

export const PAGE_REDIRECT_TIME = 3000;

export const COMMON = {
    logoIcon,
    name: 'Initiative Group',
    shortName: 'IG',
    siteVersion: 'v0.8.0 (v0.8.0:a1)',
    layoutElem: {
        navLinks: {
            profile: {
                href: PAGE_URL.profile,
                defaultName: 'Увійти',
                loggedName: 'Профіль'
            },
            other: [
                {
                    href: PAGE_URL.main,
                    name: 'Головна'
                },
                {
                    href: PAGE_URL.projects,
                    name: 'Проєкти'
                },
                {
                    href: PAGE_URL.study,
                    name: 'Навчання'
                },
                {
                    href: PAGE_URL.cooperation.root,
                    name: 'Співпраця'
                },
                {
                    href: PAGE_URL.about,
                    name: 'Про нас'
                }
            ]
        }
    }
};
