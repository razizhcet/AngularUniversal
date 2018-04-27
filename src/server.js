
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const {
    ServerAppModuleNgFactory,
    LAZY_MODULE_MAP
 } = require(`./dist-server/main.bundle`);

 //call the provideModuleMap() method and pass it the module map
 const provider = provideModuleMap(LAZY_MODULE_MAP);

// Angular requires Zone.js
require('zone.js/dist/zone-node');

const express = require('express');
const ngExpressEngine = require('@nguniversal/express-engine/modules/express-engine')
    .ngExpressEngine;
const fs = require('fs');

// Find the main.hash.bundle in the dist-server folder
var files;
try {
    files = fs.readdirSync(`${process.cwd()}/dist-server`);
} catch (error) {
    console.error(error);
}
var mainFiles = files.filter(file => file.startsWith('main'));
var split = mainFiles[0].split('.');
var hash = '';
if (split.length > 3) hash = split[1] + '.';
var {
    ServerAppModuleNgFactory,
    LAZY_MODULE_MAP
} = require(`./dist-server/main.${hash}bundle`);

//create out express app by calling express().
const app = express();

//create and specify the view engine
app.engine(
    'html',
    ngExpressEngine({
        bootstrap: ServerAppModuleNgFactory,
        providers: [provider]
    })
);

app.set('view engine', 'html');
app.set('views', __dirname);

//to serve static angular files add the dist and the assets folder to the application.
app.use(express.static(__dirname + '/assets', { index: false }));
app.use(express.static(__dirname + '/dist', { index: false }));

//set up a default route, that calls the ngExpress view engine.
app.get('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('./dist/index', {
        req: req,
        res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

//start the app by calling
app.listen(process.env.PORT || 8080, () => {});