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

const table = 'suboffered';

router.get('/', (req, res) => {
    let sql = "SELECT * FROM `" + table + "`";
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM `" + table + "` WHERE `subjoffid`=?";
    db.query(sql, id, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.post('/', (req, res) => {
    const { start_time, end_time, room, teacherid, subjid } = req.body;
    if (!start_time || !end_time || !room || !teacherid || !subjid) {
        return res.status(400).json({ message: "All fields are required." });
    }

    let sqlGet = "SELECT MAX(CAST(edpcode AS UNSIGNED)) as lastcode FROM `suboffered`";
    db.query(sqlGet, (err, rows) => {
        if (err) return res.status(500).json(err);
        let lastcode = rows[0].lastcode || 0;
        let edpcode = lastcode + 1;

        const values = [edpcode, start_time, end_time, room, teacherid, subjid];
        let sql = "INSERT INTO `suboffered`(`edpcode`,`start_time`,`end_time`,`room`,`teacherid`,`subjid`) VALUES(?,?,?,?,?,?)";
        db.query(sql, values, (err, rows) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(rows);
        });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { start_time, end_time, room, teacherid, subjid } = req.body;
    if (!start_time || !end_time || !room || !teacherid || !subjid) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const values = [start_time, end_time, room, teacherid, subjid, id];
    let sql = "UPDATE `" + table + "` SET `start_time`=?,`end_time`=?,`room`=?,`teacherid`=?,`subjid`=? WHERE `subjoffid`=?";
    db.query(sql, values, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM `" + table + "` WHERE `subjoffid`=?";
    db.query(sql, id, (err, rows) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(rows);
    });
});

module.exports = router;