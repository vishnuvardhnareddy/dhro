const mongoose = require('mongoose');

// Create a schema for coupon codes
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,

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

const offlineCourseSchema = new mongoose.Schema({
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
    coupons: {
        type: [couponSchema],
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const OfflineCourse = mongoose.model('OfflineCourse', offlineCourseSchema);

module.exports = OfflineCourse;