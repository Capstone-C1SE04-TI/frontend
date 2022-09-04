import Home, { Signup, SignIn } from '~/pages';

import configs from '~/configs';

const publicRoutes = [
    {
        path: configs.routes.signUp,
        component: Signup,
    },
    {
        path: configs.routes.signIn,
        component: SignIn,
    },
    {
        path: configs.routes.home,
        component: Home,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
