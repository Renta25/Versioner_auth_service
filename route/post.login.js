"use strict";
const app = require("express").Router()
const { body, validationResult, cookie } = require('express-validator');
const db = require('../database/connect')
const { getAuthorizationUser } = require("../database/query")
const { generateAccessToken } = require("../helper/JWT")

app.post('',[
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().trim().isLength({min: 5})
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors.array())
        res.status(400).send('Invalide data')
        return
    }

    const email = req.body.email
    const password = req.body.password

    let conn
    try{
        conn = await db.getConnection()
    }catch (err){
        console.error(err)
        res.status(500).send("Server error")
        conn.end()
        return
    }

    try {
        const user = await conn.query(getAuthorizationUser,[email,password])
        conn.end()
        if (user.length != 1) {
            res.status(401).send('Unauthorized')
            return
        }
        const token = 'Bearer ' + generateAccessToken(user[0].id)
        res.setHeader('Authorization', token)
        res.status(200).send()
        return
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
        conn.end()
        return
    }

});

module.exports = app;