const { response, request} = require('express')
const Work = require('../models/Work')
const { resolve } = require('path')


const createWork = async (req, res = response) => {
    const {userClient,service,paymentType,description} = req.body;
    try{
        let work = await Work.findOne({userClient,service,paymentType,description});
        if(work) return res.status(400).json({ok: false, msg:'Work already exists'});

        work = new Work(req.body);
        await work.save();

        res.status(201).json({
            ok:true, 
            work: work.id,
            work: work
        })
    }catch(err){
        console.log(err);
        res.status(500).json({status: 'failed', err: 'Contact an admin'});
    }
}


const getWorks = async (req, res = response) => {
    res.json({
        ok: true, 
        response: await Work.find({})
    })
}

const deleteWork = async(req, res = response) => {
    const workId = req.params.id;
    try{
        const work = await Work.findById(workId);
        if(!work) return res.status(404).json({msg: 'Work not found'});

        await Work.findByIdAndDelete(workId);

        res.json({
            ok:true,
            msg: 'Work Deleted',
            work: work
        })

    }catch(error){
        console.log(error);
        res.status(500).json({status: 'failed', err: 'Contact an admin'});
    }
}

module.exports= {
    createWork,
    getWorks,
    deleteWork
}