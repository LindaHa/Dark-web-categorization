// @ts-ignore
require.context('../public/', true);
// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/index.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppWrappper } from './_shared/components/AppWrapper';

ReactDOM.render(<AppWrappper/>, document.getElementById('app-root'));
