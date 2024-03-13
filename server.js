const pg = require('pg');
const express = require('express');
const app = express();
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_notes_categories_db');

// body parsing middleware
app.use(express.json());

// logging middleware
app.use(require('morgan')('dev'));


// GET /api/categories
app.get('/api/categories', async (req, res, next) => {
    try {
        const SQL = 'SELECT * FROM categories';
        const response = await client.query(SQL);
        res.send(response.rows);
    } catch (ex) {
        next(ex)
    }
});

// GET /api/categories/:id
app.get('/api/notes', async (req, res, next) => {
    try {
        const SQL = 'SELECT * from notes ORDER BY created_at DESC';
        const response = await client.query(SQL);
        res.send(response.rows);
    } catch (ex) {
        next(ex)
    }
});

// GET /api/notes/:id
app.post('/api/notes', async (req, res, next) => {
    try {
        const SQL = 'INSERT INTO notes(txt, category_id) VALUES($1, $2) RETURNING *';
        const response = await client.query(SQL, [
            req.body.txt, 
            req.body.category_id
        ]);
        res.send(response.rows[0]);
    } catch (ex) {
        next(ex)
    }
});

// PUT /api/notes/:id
app.put('/api/notes/:id', async (req, res, next) => {
    try {
        const SQL = 'UPDATE notes SET txt=$1, ranking=$2, category_id=$3, updated_at= now() WHERE id=$4 RETURNING *';
        const response = await client.query(SQL, [
            req.body.txt, 
            req.body.ranking, 
            req.body.category_id, 
            req.params.id
        ]);        
        res.send(response.rows[0]);
    } catch (ex) {
        next(ex)
    }
});

// DELETE /api/notes/:id
app.delete('/api/notes/:id', async (req, res, next) => {
    try {
        const SQL = 'DELETE FROM notes WHERE id=$1';
        const response = await client.query(SQL, [
            req.params.id
        ])
        res.send(response.rows[0]);
    } catch (ex) {
        next(ex)
    }
});

// 404 handler
const init = async () => {
    await client.connect();
    let SQL = `
    DROP TABLE IF EXISTS notes;
            DROP TABLE IF EXISTS categories;
            CREATE TABLE categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            );
            CREATE TABLE notes(
                id SERIAL PRIMARY KEY,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                ranking INTEGER DEFAULT 3 NOT NULL,
                txt VARCHAR(255) NOT NULL,
                category_id INTEGER REFERENCES categories(id) NOT NULL
            );
        ;
    
    INSERT INTO categories(name) VALUES('SQL');
    INSERT INTO categories(name) VALUES('Express');
    INSERT INTO categories(name) VALUES('Shopping');
    INSERT INTO notes(txt, ranking, category_id) VALUES('learn express', 5, (SELECT id FROM categories WHERE name = 'Express'));
    INSERT INTO notes(txt, ranking, category_id) VALUES('add logging middleware', 5, (SELECT id FROM categories WHERE name = 'Express'));
    INSERT INTO notes(txt, ranking, category_id) VALUES('write SQL queries', 4, (SELECT id FROM categories WHERE name = 'SQL'));
    INSERT INTO notes(txt, ranking, category_id) VALUES('learn about foreign keys', 4, (SELECT id FROM categories WHERE name = 'SQL'));
    INSERT INTO notes(txt, ranking, category_id) VALUES('buy a quart of milk', 2, (SELECT id FROM categories WHERE name = 'Shopping'));

    `;
    // Port 3000 is the default port for HTTP
    await client.query(SQL);
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${ port } `);
    }
    );

};

init()
