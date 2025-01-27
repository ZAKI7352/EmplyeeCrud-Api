const express = require('express');
const { sequelizeCon, DataTypes } = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Define the Employee model
const Employee = sequelizeCon.define('Employee', {
    eId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'employees',
    timestamps: false
});

// Sync the database and create the table if it doesn't exist
sequelizeCon.sync()
    .then(() => console.log('Database synced and tables created if they didn\'t exist'))
    .catch(error => console.error('Error syncing the database:', error));

// CRUD Operations

// Create a new employee
app.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single employee by ID
app.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an employee
app.put('/employees/:id', async (req, res) => {
    try {
        const [updated] = await Employee.update(req.body, {
            where: { eId: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
    try {
        const deleted = await Employee.destroy({
            where: { eId: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});