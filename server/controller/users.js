const User = require('../models/User');

exports.retrieveAllUsers = (req,res,next) => {
  User.find({})
  .exec(function(err, users){
      if(err){
          console.log("Error retrieving users");
      } else {
          res.send(users);
      }
  });
}


exports.findUserById = (req,res,next) => {
  User.findById(req.params.id)
  .exec((err, user) => {
      if(err){
          res.send("Error retrieving user");
      } else {
          res.send(user);
      }
  });
}

exports.addUser = (req,res,next) => {
  console.log("Creating new user");

  /**
   * Storing the posted data in a User
   * model
   */
  let newUser = new User();
  newUser.nickname = req.body.nickname;
  newUser.iconName = req.body.iconName;

  // Storing user into the database
  newUser.save((err, addedUser) => {
      if(err){
          res.send("Error saving user");
      } else {
          res.send(addedUser);
          // res.redirect('/');
      }
  });
}

exports.removeUser = (req,res,next) => {
  User.remove({"_id": req.body.id}).then(success=>{
    console.log("User left and has been removed");
    res.status(200).send(success);
  }).catch(err=>{
    console.log("There was an error in removing a user");
  })
}

exports.updateNickname = (req,res,next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: {
        nickName: req.body.nickName,
        iconName: req.body.iconName
    }
    },{new: true},
    (err, updatedUser) => {
        if(err) {
            res.send("Error updating user");
        } else {
            res.send(updatedUser);
        }
    });
}
