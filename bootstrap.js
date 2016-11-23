// The following code requires casper 1.1 after the following commit
// https://github.com/n1k0/casperjs/commit/2378537a716a492533a279b8e3bc560ae3deca5a

/* jslint node: true */
/* global casper */
"use strict";

var fs = require('fs');
var async = require('async');
var Yadda = require('yadda');
var xpath = require('casper').selectXPath;

var Dictionary = Yadda.Dictionary;
var English = Yadda.localisation.English;
var sessionNo = casper.cli.get('session-no');

var parser = new Yadda.parsers.FeatureParser();
var library = require('./library').init();
var yadda = Yadda.createInstance(library);
Yadda.plugins.casper(yadda, casper);
// casper.options.viewportSize = { width: 950, height: 950 };
casper.echo(casper.cli.get('feature'));
new Yadda.FeatureFileSearch('features').each(function (file) {
    var feature = parser.parse(fs.read(file));
    if (casper.cli.get('feature') === "undefined" || file == "features\\" + casper.cli.get('feature')) {
        casper.test.begin(feature.title, function suite(test) {
            async.eachSeries(feature.scenarios, function(scenario, next) {
                casper.echo('');
                casper.echo('Scenario');
                casper.echo('--------');
                casper.start();
                casper.test.info(scenario.title);
                casper.test.on('success', function() { casper.capture('public/screen.png'); });
                casper.test.on('failure', function() { casper.capture('public/screen.png'); });
                casper.yadda(scenario.steps);
                casper.run(function() {
                    next();
                });
            }, function(err) {
                casper.capture('public/screen.png');
                casper.test.done();
            });
        });
    }
});
