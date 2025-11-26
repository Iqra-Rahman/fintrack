import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    amount: {type:Number, required:true},
    category: {type:String, required:true},
    date: {type:Date, default:Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true}
})

const expenseModel = mongoose.models.expense || mongoose.model('expense', expenseSchema);

export default expenseModel;