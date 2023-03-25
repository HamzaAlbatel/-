import jwt from 'jsonwebtoken';
import asynchandler from 'express-async-handler';
import Account from '../models/account.js';

const protect = asynchandler(async(req,res) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            token = req.header.authorization.split(' ')[1]
            
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
            
            
        }

    }else{
        return res.status(500).json({
            message: 'your not authorizen'
        })

    }
})
