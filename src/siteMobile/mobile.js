import './mobile.html';
import 'antd-mobile/dist/antd-mobile.css';
import './mobile.less';
import dva from 'dva';
import plugins from './plugins';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(plugins);

// 3. Model
// common
app.model(require('../models/io'));
app.model(require('../models/sys'));
app.model(require('../models/device'));
app.model(require('../models/staticScene'));
// specific


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
