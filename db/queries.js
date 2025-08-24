import { userModel } from "@/models/user-model";
import { postModel } from "@/models/post-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

async function getAllUsers() {
  const allUsers = await userModel.find().lean();
  return replaceMongoIdInArray(allUsers);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function createPost(post, initialId) {
  console.log(0);
  try {
    console.log("Provided initialId:", initialId);
    console.log("Post data:", post);

    // Step 1: Create the post with a temporary postId
    const createdPost = await postModel.create({
      ...post,
      postId: "temp", // Use a temporary value to satisfy the required field
    });
    console.log("Created post:", createdPost);

    const postWithId = replaceMongoIdInObject(createdPost);
    console.log("postWithId:", postWithId);
    console.log("postWithId.id:", postWithId.id);

    // Step 2: Update postId using InitialId
    const updatePostIdResult = await postModel.updateOne(
      { InitialId: initialId },
      { $set: { postId: postWithId.id } }
    );
    console.log("Update postId result:", updatePostIdResult);

    // Check if the document was found and updated
    if (updatePostIdResult.matchedCount === 0) {
      console.log(`No document found with InitialId: ${initialId}`);
      return postWithId;
    }

    // Step 3: Update InitialId to "" using postId
    const updateInitialIdResult = await postModel.updateOne(
      { postId: postWithId.id },
      { $set: { InitialId: "" } }
    );
    console.log("Update InitialId result:", updateInitialIdResult);

    // Check if the document was found and updated
    if (updateInitialIdResult.matchedCount === 0) {
      console.log(`No document found with postId: ${postWithId.id}`);
    }

    return postWithId;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
}

async function updatePost(postId, title, photo, description, userName) {
  await postModel.updateOne(
    { postId: postId },
    {
      $set: {
        title: title,
        photo: photo,
        description: description,
        userName: userName,
      },
    }
  );
}

async function deletePost(postId) {
  await postModel.deleteOne({ postId: postId });
}

async function getAllPosts() {
  const allPosts = await postModel.find().lean();
  return allPosts;
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateUser(email, name, phone, bio) {
  await userModel.updateOne(
    { email: email },
    { $set: { name: name, phone: phone, bio: bio } }
  );
}

async function changePassword(email, password) {
  await userModel.updateOne({ email: email }, { $set: { password: password } });
}

async function upDateDays(email, days) {
  await userModel.updateOne({ email: email }, { $set: { days: days } });
}

async function changePhoto(email, photo) {
  await userModel.updateOne({ email: email }, { $set: { photo: photo } });
}

async function changeBmi(email, bmi) {
  await userModel.updateOne({ email: email }, { $set: { bmi: bmi } });
}

async function changeRecipe(email, recipe) {
  await userModel.updateOne({ email: email }, { $set: { recipe: recipe } });
}

async function changeGoals(email, goals) {
  await userModel.updateOne({ email: email }, { $set: { goals: goals } });
}

async function changeNutrition(email, nutrition) {
  await userModel.updateOne(
    { email: email },
    { $set: { nutrition: nutrition } }
  );
}

async function changeMeditation(email, meditation) {
  await userModel.updateOne(
    { email: email },
    { $set: { meditation: meditation } }
  );
}

async function changeWorkout(email, workout) {
  await userModel.updateOne({ email: email }, { $set: { workout: workout } });
}

export {
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  changePassword,
  changePhoto,
  upDateDays,
  changeBmi,
  changeRecipe,
  changeGoals,
  changeNutrition,
  changeMeditation,
  changeWorkout,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
