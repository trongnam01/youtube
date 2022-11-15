import FilterSearch from '~/pages/FilterSearch';
import Home from '~/pages/Home';
import Library from '~/pages/Library';
import New from '~/pages/New';
import PlayVideo from '~/pages/PlayVideo/PlayVideo';
import Register from '~/pages/Register';
import Shorts from '~/pages/Shorts';
import UserChannel from '~/pages/UserChannel';
import Login from '~/pages/Login';
import Whatched from '~/pages/Watched';

export const publicRouters = [
    { path: '/', component: Home },
    { path: '/new', component: New },
    { path: '/login', component: Login, layout: null },
    { path: '/shorts', component: Shorts },
    { path: '/watched', component: Whatched },
    { path: '/search/:value', component: FilterSearch },
    { path: '/register', component: Register },
    { path: '/library', component: Library },
    { path: '/watch/@:name', component: PlayVideo },
    { path: '/channel/@:channel', component: UserChannel },
];
