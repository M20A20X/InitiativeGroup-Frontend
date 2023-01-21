import React, { ChangeEventHandler, FC, useContext, useState } from 'react';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faFile, faTimesSquare } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from 'context/Auth.context';
import { TAuthContext } from 'types/auth.context';

import cn from 'classnames';

import s from './Resume.module.scss';

interface ResumeState {
    file: { item: File | null; status: boolean };
}

export const Resume: FC = () => {
    const authContext = useContext(AuthContext);
    const [fileState, changeFileState] = useState<ResumeState['file']>({ item: null, status: false });

    /// ----- HANDLERS ----- ///
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        if (event.currentTarget?.files !== null) {
            const newFileState: ResumeState['file'] = { item: event.currentTarget.files[0], status: true };
            changeFileState(newFileState);
        }
    };

    /// ----- RENDER ----- ///
    const formHead = (isLoggedIn: boolean, hasResumeUrl: boolean) => {
        let status: string;
        if (!isLoggedIn) {
            status = 'Користувач не авторизований';
        } else if (hasResumeUrl) {
            status = 'Резюме вже завантажено';
        } else {
            status = 'Завантажити резюме:';
        }

        return (
            <div className={s.uploadTitle}>
                <h2>{status}</h2>
            </div>
        );
    };

    const formResumeField = (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
            return null;
        }
        return (
            <form className={s.form}>
                <div className={s.formStatus}>
                    <label
                        className={cn('clickable')}
                        htmlFor={s.formInput}
                    >
                        <input
                            id={s.formInput}
                            className={s.formInput}
                            type='file'
                            accept='.doc,.docx'
                            onChange={(event) => handleFileChange(event)}
                        />
                        <figure className={s.formAltUpload}>
                            <FAIcon icon={faFile} />
                            <figcaption>&nbsp;Натисніть, щоб додати Ваш документ</figcaption>
                        </figure>
                    </label>
                    <span>
                        Статус:&nbsp;
                        <FAIcon
                            icon={fileState.status ? faCheckSquare : faTimesSquare}
                            style={{ color: fileState.status ? 'green' : 'red' }}
                        />
                        &nbsp;
                        {fileState.status ? fileState.item?.name : 'Файл не додано'}
                    </span>
                </div>
                <button
                    type='submit'
                    className={cn(s.formSubmit, 'clickable')}
                >
                    Підтвердити
                </button>
            </form>
        );
    };
    const formResumeSection = (auth: TAuthContext | null) => {
        if (!auth) {
            return 'ERR NULL AUTH-CONTEXT';
        }

        const { isLoggedIn, user } = auth;
        const hasResume = Boolean(user?.resumeUrl);

        return (
            <>
                {formHead(isLoggedIn, hasResume)}
                {formResumeField(isLoggedIn)}
            </>
        );
    };

    return <section className={cn('section', s.upload)}>{formResumeSection(authContext)}</section>;
};
