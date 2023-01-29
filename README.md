Pinball Location Search App

This is a React-based web application that allows users to search for pinball locations near a specified latitude and longitude. The app uses a REST API to retrieve location data and presents the results to the user in a sorttable table

Features: 
    - Search for pinball locations near a specified latitude and longitude
    - Get current location using the "Nea Me" button
    - Specify a maxmimum distance from the search location
    - Sort results by Name, Distance and Number of machines
    - Caching of search results for fast repeat searchs
    - Error handling for invalid search parameters and API errors

Requirements: 
    - Node.js
    - npm

Setup: 
    - Clone the repository
    - Change into project directory
    - Install the dependencies: "npm install"
    - Start the development server: "npm run dev"
    - Open a web broswer and navigate to "http://localhost:3000"

Usage
    - Enter a latitude and longitude into the form fields or use the "Near Me" button to get your current location.
    - Specify a maximum distance for the search(default is 50 miles).
    - Click the "Search" button to retrieve the results/
    - Sort the results by clicking on a column header(default is distance)

Running test: 
The test for the application can be run by using : npm run test

The test check for the following components: 
    - App: tests if the app renders without crashing and displays the LocationSearch component
    - LocationSearch: tests if the form displays with correct labels for inputs, renders NearMeButton component and search button, displays the appropriate error message, displays SearchResults component when valid coordinates are provided and there are nearby locations and search button makes appropriate API call
    - NearMeButton: tests updates latitude and longitude inputs with users current location, calls the handleGeoLocationError function when there is an error getting the current location
    
Code Overview: 

The main component of the application is the LocationSearch component. This component manages state for the form inputs, the search results and any error messages. It also makes the API call to retrieve the pinball locations.

The LocationSearchForm utilizes helper functions including coordinateValidation and sortLocations.

The application also includes smaller components such as NearMeButton, SearchResults, MaxDistance and Sort. These components are used to render the form inputs, search results, maximum distance selector and sort options respectively.

Built With: 
React
Jest
@testing-library/react
Express
