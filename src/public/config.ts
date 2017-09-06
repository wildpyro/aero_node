// Init the application configuration module for AngularJS application
let ApplicationConfiguration = (function () {
    // Init module configuration options
    let applicationModuleName = 'financetracker';
    let applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'formly',
        'formlyMaterial',
        'ui.router',
        'ui.bootstrap',
        'smart-table',
        'angularMoment'
    ];

    // Add a new vertical module
    /*let registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };*/

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies
        //registerModule: registerModule
    };
})();
