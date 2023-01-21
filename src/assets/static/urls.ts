export const PAGE_URL = {
    root: '/',
    main: 'main',
    projects: 'projects',
    study: 'study',
    about: 'about',
    profile: 'profile',
    cooperation: {
        root: 'cooperation',
        tests: 'tests'
    }
};

const API_ROOT = 'http://192.168.0.101:5000/';
const API_URL = {
    login: 'auth/login'
};

export const getApi = (endpoint: keyof typeof API_URL) => API_ROOT + API_URL[endpoint];
