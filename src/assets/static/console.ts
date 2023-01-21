import { TBaseCommands, TMiniCommands } from 'types/console';
import { PAGE_URL } from 'assets/static/urls';
import { redirectPage } from 'utils/redirect';

const BASE_COMMANDS: TBaseCommands = {
    clear: {
        description: 'Очищення екрану терміналу',
        run: (inStream, outStream, cls) => {
            if (cls) {
                cls();
            }
            return false;
        }
    },
    help: {
        description: 'Допомога',
        run: (inStream, outStream) => {
            const helpMsg = Object.keys(BASE_COMMANDS).reduce((result, name) => {
                const { description } = BASE_COMMANDS[name as keyof TBaseCommands];
                return `\t${name}: ${description}\n`;
            }, '');

            outStream([`Доступні команди:\n${helpMsg}`]);
            return false;
        }
    }
};
export const MINI_CONSOLE_COMMANDS: TMiniCommands = {
    ...BASE_COMMANDS,
    tests: {
        description: 'Початок тестування',
        run: (inStream, outStream) => {
            outStream([`\tРозпочинаємо...`]);
            redirectPage(PAGE_URL.cooperation.tests);
            return false;
        }
    }
};
