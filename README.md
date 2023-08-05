# Welcome to my Todo-App!

## Fullstack Todo App using React, Next.js Java & Spring boot

You can find the Server side code using Java & Spring boot in [here](https://github.com/amitlus/todo-app-Server).


# Before running the App
If you want the app to work properly, you should connect a database to it.
I recommend using MySQL for that project by running it with Docker.

Install Docker engine from [here](https://docs.docker.com/engine/install/).

**Command to run MySQL in my Docker:**
docker run --detach --env MYSQL_ROOT_PASSWORD=rootpassword --env MYSQL_USER=todos-user --env MYSQL_PASSWORD=password--env MYSQL_DATABASE=todos --name mysql --publish 3306:3306 mysql:8-oracle
**(Change the password and user to what ever you want)**

On the Server, add to **application.properties** the following lines:
spring.jpa.hibernate.ddl-auto=update  
spring.datasource.url=jdbc:mysql://localhost:3306/todos  
spring.datasource.username=todos-user  
spring.datasource.password=password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

**All the other data including CORS enable and dependencies are provided, just install resources and load Mavenon the Server side**

## The fun part
Currently the Application is kinda basic, I'll improve that in the future.

**Home screen**

![image](https://github.com/amitlus/todo-app-Client/assets/58470929/588f5f3f-3831-415a-8af7-109764a1901f)

**Todos screen**

![image](https://github.com/amitlus/todo-app-Client/assets/58470929/9d5ed540-fee3-46e6-8cea-1a0f2133d2d2)

**Update screen**

![image](https://github.com/amitlus/todo-app-Client/assets/58470929/1184704f-26f7-4f83-bc79-f68a81cb0034)

**Some Validations**

![image](https://github.com/amitlus/todo-app-Client/assets/58470929/f609156a-d8b9-46dd-810a-ad8579d5b13e)



