const express = require('express');
const router = express.Router();
const axios = require('axios');
var sessionstorage = require('sessionstorage');
const pool = require('../middlewere/db/conn.js');
const smsKey = process.env.FA_API_KEY

router.post('/', async (req, res) => {
  const Phone = sessionstorage.getItem('phone')
  const otp = req.body.otp
  const session_id = sessionstorage.getItem('sessionId')

  // console.log(phone, otp, session_id)

  axios.get(`https://2factor.in/API/V1/${smsKey}/SMS/VERIFY/${session_id}/${otp}`)
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
    if (response.data.Details === 'OTP Mismatch') {
      pool.query('INSERT INTO user (phone) VALUES ($1)', [Phone], (error, results) => {
        if (error) {
          // throw error
          console.log(error);
        }
        // response.status(201).send(`User added with ID: ${results.insertId}`);
        // console.log(results.insertId);
      });
      res.status(200).render("dashbord");
    // }else{
    //   prompt("OTP not matched");
    //   res.status(400).render("verifypg",{
    //     phoneNo : phone
    //   });
    }
    // if (response.data.Details === 'OTP Mismatch') {
    //   res.status(400).json({message: "OTP Mismatch....!"});
    //   console.log("otp not matched..!")
    // }



  })
  .catch(error => {
    console.log(error.message);
  });

  // const response = await axios.get(
  //   `https://2factor.in/API/V1/${smsKey}/SMS/VERIFY/${session_id}/${otp}`
  // )
  // console.log(response.data.Details)
  // if (response.data.Details === 'OTP Matched') {
  //   pool.query('INSERT INTO user (phone) VALUES ($1)', [Phone], (error, results) => {
  //     if (error) {
  //       // throw error
  //       console.log(error);
  //     }
  //     // response.status(201).send(`User added with ID: ${results.insertId}`);
  //     // console.log(results.insertId);
  //   });
  //   res.status(200).render("dashbord");
  // }
  // if (response.data.Details === 'OTP Mismatch') {
  //   res.status(400).json({message: "OTP Mismatch....!"});
  //   console.log("otp not matched..!")
  // }
})

// router.get('/takeUserData', (req,res)=>{
//   res.sendFile(__dirname+"/"+ "takedata.html");
// })
// router.post('/takeUserData',(req,res)=>{
//   const userName = req.body.name;
//   const userEmail = req.body.email;
//   console.log(userName +" "+userEmail );
//   res.send({
//     UserName: userName,
//     UserEmail: userEmail,
//     UserPhone : phone,
//   })
// })
 
module.exports = router;