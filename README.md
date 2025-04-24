# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project creates the frontend for a very basic todo-list tracking application. I was tired of the ads all over the regular todo-list trackers I tried, so I decided to make this one.

It has numerous vulnerabilities from the different JS libraries I used, thats on the to-fix list. Also on the todo list is setting up tests.

## Running the App

This app requires a backend server to run fully (https://github.com/PaulGildehaus/todo-app-backend.git). Sure, you can hardcode the auth to run it locally and bypass Google Oauth2, but it also requires a backend service for connecting to MongoDB instances. 

The backend server for this app needs a few simple API routes and it should work just fine. These routes include Google auth and callback routes, as well as basic CRUD operations for a MongoDB connection. 

There are two simple MongoDB schemas that this follows, a User and a Todo schema. 

Assuming you've set up the backend server, you can simply add an environmental variable for the base URL of said server, verify the amplify.yml file exists, and connect your repo to AWS amplify. 