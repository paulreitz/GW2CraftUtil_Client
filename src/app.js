import Startup from './startup/Startup';
if (process.env.NODE_ENV !== 'test') {
    require('normalize.css/normalize.css');
    require('../styles/styles.scss');
}


const startup = new Startup();
