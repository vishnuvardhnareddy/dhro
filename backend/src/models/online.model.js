const mongoose = require('mongoose');

// Create a schema for coupon codes
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiryDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the schema for online courses
const onlineCourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    overview: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number
    },
    imageUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    paymentLink: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    courseMaterials: {
        type: [String],
        default: []
    },
    coupons: {
        type: [couponSchema], // Allows multiple coupons, including duplicate discount values and codes
        default: []
    },
    featuredCouponCodes: {
        type: [String],
        default: []
    },
    subscriptionDetails: {
        duration: {
            type: String,
            enum: ['1 month', '3 months', '6 months', '1 year', 'Lifetime'],
            default: 'Lifetime'
        },
        features: {
            type: [String],
            default: []
        }
    }
}, { timestamps: true });

const OnlineCourse = mongoose.model('OnlineCourse', onlineCourseSchema);

module.exports = OnlineCourse;
