import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PAGE_URL } from 'assets/static/urls';
import { COMMON } from 'assets/static/common';

import { Layout } from 'components/Layout';

export const RouterProvider = () =>
    // prettier-ignore
    <BrowserRouter>
        <Routes>
            <Route path={PAGE_URL.root} element={<Layout common={COMMON}/>}>
                <Route path={PAGE_URL.main} element={<>main</>}/>
                <Route path={PAGE_URL.projects} element={<>projects</>}/>
                <Route path={PAGE_URL.study} element={<>study</>}/>
                <Route path={PAGE_URL.about} element={<>about</>}/>
                <Route path={PAGE_URL.profile} element={<>profile</>}/>
                <Route path={PAGE_URL.cooperation.root}>
                    <Route index element={<>cooperation</>}/>
                    <Route path={PAGE_URL.cooperation.tests} element={<>coop-tests</>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>;
