const express = require('express');
const router = express.Router();
const randomCode = require('random-key');


router.get('/invitation', (req,res,next)=>{
  // Generates a random key
  const code = randomCode.generate();

  /**
   * Sends an error message if no code
   * was generated
   */
  if(code == null) {
    res.status(400).json({
      message: "Code was not generated"
    });
  }

  /**
   * If the key was generated. The results will
   * be sent in a json format
   */
  res.status(200).json({
    invitation: code,
    message: 'Generated Invitation Code'
  });
});

router.post('/create', (req,res, next) => {

  
  /* Catches error if generated, responds with err 400   */

  /* Successfully submits create form data */

  res.status(200).send({"response": "Room Successfully Created"});
  console.log(req.body);
});

module.exports = router;
