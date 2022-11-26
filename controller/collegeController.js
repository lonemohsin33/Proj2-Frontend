const collegeModel = require("../models/collegeModel")
const internModel= require("../models/internModel")


const createCollege = async (req,res)=>{
    try{

        let data = req.body
        
        let savedData= await collegeModel.create(data)
        res.status(201).send({status:true, message:savedData})
    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}
// =================get interns data with college details==========

const getColleges = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let collegeName = req.query.collegeName;
        if (!collegeName) {
            return res.status(400).send({status: false, message: "Please Enter college Name"});
        }
        function validatename(input){
            let re = /^[A-Za-z ]+$/
            return re.test(input)
        }
        if(validatename(collegeName)==false) return res.status(400).send({status:false, message:"College Name is Invalid"})

        
        

        if (collegeName) {
            const isValidName = await collegeModel.findOne({ name: collegeName})
            if (isValidName == null) {
                return res.status(400).send({ status: false, message:"invalid college name"})
            }
        }
        const collegeData = await collegeModel.findOne({ name: collegeName })
        console.log(collegeData)
        if(collegeData.isDeleted == true) {
            return res.status(400).send({ status: false, message: "this college data is deleted"})
        }

        const collegeId = collegeData ["_id"]
        const internData = await internModel.find({ collegeId: collegeId })
        res.status(200).send({ status: true, data:{name: collegeData.name,
                fullName: collegeData.fullName,
                logoLink: collegeData.logoLink,
                interns: internData}})
        

        

       
    } catch(err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports.getColleges=getColleges


module.exports.createCollege= createCollege