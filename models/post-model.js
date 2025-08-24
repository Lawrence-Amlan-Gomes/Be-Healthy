import mongoose, {Schema} from "mongoose";

const schema = new Schema({
  postId: {
    required: true,
    type: String
  },
  InitialId: {
    required: true,
    type: String
  },
  title: {
    required: false,
    type: String
  },
  photo: {
    required: false,
    type: String
  },
  description: {
    required: false,
    type: String
  },
  userEmail: {
    required: true,
    type: String
  },
  userName:{
    required: true,
    type: String
  },
});


export const postModel = mongoose.models.posts ?? mongoose.model("posts", schema);
