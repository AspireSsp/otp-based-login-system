require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios');
var sessionstorage = require('sessionstorage');
var phone;
const smsKey = process.env.FA_API_KEY

router.post('/',async(req,res)=>{
  try{
    phone = req.body.phoneNo;
    const check1 = req.body.check1;
    const check2 = req.body.check2;
    sessionstorage.setItem('phone',phone);
    const response = await axios.get(
      `https://2factor.in/API/V1/${smsKey}/SMS/${phone}/AUTOGEN`
    )
    sessionId = response.data.Details;
    sessionstorage.setItem("sessionId" , sessionId);
    console.log(sessionId);
    if (response.data.Status !== 'Success') {
      return res.status(500).send({ 
        message: 'Error sending OTP',
      })
    }
    res.status(200).render("verifypg",{
      phoneNo : phone
    });
  }catch(error){
    res.status(400).send("invalid Number")
  }
})

module.exports = router;  