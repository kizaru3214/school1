const express = require('express');
const router = express.Router();
require('dotenv').config();
const mysql = require("mysql");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const table = 'teacher';

router.get('/', (req, res) => {
    let sql = "SELECT * FROM `" + table + "`";
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM `" + table + "` WHERE `teacherid`=?";
    db.query(sql, id, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.post('/', (req, res) => {
    const { teachercode, rfid, lastname, firstname, deptid } = req.body;
    if (!teachercode || !rfid || !lastname || !firstname || !deptid) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const values = [teachercode, rfid, lastname, firstname, deptid];
    let sql = "INSERT INTO `" + table + "`(`teachercode`,`rfid`,`lastname`,`firstname`,`deptid`) VALUES(?,?,?,?,?)";
    db.query(sql, values, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { teachercode, rfid, lastname, firstname, deptid } = req.body;
    if (!teachercode || !rfid || !lastname || !firstname || !deptid) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const values = [teachercode, rfid, lastname, firstname, deptid, id];
    let sql = "UPDATE `" + table + "` SET `teachercode`=?,`rfid`=?,`lastname`=?,`firstname`=?,`deptid`=? WHERE `teacherid`=?";
    db.query(sql, values, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM `" + table + "` WHERE `teacherid`=?";
    db.query(sql, id, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

module.exports = router;