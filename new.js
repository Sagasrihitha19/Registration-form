const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Welcome@123',
    database: 'employee_management',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/addEmployee', (req, res) => {
    const { name, employeeId, department, dob, gender, designation, salary } = req.body;

    const sql = 'INSERT INTO employees (name, employee_id, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, employeeId, department, dob, gender, designation, salary];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            return res.status(500).json({ error: 'An error occurred while adding the employee' });
        }
        console.log('Employee added successfully');
        res.status(200).json({ message: 'Employee added successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
