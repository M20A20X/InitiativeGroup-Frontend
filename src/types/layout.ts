import { COMMON } from 'assets/static/common';
import { MouseEventHandler } from 'react';

export type TCommon = typeof COMMON;
export type TLink = (typeof COMMON.layoutElem.navLinks.other)[number] & { clickHandler?: MouseEventHandler };
