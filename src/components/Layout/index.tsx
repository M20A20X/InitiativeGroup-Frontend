import React, { FC } from 'react';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faCopyright, faHeart } from '@fortawesome/free-solid-svg-icons';

import { TCommon } from 'types/layout';

import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';

import s from './Layout.module.scss';

export interface LayoutProps {
    common: TCommon;
}

export const Layout: FC<LayoutProps> = (props) => {
    const {
        common,
        common: {
            layoutElem: { navLinks }
        }
    } = props;

    return (
        <div className={s.wrapper}>
            <header className={s.header}>
                <a
                    href={navLinks.other[0].href}
                    className={s.logoLink}
                >
                    <figure>
                        <img
                            className={s.logoIcon}
                            src={common.logoIcon}
                            alt='logo'
                        />
                        <figcaption className={s.logoText}>
                            <span>{common.name}</span>
                        </figcaption>
                    </figure>
                </a>
                <Nav navLinks={navLinks} />
            </header>
            <main className={s.main}>
                <div className={s.content}>
                    <Outlet />
                </div>
            </main>
            <footer className={s.footer}>
                <span>
                    Made with&nbsp;
                    <FAIcon
                        icon={faHeart}
                        className={s.footerHeart}
                    />
                    &nbsp;{common.shortName}-Team
                </span>
                <span>
                    Copyright&nbsp;
                    <FAIcon
                        icon={faCopyright}
                        className={s.footerCopyright}
                    />
                    &nbsp;
                    {common.shortName}-Team
                </span>
            </footer>
        </div>
    );
};
