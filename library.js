/* jslint node: true */
/* global Dictionary, English, casper, xpath, __utils__ */
"use strict";

module.exports.init = function() {
    var dictionary = new Dictionary()
        .define('COUNT', /(\d+)/);

    var library = English.library(dictionary)

        .given("I go to $URL", function(url) {
            casper.open(url);
        })

        .when("I click on link '$LINK'", function (link) {
            casper.clickLabel(link, 'a');
        })

        .then("the text '$TEXT' is visible", function (text) {
            casper.test.assertTextExists(
                text,
                'Expected text is visible on the page'
            );
        })

    return library;
};