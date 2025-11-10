import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    amount: {type: Number, reguired: true},
    source: {type: String, required: true},
    date: {type:Date, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
});

const incomeModel = mongoose.models.income || mongoose.model('income', incomeSchema);

export default incomeModel;