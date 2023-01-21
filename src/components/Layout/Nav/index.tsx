import React, { FC, useContext } from 'react';

import { AuthContext } from 'context/Auth.context';

import { TCommon } from 'types/layout';

import { NavLinkElem } from 'components/Layout/Nav/Link';

import s from './Nav.module.scss';

interface NavProps {
    navLinks: TCommon['layoutElem']['navLinks'];
}

export const Nav: FC<NavProps> = (props) => {
    const { navLinks } = props;
    const authContext = useContext(AuthContext);

    const navLinkElems = (() => {
        const { profile } = navLinks;
        const isLoggedIn = authContext?.isLoggedIn;

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
                    href: isLoggedIn ? profile.href : '#',
                    name: isLoggedIn ? profile.loggedName : profile.defaultName,
                    classNames: [s.navBtn, s.profile],
                    clickHandler: async () => {}
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
