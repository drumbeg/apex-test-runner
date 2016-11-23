/* jslint node: true */
/* global Dictionary, English, casper, xpath, __utils__ */
"use strict";

module.exports.init = function() {
    var dictionary = new Dictionary()
        .define('COUNT', /(\d+)/);
    var baseUrl = casper.cli.get('baseUrl'),
        user = casper.cli.get('user'),
        password = casper.cli.get('password');

    var library = English.library(dictionary)
        .given("I go to page $PAGE", function (page) {
            baseUrl = baseUrl.replace(/(\/)$/,'');
            casper.open(baseUrl + "/f?p=1:" + page);
            casper.then( function() {
                casper.fillSelectors('form[action="wwv_flow.accept"]', {
                    '#P101_USERNAME': user,
                    '#P101_PASSWORD': password,
                }, true);
            });
            var re = new RegExp('f\?p=1:' + page);
            casper.waitForUrl(re,null,null,20000);
        })

        .given("I go to page $PAGE", function (page) {
            baseUrl = baseUrl.replace(/(\/)$/,'');
            casper.open(baseUrl + "/f?p=1:" + page);
            casper.then( function() {
                casper.fillSelectors('form[action="wwv_flow.accept"]', {
                    '#P101_USERNAME': user,
                    '#P101_PASSWORD': password,
                }, true);
            });
            var re = new RegExp('f\?p=1:' + page);
            casper.waitForUrl(re,null,null,20000);
        })

        .given("I go to $URL", function(url) {
            casper.open(url);
        })

        .when("I click on link '$LINK'", function (link) {
            casper.clickLabel(link, 'a');
        })

        .when("I click on $ITEM", function (item) {
            casper.click('#'+item);
        })

        .when("I enter '$TEXT' in page item $ITEM", function (text, item) {
            casper.sendKeys('#'+item, text);
        })

        .then("the text '$TEXT' is visible", function (text) {
            casper.test.assertTextExists(
                text,
                'Expected text is visible on the page'
            );
        })

        .then("the title is '$TITLE'", function (title) {
            casper.test.assertTitle(
                title,
                'Expected title is visible on the page'
            );
        })

    return library;
};