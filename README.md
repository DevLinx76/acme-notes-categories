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
```sql
-- Insert sample categories
INSERT INTO categories (name) VALUES ('SQL'), ('Express'), ('Shopping');

-- Insert sample notes, associating them with categories
INSERT INTO notes (txt, ranking, category_id) VALUES
('Learn Express', 5, (SELECT id FROM categories WHERE name = 'Express')),
('Implement CRUD operations', 4, (SELECT id FROM categories WHERE name = 'Express')),
('Understand foreign keys', 4, (SELECT id FROM categories WHERE name = 'SQL')),
('Prepare grocery list', 3, (SELECT id FROM categories WHERE name = 'Shopping'));
```
### 5. Create your express server and listen

Set up your Express server to listen for incoming requests. Use the following code snippet to import Express, instantiate the app, and listen on a specified port:

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require('morgan')('dev'));

app.listen(port, () => console.log(`Listening on port ${port}`));
```

### 6. Create your API route layouts

Define the routes for your application. These routes will include endpoints to perform CRUD operations on categories and notes. Ensure to implement the logic for each route using async handlers:

```javascript
app.get('/api/categories', async (req, res) => { /* logic */ });
app.get('/api/notes', async (req, res) => { /* logic */ });
app.post('/api/notes', async (req, res) => { /* logic */ });
app.put('/api/notes/:id', async (req, res) => { /* logic */ });
app.delete('/api/notes/:id', async (req, res) => { /* logic */ });
```

### 7. Fill your routes with appropriate logic and test them out with curl as you go

Implement the necessary logic for each route to interact with your database. This involves performing CRUD operations—creating, reading, updating, and deleting data. Here's an example of how you might set up a route to fetch all categories:

```javascript
app.get('/api/categories', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});
```
### 8. In addition to curl, test your routes using Postman

Once you've implemented your API routes, it's important to test them to ensure they're working as expected. You can use Curl for quick command-line tests. For example, to test fetching all categories:

```bash
curl http://localhost:3000/api/categories
```

For a more comprehensive testing experience, Postman allows you to easily test your API endpoints. In Postman, create a new request for each of your endpoints, select the appropriate HTTP method, and, if needed, add request bodies for POST, PUT, or DELETE operations. This approach lets you thoroughly test the functionality and error handling of your API.

### Additional Resources

For more detailed information on using Postman for API testing, refer to the official Postman documentation. Postman is a powerful tool for testing API endpoints, allowing you to easily create, share, test, and document APIs.

- [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)

This resource is invaluable for developers looking to deepen their understanding of API testing and development, providing guides, tutorials, and best practices for using Postman effectively.

Remember to test your routes thoroughly and discuss the outcomes with your team. Happy coding!
