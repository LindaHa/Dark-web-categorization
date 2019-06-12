require.context('../public/', true);
// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppWrappper } from "./AppWrapper.tsx";

ReactDOM.render(<AppWrappper/>, document.getElementById('app-root'));
