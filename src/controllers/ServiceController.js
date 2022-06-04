const { response, request} = require('express')
const Service = require('../models/Service')
const { resolve } = require('path')


const createService = async (req, res = response) => {
    const {name} = req.body;
    try{
        let service = await Service.findOne({name});
        if(service) return res.status(400).json({ok: false, msg:'Service already exists'});
        service = new Service(req.body);
        await service.save();
        res.status(201).json({
            ok:true, 
            service: service.id,
            serviceName: service.name
        })

    }catch(err){
        console.log(err);
        res.status(500).json({status: 'failed', err: 'Contact an admin'});
    }
}


const getServices = async (req, res = response) => {
    res.json({
        ok: true, 
        response: await Service.find({})
    })
}

const deleteService = async(req, res = response) => {
    const serviceId = req.params.id;
    try{
        const service = await Service.findById(serviceId);
        if(!service) return res.status(404).json({msg: 'Service not found'});

        await Service.findByIdAndDelete(serviceId);

        res.json({
            ok:true,
            msg: 'Service Deleted',
            service: service
        })

    }catch(error){
        console.log(error);
        res.status(500).json({status: 'failed', err: 'Contact an admin'});
    }
}

module.exports= {
    createService,
    getServices,
    deleteService
}