const { response, request } = require("express");
const PaymentType = require("../models/PaymentType");
const { resolve } = require("path");

const createPaymentType = async (req, res = response) => {
    const { name } = req.body;
    try {
        let paymentType = await PaymentType.findOne({ name });
        if (paymentType)
            return res
                .status(400)
                .json({ ok: false, msg: "PaymentType already exists" });
        paymentType = new PaymentType(req.body);
        await paymentType.save();
        res.status(201).json({
            ok: true,
            paymentType: paymentType.id,
            paymentTypeName: paymentType.name,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "failed", err: "Contact an admin" });
    }
};

const getPaymentTypes = async (req, res = response) => {
    res.json({
        ok: true,
        response: await PaymentType.find({}),
    });
};

const deletePaymentType = async (req, res = response) => {
    const paymentTypeId = req.params.id;
    try {
        const paymentType = await PaymentType.findById(paymentTypeId);
        if (!paymentType)
            return res.status(404).json({ msg: "PaymentType not found" });

        await PaymentType.findByIdAndDelete(paymentTypeId);

        res.json({
            ok: true,
            msg: "PaymentType Deleted",
            paymentType: paymentType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", err: "Contact an admin" });
    }
};

module.exports = {
    createPaymentType,
    getPaymentTypes,
    deletePaymentType,
};
