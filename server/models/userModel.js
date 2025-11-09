const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        // Primary identifier for OTP flow
        mobileNumber: {
            type: String,
            unique: true,
            sparse: true, // Allows multiple documents to have a null/missing value
        },
        // Primary identifier for Google flow
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        // Collected from Google or after OTP login
        fullName: {
            type: String,
            required: false,
        },
        // Collected from Google
        email: {
            type: String,
            unique: true,
            sparse: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        // For OTP storage
        otp: {
            type: String,
            select: false,
        },
        otpExpires: {
            type: Date,
            select: false,
        },
        // We can add other fields from your "Update Details" page here
        dateOfBirth: { type: Date },
        address: {
            houseNumber: { type: String },
            street: { type: String },
            city: { type: String },
        },
        role: { type: String, enum: ['user', 'agent'], default: 'user' },
        dealershipName: { type: String },
    },

    {
        timestamps: true,
    }
);

// Hash the OTP before saving (good practice)
userSchema.pre('save', async function (next) {
    if (!this.isModified('otp') || !this.otp) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
});

// Method to compare submitted OTP with hashed OTP
userSchema.methods.compareOTP = async function (submittedOTP) {
    if (!this.otp) return false;
    return await bcrypt.compare(submittedOTP, this.otp);
};

module.exports = mongoose.model('User', userSchema);