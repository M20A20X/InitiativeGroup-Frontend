import React, { FC } from 'react';

import { TCommon } from 'types/layout';

import { NavLinkElem } from 'components/Layout/Nav/Link';

import s from './Nav.module.scss';

interface NavProps {
    navLinks: TCommon['layoutElem']['navLinks'];
}

export const Nav: FC<NavProps> = (props) => {
    const { navLinks } = props;

    const navLinkElems = (() => {
        const { profile } = navLinks;

        const elems = navLinks.other.map((link) => (
            <NavLinkElem
                key={JSON.stringify(link)}
                elem={{ ...link, classNames: s.navBtn }}
            />
        ));

        const profileElem = (
            <NavLinkElem
                key={JSON.stringify(profile)}
                elem={{
                    href: profile.href,
                    name: profile.defaultName,
                    classNames: [s.navBtn, s.profile],
                    clickHandler: () => {}
                }}
            />
        );
        return [...elems, profileElem];
    })();

    return (
        <nav className={s.nav}>
            <ul>{navLinkElems}</ul>
        </nav>
    );
};
