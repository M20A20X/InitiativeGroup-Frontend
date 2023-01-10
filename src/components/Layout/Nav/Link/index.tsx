import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { TLink } from 'types/layout';

import cn from 'classnames';

interface NavLinkElemProps {
    elem: TLink & { classNames: string[] };
}

export const NavLinkElem: FC<NavLinkElemProps> = (props) => {
    const { href, name, clickHandler, classNames } = props.elem;

    return (
        <li className={cn(classNames)}>
            <NavLink
                to={href}
                className='clickable'
                onClick={(event) => clickHandler?.(event)}
            >
                {name}
            </NavLink>
        </li>
    );
};
