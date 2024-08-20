"use client";
import { callUpdateUser } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";

const Profile = () => {
  const { theme } = useTheme();
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = async () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      if (auth) {
        await callUpdateUser(auth.email, name, phone, bio);
        setAuth({ ...auth, name: name, bio: bio, phone: phone });
      }
    }
  };

  useEffect(() => {
    if (auth) {
      setName(auth.name);
      setPhone(auth.phone);
      setBio(auth.bio);
    }
  }, [auth]);

  const logout = () => {
    const sure = confirm("Are are surely want to log out?");
    if (sure) {
      setAuth({});
      router.push("/");
    }
  };

  return (
    <div
      className={`h-full w-full place-items-center flex justify-center items-center ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <div className="h-full w-full flex justify-center items-center overflow-y-auto">
        <div
          className={`w-[400px] rounded-xl flex bg-[#080808] justify-center items-center overflow-hidden overflow-y-auto text-[18px] p-5 text-center shadow-lg ${
            theme
              ? "bg-[#ececec] text-[#0a0a0a]"
              : "bg-[#0f0f0f] text-[#f0f0f0]"
          }`}
        >
          <div className="w-full p-10">
            <ProfilePic />

            {auth ? (
              <>
                {" "}
                <div className="w-full mt-5 mb-5 flex items-center justify-center font-bold text-[35px]">
                  {isEditing ? (
                    <input
                      className={`bg-transparent border-[2px] border-blue-700 focus:border-green-700 focus:outline-none text-center rounded-lg w-full p-3`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <div>{name}</div>
                  )}
                </div>
                <div className="w-full mt-5 mb-5 flex items-center justify-center">
                  {auth.email}
                </div>
                <div className="w-full mt-5 mb-5 flex items-center justify-center">
                  {isEditing ? (
                    <input
                      className="bg-transparent border-[2px] border-blue-700 focus:border-green-700 focus:outline-none rounded-lg break-words w-full text-center p-3"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  ) : (
                    <div className="break-words w-full text-center">{bio}</div>
                  )}
                </div>
                <div className="w-full mt-5 mb-5 flex items-center justify-center">
                  {isEditing ? (
                    <input
                      className="bg-transparent border-[2px] border-blue-700 focus:border-green-700 focus:outline-none text-center rounded-lg w-full p-3"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <div>{phone}</div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="w-full mt-5 mb-5 flex items-center justify-center">
              <button
                onClick={handleClick}
                className={`${
                  isEditing ? "text-green-700 " : "text-blue-700"
                } bg-[#161616] p-3 rounded-full hover:bg-[#202020] w-full tracking-wider ${
                  theme
                    ? "bg-[#c9c9c9] hover:bg-[#bdbdbd]"
                    : "bg-[#161616]  hover:bg-[#202020]"
                }`}
              >
                {isEditing ? "Update" : "Edit"}
              </button>
            </div>
            <div className="w-full mt-5 mb-5 flex items-center justify-center">
              <Link href="/changePassword" className="w-full">
                <button
                  className={`p-3 w-full text-purple-600 tracking-wider text-[18px] py-2 px-5 shadow-lg rounded-full ${
                    theme
                      ? "bg-[#c9c9c9] hover:bg-[#bdbdbd]"
                      : "bg-[#161616]  hover:bg-[#202020]"
                  }`}
                >
                  Change Password
                </button>
              </Link>
            </div>
            <div className="w-full mt-5 mb-5 flex items-center justify-center">
              <button
                onClick={logout}
                className={`p-3  w-full text-red-600 tracking-wider text-[18px] py-2 px-5 shadow-lg rounded-full ${
                  theme
                    ? "bg-[#c9c9c9] hover:bg-[#bdbdbd]"
                    : "bg-[#161616]  hover:bg-[#202020]"
                }`}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
