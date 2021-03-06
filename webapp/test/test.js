/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 © NVISIA, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function() {
    "use strict";

    Application.rootElement = '#ember-fixture';
    Application.setupForTesting();
    Application.injectTestHelpers();

    module('Application Tests', {
        setup: function() {
            Application.reset();
        }
    });

    test("Root lists restaurants", function() {
        visit("/");
        andThen(function() {
            ok($('.restaurant-list .callout.panel.radius').length > 0, "Restaurants rendered");
        });
    });

    asyncTest("View single restaurant", function() {
        $.ajax('/restaurants').then(function(list) {
            start();
            visit('/restaurant/' + list[0].id);
            andThen(function() {
                ok($('.availableTimes').length === 1, "Single Restaurant rendered");
            });
        });
    });

    asyncTest("Form is rendered", function() {
        $.ajax('/restaurants').then(function(list) {
            start();
            visit('/restaurant/' + list[0].id);
            click('.availableTimes a:first');
            andThen(function() {
                ok($('.reservationForm:visible').length === 1)
            });
        });
    });

    asyncTest("Form validation works", function() {
        $.ajax('/restaurants').then(function(list) {
            start();
            visit('/restaurant/' + list[0].id);
            click('.availableTimes a:first');
            click('.button.submitButton');
            andThen(function() {
                ok($('.error-box:visible').length === 1);
            });
        });
    });
})();