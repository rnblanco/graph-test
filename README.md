# Personal Documentation

## Technical Specifications
- Angular: 13
- PrimeFlex: 2
- PrimeNG: 13
- ChartJs: 3

# Available Features

## Not Found Page
The not found page is shown when the url path is not found in the routing module. Shows a loading animation and an error message.

## Main Page
The main page shows two elements:
- Table: The table is used as the history of the application.
- Graph: The graph is used to show the current information from the api.

When the Main Page is loaded, creates an observable with interval to load information from the api every 30 seconds.<br />
Also, when information is received, it is passed through a filter to convert objects into arrays and handle them easier, it is backed up in the history attribute, stored in local storage and displayed on the table. <br />
Furthermore, the length of the history is limited to 120 entries because it is the maximum of entries to store within one hour.

Hope you enjoyed this documentation, see comments in code for more information ;)

# Angular Documentation - GraphTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
