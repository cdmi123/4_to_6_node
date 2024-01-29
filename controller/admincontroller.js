var usermodel = require('../model/usermodel');
const bcrypt = require('bcrypt');

exports.index = async (req,res) => {

    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;
    
    var data = await usermodel.create(req.body);
    
    res.status(200).json({
        status:"success",
        data
    })
}

exports.delete = async (req,res)=>{

    var id = req.params.id;
    var data = await usermodel.findByIdAndDelete(id);
    
    res.status(200).json({
        status:"Data Delete",
    })
}

exports.update = async (req,res)=>{

    var id = req.params.id;
    var data = await usermodel.findByIdAndUpdate(id,req.body);
    
    res.status(200).json({
        status:"Data update",
    })
}

exports.check = async (req,res)=>{

    var page_no = req.query.page_no;

    if(page_no==undefined)
    {
        page_no=1;
    }

    var limit=2;
    var start = (page_no-1)*limit;

    var data = await usermodel.find().skip(start).limit(limit); // all record

    var total_record = await usermodel.find().count();
    var page = Math.ceil(total_record/limit);

    res.status(200).json({
        data,page,page_no
    })
}