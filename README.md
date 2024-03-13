# acme-notes-categories
# Block 33: Foreign Keys (Guided Practice)

## Learning Teams: Connecting

### 💬 Discussion Prompt:
As a team, discuss the following prompts:
- Why is it important to create multiple tables in our database?
- What would be an issue if we put all of our data in one table?
- How are we doing on our team goals? Review them in this discussion thread.

## Lesson Overview
In this lesson, we will learn about foreign keys, parent-child relationships, and designing schemas for relational databases.

### ✅ Learning Objectives:
1. Explain and use foreign key constraints.
2. Explain and design junction tables.
3. Design schemas for relational databases.
4. Use Express router and modules to create various functioning REST API endpoints.
5. Recognize and write common SQL queries.

## Guided Practice
Using what we have learned about Express and SQL, we will build out a RESTFUL API. The diagram below shows our database tables. This is also called a database schema. Not all the details are included, but the relationship is noted with the line connecting the tables.
- A category can have many notes.
- A note has one category.

### 1. Initialize The Project
- Run `npm init -y` in your terminal.
- Install "express", "pg", "morgan", and "nodemon":
  - `npm i express pg morgan`
  - `npm i -D nodemon`
- Change the package script to run in dev or production modes:
  - `"start:dev":"nodemon server.js"`
  - `"start":"node server.js"`
- Create your database: `acme_notes_categories_db`.
- Create your `.gitignore`:
  - package-lock.json
  - node_modules
- Create your `server.js` file.

### 2. Set up your `server.js` file
- Require in your `pg` and create your `Client` from it.
- Make sure you add the Database URL if you have one, OR enter it manually: `process.env.DATABASE_URL || 'postgres://localhost/acme_notes_categories_db'`.
- Create your `init` function and invoke it. Also, make sure that it is an `async` function.

### 3. Start setting up your `init` with Database Tables
- Connect to the `pg` client, using await syntax.
- DROP the table `categories` if it exists already.
- CREATE the table `categories` with columns of `id` and `name`, where `name` is not null and `id` is serial.
- DROP the table `notes` if it exists already.
- CREATE the table `notes`...

### 4. Seed some data into the Database
...

### 5. Create your express server and listen
...

### 6. Create your API route layouts
...

### 7. Fill your routes with appropriate logic and test them out with curl as you go
...

### 8. In addition to curl, test your routes using Postman
...

## 9. Final Result

...

Remember to test your routes thoroughly and discuss the outcomes with your team. Happy coding!
