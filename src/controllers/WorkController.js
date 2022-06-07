const { response, request} = require('express')
const Work = require('../models/Work')
const Service  =require('../models/Service')
const PaymentType = require('../models/PaymentType')
const { resolve } = require('path')
const User = require('../models/User')


const createWork = async (req, res = response) => {
    const {userClient,service,paymentType,description} = req.body;
    try{
        let userClientBuscado  = await User.findById(userClient);
        let serviceBuscado = await Service.findById(service);
        let paymentTypeBuscado = await PaymentType.findById(paymentType);
        let work = await Work.findOne({userClient,service,paymentType,description});
        if(work) return res.status(400).json({ok: false, msg:'Work already exists'});

        work = new Work({
            userClient: userClient,
            service:serviceBuscado,
            paymentType: paymentTypeBuscado,
            description,
            state: 'pendiente'
        });
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


const acceptWork = async(req, res = response) => {
    const workId = req.params.id;
    try{
        const work = await Work.findById(workId);
        if(!work) return res.status(404).json({msg: 'Work not found'});
        work.state = "aceptado"
        await Work.findByIdAndUpdate(workId,work,{new:true});
        res.json({
            ok:true,
            msg: 'Work Accepted',
            work: work
        })

    }catch(error){
        console.log(error);
        res.status(500).json({status: 'failed', err: 'Contact an admin'});
    }
}

const finalizeWork = async(req, res = response) => {
    const workId = req.params.id;
    try{
        const work = await Work.findById(workId);
        if(!work) return res.status(404).json({msg: 'Work not found'});
        work.state = "finalizado"
        await Work.findOneAndUpdate(work);
        res.json({
            ok:true,
            msg: 'Work Finalized',
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
    deleteWork,
    acceptWork,
    finalizeWork,
}