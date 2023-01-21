import React, { FC, KeyboardEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { TCommon } from 'types/layout';
import { TCls, TErrStream, TInStream, TMiniCommands, TOutStream } from 'types/console';

import { AuthContext } from 'context/Auth.context';
import cn from 'classnames';
import s from './Console.module.scss';

export interface ConsoleProps {
    common: TCommon;
    commands: TMiniCommands;
}

interface ConsoleState {
    buffer: {
        value: string;
        staticLength: number;
    };
    isAccepting: boolean;
    status: string;
}

export const Console: FC<ConsoleProps> = (props) => {
    const { common, commands } = props;
    const authContext = useContext(AuthContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // ----- State ----- //
    const [state, setState] = useState<ConsoleState>({
        buffer: {
            value: '',
            staticLength: 0
        },
        isAccepting: false,
        status: ''
    });

    const setStatus = useCallback((status: string) => setState((prev) => ({ ...prev, status })), []);
    const setAccepting = useCallback((isAccepting: boolean) => setState((prev) => ({ ...prev, isAccepting })), []);
    const setBuffer = useCallback((buffer: ConsoleState['buffer']) => setState((prev) => ({ ...prev, buffer })), []);

    // ----- Streams ----- //
    const outStream: TOutStream = (values, delim = '\n') => {
        const { current } = textAreaRef;
        if (current) {
            const newValue = values.reduce(
                (result, next) => result.concat(`${current.value && next ? delim : ''}${next}`),
                ''
            );
            current.value = current.value.concat(newValue);
            setBuffer({ ...state.buffer, staticLength: current.value.length });
        }
    };

    const errStream: TErrStream = (errorMsg: string) => {
        outStream([`\n\tERROR - ${errorMsg}`]);
    };

    const inStream: TInStream = () => {
        const prefix = authContext?.user?.login || '';
        outStream([`${prefix}> `]);
        setAccepting(true);
    };

    const cls: TCls = () => {
        const { current } = textAreaRef;
        if (current) {
            current.value = '';
        }
    };

    // ----- Handlers ----- //
    const handleFocus = () => {
        if (textAreaRef.current) {
            textAreaRef.current.selectionStart = textAreaRef.current.value.length;
        }
    };

    const handleCommand = (buffer: string) => {
        setAccepting(false);
        const command = commands[buffer as keyof TMiniCommands];
        setBuffer({ ...state.buffer, value: '' });

        if (command === undefined) {
            errStream(`Incorrect command: '${buffer}'`);
            return;
        }
        if (command.run(inStream, outStream, cls)) {
            errStream(`Error executing command: '${buffer}'`);
        }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (!textAreaRef.current) {
            return;
        }
        const { key } = event;
        const {
            buffer,
            buffer: { staticLength }
        } = state;
        const { selectionStart, value } = textAreaRef.current;

        switch (key) {
            case 'Backspace': {
                if (selectionStart <= staticLength) {
                    event.preventDefault();
                }
                break;
            }
            case 'Enter': {
                event.preventDefault();
                setBuffer({ ...buffer, value: value.slice(staticLength).trim() || '' });
                break;
            }
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowRight':
            case 'ArrowLeft': {
                break;
            }
            default: {
                if (/^.$/.test(key) && selectionStart < staticLength) {
                    handleFocus();
                }
                break;
            }
        }
    };

    // ----- Status ----- //
    const updateStatus = () => {
        if (!authContext) {
            setStatus('ERR AUTH CONTEXT');
            return;
        }

        const formStatus = (...values: string[]) => {
            values.push(authContext.loginError || '');
            const status = 'Статус:'.concat(
                values.reduce((result, value) => (value ? result.concat(`\n\t--- ${value}`) : result), '')
            );
            setStatus(status);
        };

        const { user, isLoggedIn } = authContext;

        if (!isLoggedIn) {
            formStatus('Користувач не авторизований');
            return;
        }

        formStatus(user?.resumeUrl ? '' : 'Резюме не завантажено', user?.tests ? 'Доступні тести' : '');
    };

    // ----- CYCLE ----- //
    // ----- ComponentDidMount ----- //
    useEffect(() => {
        updateStatus();
        cls();
        outStream([`\t${common.name}, site ${common.siteVersion}, ${new Date()}) [HTML-CSS & JS (spec.)] on linux`]);
    }, []);

    // ----- ComponentDidUpdate - loggedIn----- //
    useEffect(() => {
        if (authContext?.isLoggedIn) {
            updateStatus();
        }
    }, [authContext?.isLoggedIn]);

    // ----- ComponentDidUpdate - acceptingState ----- //
    useEffect(() => {
        if (state.isAccepting) {
            textAreaRef?.current?.focus();
        } else {
            inStream();
        }
    }, [state.isAccepting]);

    // ----- ComponentDidUpdate - bufferState ----- //
    useEffect(() => {
        if (state.buffer.value) {
            handleCommand(state.buffer.value);
        }
    }, [state.buffer.value]);

    return (
        <section className={cn('section', s.console)}>
            <textarea
                className={s.consoleUtil}
                disabled={!state.isAccepting}
                onKeyDown={(event) => handleKeyDown(event)}
                onFocus={() => handleFocus()}
                ref={textAreaRef}
            />
            <div className={s.consoleStatus}>
                <pre>{state.status}</pre>
            </div>
        </section>
    );
};
