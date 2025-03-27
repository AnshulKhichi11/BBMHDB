const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    phone: {
        type: String, // Use String instead of Number
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Regex to ensure exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    Date: {
        type: Date,
        required: true
    },
    Gender : {
        type:String,
        required: true
    },
    age:{
        type:Number,
        required:true,
    },
    time: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: null
    }
});


const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;