import mongoose from "mongoose";

const financialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    monthlyIncome: { type: Number, default: 0 },
    monthlyExpenseLimit: { type: Number, default: 0 },
    monthlySavingGoal: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now }
});

const financialModel =
    mongoose.models.financial || mongoose.model("financial", financialSchema);

export default financialModel;
