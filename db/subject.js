const express = require('express');
const router = express.Router();
require('dotenv').config();
const mysql = require("mysql");

const db = mysql.createPool({
	host:process.env.DB_HOST,
	user:process.env.DB_USER,
	password:process.env.DB_PASSWORD,
	database:process.env.DB_DATABASE,
	multipleStatement:true,
});

const table = 'subjects';
//using restfull 
router.get('/',(req,res)=>{
	let sql = "SELECT * FROM `"+table+"`";
	db.query(sql,(err,rows)=>{
		if(err) return res.status(500).json(err);
		return res.status(200).json(rows);
	});
});
router.get('/:id',(req,res)=>{
	let id = req.params.id;
	let sql = "SELECT * FROM `"+table+"` WHERE `subjid`=?";
	db.query(sql,id,(err,rows)=>{
		if(err) return res.status(500).json(err);
		return res.status(200).json(rows);
	});
});
router.delete('/:id',(req,res)=>{
	let id = req.params.id;
	let sql = "DELETE FROM `"+table+"` WHERE `subjid`=?";
	db.query(sql,id,(err,rows)=>{
		if(err) return res.status(500).json(err);
		return res.status(200).json(rows);
	});
});
router.post('/',(req,res)=>{
	const { subjcode, subjdesc, units } = req.body;

    // Basic validation
    if (!subjcode || !subjdesc || !units) {
        return res.status(400).json({ message: "All fields are required." });
    }
	const values = [subjcode, subjdesc, units];
	console.log(values);
	let sql = "INSERT INTO "+table+"(`subjcode`,`subjdesc`,`units`) VALUES(?,?,?)";
	db.query(sql,values,(err,rows)=>{
		if(err) return res.status(500).json(err);
		return res.status(200).json(rows);
	});
});

router.put('/:id',(req,res)=>{
	const id=req.params.id;
	const { subjcode, subjdesc, units } = req.body;

    // Basic validation
    if (!subjcode || !subjdesc || !units) {
        return res.status(400).json({ message: "All fields are required." });
    }
	const values = [subjcode, subjdesc, units];
	console.log(values);
	let sql = "UPDATE `"+table+"` SET `subjcode`=?,`subjdesc`=?,`units`=? WHERE `subjid`="+id;
	db.query(sql,values,(err,rows)=>{
		if(err) return res.status(500).json(err);
		return res.status(200).json(rows);
	});
});




module.exports = router;