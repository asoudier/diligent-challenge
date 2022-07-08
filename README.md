### Getting Started with Diligent Challenge 

To start the app you will need to separate terminal sessions. When you first open the project run `npm start` which will start the server. You should see 

```
> node server/index.js

Server listening on 3001
```

After running that you should run `cd client && npm start` this will launch our React app. You need to run `npm start` from inside the client directory

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Users 

These are the usernames and password combinations that will get you into the site. I set up protected routes so that if you are not logged in and attempted to go to another page besides '/' the user will be directed to the login page (auth is actually really fun to build)

 {
    username: "john",
    password: "12345",
  },
  {
    username: "anna",
    password: "password",
  },

### App Basics
 Basics of the app you will land on '/' and from there login. Using the password / usernames above on login you will be redirected to the dashboard. The dashboard is where we are able to control our 3 robots. I added a default task for robot 1 you should see once you get the app up and running. Its task is set to complete after one minute of starting the API server locally. The robots information is shown in a table, you should see robot name, task, time the task is complete, and the current time, status were you see the status of the job and the action column where you add tasks. You can add text into the inputs on the dashboard table and hit 'Add Task' this will add a task that will complete in 1 minute. I refetch the API every second to check status. There is a random function running every 30 seconds that will determine if a tasks fails or succeeds. The UI is in control of protecting the API from getting multiple requests to the same robot. I set this to second but should be more if this had real multiple users. The API and the frontend should both have protections in place but for MVP did just UI. Each row has its own input and 'Add Task' button which will send a task for that specific robot. When the data is re fetched after second you will see your task. You can overwrite tasks. If you want to reset the tasks restart the API


### General Thoughts 

I really enjoyed the project overall. As a mainly frontend engineer I focused more on the UI and also but more logic that should definitely live on the server on the frontend just to get everything up and running in an MVP state for a project like this. Some examples of this are the random functionality and some of the logic around if a task is complete should probably live on the backend. 

Generally I wanted to try to stick to as much basic javascript as possible. The exceptions were with routing and the table. For routing react-router helped me simplify and add a lot of features for auth. I put a lot of thought into the auth. I think its something that really is interesting and a very frontend task for something like this. I recently upgraded to react-router v6 on my current work and applied a lot of that learning here. May have went a little overboard here but I enjoyed adding protected routes, adding simple nav that takes you to a page that doesn't exist, and auth redirection just to highlight some nice and fun things from react-router v6. Also have logout functionality.  For the table I used antd since I just didn't want to build one from scratch. 

Also with the sticking to straight javascript I used the built in fetch function but probably should have used axios at the minimum even if I would also preferred react-query but thats overkill for something like this. 

Used express for the API. Kept it very simple and did it in the most basic way possible. I am sure there are much better ways to do some of the things here but was more focused on MVP


### Future work

Obviously with limited time I had to make some sacrifices. Here are some of the things that are at the top of my mind:

* Styling would be the most obvious one here. Did the bare minimum in my opinion to build the app and focused more on function then style
* Tests for the API would also be a nice to have and future work, obviously would want some for the UI as well but in terms of priority API tests would be much more valuable for something like this
* Would probably upgrade some of the tools like use Axios or something instead of the built in javascript functionality.
* File organization. There isn't any currently. I just put everything in App.js for ease of use for me to get the MVP
* Let the user determine the length of the task or let the backend have a list and estimated times.
* Call the API once a new task is submitted rather than wait the second