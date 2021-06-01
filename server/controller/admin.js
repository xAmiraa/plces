var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Admin = require('../model/admin')
var app = express();
var bodyParser = require('body-parser')

router.get('/Username', verifytoken, (req, res, next) => {
  return res.status(200).json(Token.useremail)
})
var Token = ''


//Register New Account
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body
  var error;

  if (!name || !email || !password || !password2) {
    res.status(501).json({
      Msg: 'Please enter all fields'
    });
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(password2)

  } else if (password != password2) {
    res.status(501).json({
      Msg: 'Passwords do not match'
    });


  } else if (password.length < 6) {
    res.status(501).json({
      Msg: "Password must be at least 6 characters"
    });

  } else {
    //validation passed
    Admin.findOne({
      email: email
    }).then(user => {
      if (user) {
        res.status(501).json({
          Msg: "Email already exists"
        });
      } else {
        const newUser = new Admin({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => {
                res.status(200).json({
                  Msg: 'Registerd Succesfully'
                });

              })
              .catch(err => console.log(err));
          });
        });
      }


    });

  }
})
//Login to registered account
router.post('/login', (req, res, next) => {
  const {
    email,
    password
  } = req.body
  console.log(req.body)
 
  Admin.findOne({
    email: email
  }).then(user => {
    console.log(user)
    if (!user) {
      res.status(501).json({
        Msg: 'Email Not Registered'
      });
    }

   
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        let Admintoken = jwt.sign({
          useremail: user.email
        }, 'Secret', {
          expiresIn: '3h'
        })
       
        res.status(200).json(Admintoken);
      } else {
        res.status(501).json({
          Msg: 'Password Does not Match'
        });
      }
    });
  });
});
function verifytoken(req, res, next) {
  let Admintoken = req.query.Admintoken;
  console.log(Admintoken)
  jwt.verify(Admintoken, 'Secret', (err, verifytoken) => {
    if (err)
      return res.status(400).json({
        Msg: 'Unauthorized'
      })
    if (verifytoken) {
      Token = verifytoken;      
      next();
    }
  })
}


//Delete user from database


// router.delete("/:userId", (req, res, next) => {
//   Admin.remove({
//       _id: req.params.userId
//     })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });
module.exports = router;
