import { Schema, Document, ObjectId, Types } from 'mongoose';


interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
  }

const reactionSchema = new Schema<IReaction>(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: function () {
          return new Types.ObjectId();
        },
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      _id: false, 
    }
  );
  
  export default reactionSchema

