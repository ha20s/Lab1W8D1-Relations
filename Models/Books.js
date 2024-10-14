import mongoose from 'mongoose';

const { Schema } = mongoose;

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    publicDate: {
      type: Date,
      required: true,
    },
    isAvailable : {type: Boolean , required : true}, 
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model('Books', booksSchema);

export default Books; 
