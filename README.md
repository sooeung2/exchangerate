# Exchange Rate

Exchange Rate is a service that provides latest and historical exchange rate for the currency. There are many exchange rate services available but not many are intuitive to use and can pull historical data easily. This app resolves this issue by providing responsive and intuitive exchange app using data from openexchangerates.org

## Features
- The app shows current exchange rate and automatically updates to most recent rate every one hour
- The app also can show historical rate by selecting the calendar date
- The app is responsively designed for phone view


You can view the app, click [here](http://exchangerateapp.azurewebsites.net/)
or copy and paste http://exchangerateapp.azurewebsites.net

The exchange rates are from [openexchangerates.org](https://openexchangerates.org)
- The app is optimized to make least amount of request to the api
(Only fetches data when it loads and every one hour from initial load)

## Scripts
- `npm start` Runs the app in the development mode
- `npm test` aunches the test runner in the interactive watch mode
- `npm run build` uilds the app for production to the build folder

___
+ This project focused heavily on front-end.
+ I chose React on front-end because of its reusability and modularity.
+ I used material-ui for front end design
+ I would have made a graph for historical data but it's only available to paid members for the openexchangerates api
