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
    time: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;