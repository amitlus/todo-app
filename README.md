# Todo-App

## Description

Todo-App is a full-stack application built with React, Next.js, Java, and Spring Boot. It allows users to manage their tasks efficiently by providing features like adding, updating, and deleting tasks.

## Server-side Code

The server-side code, implemented using Java and Spring Boot, can be found in [this repository](https://github.com/amitlus/todo-app-Server).

## Getting Started

Before running the app, ensure that you have a MySQL database connected to it. For convenience, you can use Docker to run MySQL with the following command:

bashCopy code

`docker run --detach --env MYSQL_ROOT_PASSWORD=rootpassword --env MYSQL_USER=todos-user --env MYSQL_PASSWORD=password --env MYSQL_DATABASE=todos --name mysql --publish 3306:3306 mysql:8-oracle` 

Don't forget to modify the password and username to your preference.

In the server's `application.properties` file, add the following lines:

Command line code

`spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/todos
spring.datasource.username=todos-user
spring.datasource.password=password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect` 

Once you have set up the database, install the required resources and load Maven on the server side.

## Features

-   **Home Page**: Displays the user's personal information, including the username and photo. It also lists the top three most urgent tasks.
    
-   **Todos Page**: Shows a list of tasks with their descriptions, due dates, and status. Users can delete or update each task. The "Add Todo" button allows for creating new tasks.
    

## Future Enhancements

1.  **Friends List**: Implement an option to tag friends related to specific tasks.
    
2.  **Media Field**: Allow users to upload relevant media files for each task.
    
3.  **Status Bar**: Create a progress bar to track task completion.
    

## Tech Stack

### Frontend

-   Typescript, JavaScript
-   React, Next.js
-   Axios, next-auth, react-hook-form
-   Tailwind CSS

### Backend

-   Java, Spring Boot
-   MySQL
-   Docker
-   Maven
-   Lombok

### Other

-   Validations
-   Authentication (OAuth)
-   Middleware

## Screenshots

Here are some screenshots of the application:

-   **Home Screen** ![Home screen](https://github.com/amitlus/todo-app-Client/assets/58470929/588f5f3f-3831-415a-8af7-109764a1901f)
    
-   **Todos Screen** ![Todos screen](https://github.com/amitlus/todo-app-Client/assets/58470929/9d5ed540-fee3-46e6-8cea-1a0f2133d2d2)
    
-   **Update Screen** ![Update screen](https://github.com/amitlus/todo-app-Client/assets/58470929/1184704f-26f7-4f83-bc79-f68a81cb0034)
    
-   **Some Validations** ![Validations](https://github.com/amitlus/todo-app-Client/assets/58470929/f609156a-d8b9-46dd-810a-ad8579d5b13e)
    

## Additional Improvements

-   Implement the isDone checkbox functionality.
-   Add both backend and frontend tests (Unit tests, Integration tests, E2E tests using Cypress).
-   Add Swagger Documentation.


Feel free to explore the project and contribute to its enhancement! Happy coding!
