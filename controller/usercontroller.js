var usermodel = require('../model/usermodel');

exports.index = async (req,res) => {
    
    var data = await usermodel.find();
    
    res.status(200).json({
        status:"success",
        data
    })
}

