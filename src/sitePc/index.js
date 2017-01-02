import './index.html';
import 'antd/dist/antd.css';
import './index.less';
import dva from 'dva';
import plugins from './plugins';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(plugins);

// 3. Model
app.model(require('../models/io'));
app.model(require('../models/sys'));
app.model(require('../models/device'));
app.model(require('../models/lamp'));
app.model(require('../models/sensorTemperature'));
app.model(require('../models/staticScene'));
app.model(require('../models/staticSceneEditor'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
