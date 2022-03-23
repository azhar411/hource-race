# Hource Race Application
This application build in node with typescript,MongoDb and Docker. The perpose of this application authorized the third party login api Authorization, get data through valid token and import data into mongodb database. 

## Docker configuration
Run this application we need to follow the steps.
- Download this source code in your working directory
- We have configure the docker file. In root directory run the docker-compose up --build
- Run the api in postman or api tool.
    - Welcome page(GET Request):
        - http://localhost:3000/api/race/ 
    - Import race event response into mongodb(Get Request)
        - http://localhost:3000/api/race/start 

## Local configuration
Run this application locally need to follow steps:
- Setup and configure node in your system
- Application root folder run the command
    - npm install
- app/environment/dev.env.ts file update the
    - db_url 
- npm start
- follow the step Postman or api tool steps.

## test the application
- For test case run the command 
    - npm test