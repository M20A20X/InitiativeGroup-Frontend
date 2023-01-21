import Ajv, { JSONSchemaType } from 'ajv';
import { TAuthUser } from 'types/auth.context';

const ajv = new Ajv();

const SAuthUser: JSONSchemaType<TAuthUser> = {
    type: 'object',
    properties: {
        uuid: { type: 'object' },
        email: { type: 'string' },
        lastLogin: { type: 'string' },
        login: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
        patronymic: { type: 'string' },
        surname: { type: 'string' },
        telephone: { type: 'string' },
        resumeUrl: { type: 'string' },
        tests: { type: 'array', items: { type: 'number' } }
    },
    required: [
        'uuid',
        'email',
        'lastLogin',
        'login',
        'name',
        'password',
        'patronymic',
        'surname',
        'telephone',
        'resumeUrl',
        'tests'
    ]
};

export const VSAuthUser = ajv.compile(SAuthUser);
