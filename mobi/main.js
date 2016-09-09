require.config({
    baseUrl: 'lib/',
    paths: {
        jquery: 'jquery-2.1.4',
        underscore: 'underscore-1.8.3',
        backbone: 'backbone-1.2.3',
        mustache: 'mustache-2.2.0',
        templates: '../templates',
        router: '../router',
        text: 'requirejs-text-2.0.14',
        json: 'requirejs-json-0.4.0',
        jquerySidr: 'jquery.sidr',
        markdownConverter:'Markdown.Converter'
    },
    shim: {
        // nothing
    }
});

require(['../app'], function(App) {
    App.initialize();
})