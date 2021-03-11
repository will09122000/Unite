# Student Interaction App

## Installation steps for developers

1.  Install Node.js LTS. This allows us to set up and write server-side Javascript. This comes included with Chocolatey and NPM, for installing dependencies and packages. https://nodejs.org
2.  Install Git. https://git-scm.com/
3.  On the command line, run the command `npm install --global expo-cli` to install the Expo client on your computer.
4.  Fork (Top right, click the three dots, and click 'Fork'; this is so individual copies can be made and merged into master in a distributed structure) and clone the fork, and run `npm i`to install all the packages.
6.  To edit the app, open App.tsx and edit.
7.  To run the app, whilst in the directory, use `expo start`, `npm run ios`, `npm run android` to start the Expo environment. This will open a new web page, where you can scan the QR code using the Expo app to test on a physical device, or open an emulator and Expo should automatically install and open the Expo client app on it

## Folder organisation

API: authentication interactions with Firebase Authentication
assets: images and other static items for use throughout the app
components: functional components for use throughout the app, such as inputs and UI elements
config: keys for interacting with Firebase Authentication
contexts: app-wide state controllers, for passing information across the app cleanly
navigators: components to structure the navigation flow of the app (which screens can go to which, what arguments must be passed on navigation, etc.)
screens: functional components to be used in navigators; the actual main front-end of the app
styles: style objects for aesthetics to be used throughout the app
types: type definitions for API returns, for easier type hinting / enforcement

All other folders are auto generated by NPM or Expo.

## Other files

App.tsx: main entry point for the app
constants.ts: app wide global constants
declarations.d.ts: for module declaration (for TypeScript integration)

All other files outside of the folders listed above are auto-generated by NPM or Expo.
