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

These are the usernames and password combinations that will get you into the site. I set up protected routes so that if you are not logged in and attempted to go to another page besides '/' the user will be directed to the login page (auth is actually really fun to build). There is a section of code where I added a comment on what to comment out to disable this feature if you need during testing. 

 {
    username: "john",
    password: "12345",
  },
  {
    username: "anna",
    password: "password",
  },

### App Basics
 Basics of the app you will land on '/' and from there login. Using the password / usernames above on login you will be redirected to the dashboard. The dashboard is where we are able to control our 3 robots. I added a default task for robot 1 you should see once you get the app up and running. Its task is set to complete after 30 seconds of starting the API server locally. The robots information is shown in a table, you should see robot name, task, time the task is complete, current time, status were you see the status of the job and the action column where you add tasks. You can add text into the inputs on the dashboard table and hit 'Add Task' this will add a task that will complete in 30 seconds. I refetch the API every second to check status. There is a random function gives success and failure a 50% chance for each task. The UI is in control of protecting the API from getting multiple requests to the same robot. I fetch every second which should stop 2 users from being able to update but obviously this wouldn't be fool proof in a real world setting. The API and the frontend should both have protections in place but for MVP did just UI. Each row has its own input and 'Add Task' button which will send a task for that specific robot. When the data is re fetched after a second you will see your task. You can add new tasks when they are completed. If you want to reset the tasks restart the API.


### General Thoughts 

I really enjoyed the project overall. As a mainly frontend engineer I focused more on the UI and also but more logic that should definitely live on the server on the frontend just to get everything up and running in an MVP state for a project like this. Some examples of this are the random functionality and some of the logic around if a task is complete should probably live exclusively on the backend. 

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


<img width="1783" alt="Screen Shot 2022-07-08 at 4 39 13 PM" src="https://user-images.githubusercontent.com/17502133/178073827-4b863ebf-8bb5-4644-808f-50e91895d880.png">

### Challenge

SuperCoolRobotics Inc is looking to build a system that allows multiple human Robot Operators to coordinate multiple robots.
They would like to have two (or more) robot operators to simultaneously (through separate open web pages) operate three (or more) robots. 

For this exercise, take (nominally) 4 hours and produce a system with as many of the following characteristics as you feel capable of fitting in:
- a backend process, written in nodejs (or another language if you find that preferable)
- a web front end written in React
- a Task is an entity with a unique id, as well as a human-readable description.
- on launch, the backend populates with multiple tasks (can be created on the fly or read from persistence)
- username + password authentication (can be match-based against accounts hardcoded in the backend)
- Robot operators can assign a robot to a task. 
- Robot operators can view the status of the robot operating the task.
- Robot operators can view ongoing tasks. 
- Robot operators know when a robot can be assigned another task.
- A robot may only be assigned a single task at a time.
- The backend arbitrates between simultaneous attempts by two operators to assign the same task.
- The backend simulates the processing of an assigned task, eventually ushering the task into a done state (with some percentage of task failures also simulated).
- If an error occurs, it is made evident to the operator.
 
Additionally, but not required, it would be nice to know: 
- Which tasks were assigned to which robot. 
- Which robot operator assigned the tasks.
- Additional insights on robot performance (ex. jobs succeeded/total_jobs_assigned)

Things to not worry about:
- Retrying failed tasks. 

Please provide a README with complete instructions needed to run your front and back end
