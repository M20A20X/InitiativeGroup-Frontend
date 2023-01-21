export type TCls = () => void;
export type TInStream = () => void;
export type TOutStream = (values: string[], delim?: string) => void;
export type TErrStream = (msg: string) => void;

type TCommand = {
    description: string;
    run: (inStream: TInStream, outStream: TOutStream, cls?: TCls) => boolean;
};

type TCommandDict<K extends string> = { [key in K]: TCommand };

type TBaseCommandNames = 'clear' | 'help';
type TMiniCommandNames = 'tests';

export type TBaseCommands = TCommandDict<TBaseCommandNames>;
export type TMiniCommands = TBaseCommands & TCommandDict<TMiniCommandNames>;
