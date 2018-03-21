# Parcio

* Updated node.js to version 9.8.0
* Updated Angular CLI to version 1.7.3
* Installed Bootstrap 4.0.0, JQuery 3.3.1 and JQuery UI dist version 1.21.1
* Imported Raleway from Google fonts and installed in styles.css as @font-face import
* Imported background image from pixabay
* Created HomeComponent and Shared folder
* Ceated shared/layout folder and imported footer and header files + index.ts from Libreville project
* Imported HomeModule from Libreville and copied it to HomeComponent folder
* Installed AngularFire2 version 5.0.0-rc6 and Firebase version 4.11.0
* Created Firebase app and provided key information to environment files
* NB: To set background image use app-root selector in styles.css
* Installed Popper 1.0.1
* Installed css-loader for webpack
* Created Infodisplay Component with Map, Carpark, Supermarkets and Petrol child components
* Created DataService
* Installed @types/googlemaps 3.30.7
* Installed @agm/core 1.0.0-beta.2
* Installed googlemaps 1.12.0
* Instructions for integrating Google Maps with Angular 5:
  * Set api key as part of the environment.ts variables and import environment into whatever components uses the map service.
* <https://angular-maps.com/api-docs/agm-core/directives/AgmMarker.html>
* Instructions for adding car parks/petrol stations: <https://developers.google.com/maps/documentation/javascript/places#place_search_requests>
* Created proxy.conf.json file to overcome CORS issue for using Google Maps API. Start line in package.json also needs to be altered to read "ng serve --proxy-config proxy.conf.json". After this, use ng start instead of ng serve to start development server.
* Ensure to enable headers for Google fonts as per instructions here: <https://firebase.google.com/docs/hosting/full-config#section-full-firebasejson>, otherwise Google fonts won't display on deployment to firebase. (This has not yet resolved the issue of Google fonts not working in firebase deployment. Had to resort to work-around using a locally stored font file and the @font-face syntax previously used in the Libreville project.)
