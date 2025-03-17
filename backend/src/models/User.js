const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    courses: [
        {
            title: { type: String, required: true }, // Course title
            imgUrl: { type: String, required: true }, // Course image URL
        }
    ],
});

// Ensure indexes are created, including unique constraints
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
