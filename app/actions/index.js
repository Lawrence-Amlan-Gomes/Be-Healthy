"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/services/mongo";
import {
  createUser,
  findUserByCredentials,
  getAllUsers,
  updateUser,
  changePassword,
  changePhoto,
  upDateDays
} from "@/db/queries";
import { redirect } from "next/navigation";

async function registerUser(formData) {
    await dbConnect()
    const created = await createUser(formData);
    redirect("/login");
}

async function getAllUsers2() {
  try {
    await dbConnect()
    const users = await getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
}

async function performLogin(formData) {
  try {
    const found = await findUserByCredentials(formData);
    return found;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

async function callUpdateUser(email, name, phone, bio) {
  try {
    await updateUser(email, name, phone, bio);
    revalidatePath("/");
  } catch (error) {
    throw error;
  }
  
}

async function callChangePassword(email, password) {
  try {
    await changePassword(email, password);
    redirect("/");
  } catch (error) {
    throw error;
  }
}

async function callUpdateDays(email, days) {
  try {
    await upDateDays(email, days);
    redirect("/");
  } catch (error) {
    throw error;
  }
}

async function callChangePhoto(email, photo) {
  try {
    await changePhoto(email, photo);
    redirect("/profile");
  } catch (error) {
    throw error;
  }
}

export { registerUser, performLogin, getAllUsers2, callUpdateUser, callChangePassword, callChangePhoto, callUpdateDays };
