var usermodel = require('../model/usermodel');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');      // token
var login_status=0;


exports.login = async (req,res) => {

try {
    
    var data = await usermodel.find({"email":req.body.email});


    if(login_status==0)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password,data[0].password, async function(err, result) {
                
                if(result==true)
                {
                        var transporter = nodemailer.createTransport({
                        service: 'gmail',
                            auth: {
                                user: 'languagepdf@gmail.com',
                                pass: 'aanmyduluriuqdho'
                            }
                        });

                        var mailOptions = {
                        from: 'languagepdf@gmail.com',
                        to: 'languagepdf@gmail.com',
                        subject: 'Sending Email using Node.js',
                        text: 'That was easy!'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    var token = jwt.sign({id:data[0].id},"cdmi");
                    login_status=1;
                    res.status(200).json({
                        status:"login success",
                        token
                    })
                }
                else
                {
                    res.status(200).json({
                        status:"check your email and password"
                    })
                }

            });  
        }
        else
        {
            res.status(200).json({
                status:"check your email and password"
            })
        }
    }
    else
    {
        res.status(200).json({
            status:"user is already login"
        })
    }

} catch (error) {
    res.status(400).json({
        error
    })
}

  
}

exports.logout = async (req,res) => {
   login_status=0;
    res.status(200).json({
        status:"user logout"
    })
}