//comment a

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data
const students = [
    { id: 'ENG001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.85 },
    { id: 'ENG002', name: 'Bob Smith', department: 'Computer Science', gpa: 3.92 },
    { id: 'ENG003', name: 'Carol White', department: 'Electrical Engineering', gpa: 3.78 },
    { id: 'ENG004', name: 'David Lee', department: 'Electrical Engineering', gpa: 3.65 },
    { id: 'ENG005', name: 'Eve Brown', department: 'Civil Engineering', gpa: 3.88 },
    { id: 'ENG006', name: 'Frank Davis', department: 'Civil Engineering', gpa: 3.72 },
    { id: 'ENG007', name: 'Grace Chen', department: 'Mechanical Engineering', gpa: 3.95 },
    { id: 'ENG008', name: 'Henry Wilson', department: 'Mechanical Engineering', gpa: 3.81 }
];

// API to get all students grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: groupedByDept
    });
});

// API to get individual student GPA by student ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            error: 'Student not found'
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});