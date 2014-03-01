/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function() {
    //Load
    $('#simple-menu').sidr();
    var source   = $('#entry-template').html();
    var template = Handlebars.compile(source);
    $('.container-content').html(template);
    $.bbq.pushState({ url: 'entry-template' });

    //Handle Navigation
    $('ul.app-nav a').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var source = $('#' + target).html();
        var template = Handlebars.compile(source);
        $('.container-content').html(template);
        $.bbq.pushState({ url: target });
        $.sidr('close');
    });

    //Handle swipes on menu
    $(window).touchwipe({
        wipeLeft: function() {
            // Close
            $.sidr('close');
        },
        wipeRight: function() {
            // Open
            $.sidr('open');
        },
        preventDefaultEvents: false
    });

    //Toggle settings buttons
    $('.container-content').on('click', '.btn-toggle',function() {
        $(this).find('.btn').toggleClass('active').toggleClass('btn-default').toggleClass('btn-primary');
    });


    //Submit form
    $('.container-content').on('submit', 'form', function (e) {
        e.preventDefault();
        var items = $(this).serializeArray();
        $.post('http://loyolalawtech.org:3001/test_app', items)
        .fail(function (qXHR, textStatus, errorThrown) {
            console.log('fail' + errorThrown);
        })
        .done(function () {
            $.bbq.pushState({ url: 'results-template' });
            $.getJSON('http://loyolalawtech.org:3001/test_app', function (data) {
                var source   = $('#results-template').html();
                var template = Handlebars.compile(source);
                $('.container-content').html(template({items: data}));
            });
        });
    });

    //Deal with errors
    $(document).ajaxError(function( event, jqxhr, settings, exception ) {
        console.log('error:' + exception);
        $('.debug').html('Error: ' + exception);
    });

    //Take photo
    $('.container-content').on('click', '.take-photo', function (e) {
        capturePhoto();
    });
    

    $('.container-content').on('click', '.upload-button', function (e) {
        alert('I will upload');
    });
});

