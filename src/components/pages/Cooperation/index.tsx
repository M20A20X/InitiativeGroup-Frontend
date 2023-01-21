import React, { FC } from 'react';

import cn from 'classnames';

import { TCommon } from 'types/layout';
import { TMiniCommands } from 'types/console';
import { Console } from './Console';
import { Resume } from './Resume';

import s from './Cooperation.module.scss';

interface CooperationProps {
    common: TCommon;
    commands: TMiniCommands;
}

export const Cooperation: FC<CooperationProps> = (props) => {
    const { commands, common } = props;

    return (
        <>
            <section className='section'>
                <h2 className={s.instructionH2}>Інструкція</h2>
                <p>Для того щоб розпочати з нами співпрацю, необхідно (і достатньо):</p>
                <ol>
                    <li>Завантажити резюме</li>
                    <li>
                        Пройти тести:
                        <ol>
                            <li>Тест з англійської</li>
                            <li>Soft skills</li>
                            <li>Технічний тест</li>
                        </ol>
                    </li>
                </ol>
                <p>
                    Кожен тест є тестом з варіантами (?) відповіді та обмеженням у часі (1:30 години на кожен), по
                    завершенню усіх дій може знадобитися перевірка адміністрації, після чого буде усна співбесіда. Wish
                    you a good лук!
                </p>
            </section>
            <Resume />
            <Console
                commands={commands}
                common={common}
            />
        </>
    );
};
