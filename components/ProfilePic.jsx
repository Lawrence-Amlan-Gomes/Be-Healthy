"use client";
import { callChangePhoto } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useRef, useState } from "react";

export default function ProfilePic() {
  const [editPic, setEditPic] = useState(false);
  const [image, setImage] = useState("");
  const { auth, setAuth } = useAuth();
  const inputRef = useRef(null);

  useEffect(() => {
    if (editPic) {
      setTimeout(() => {
        setEditPic(false);
      }, 5000);
    }
  }, [editPic]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    if (file) {
      reader.onload = () => {
        setImage(reader.result);
        setAuth({ ...auth, photo: image });
      };
    }
  };

  useEffect(() => {
    const callPhoto = async () => {
      await callChangePhoto(auth.email, image);
    };
    if (image != "") {
      callPhoto();
      setAuth({ ...auth, photo: image });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    if (auth.photo != "") {
      setImage(auth.photo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.photo]);

  const handleImageDelete = async () => {
    setImage("");
    setAuth({ ...auth, photo: "" });
    await callChangePhoto(auth.email, "");
  };

  return (
    <div className="w-full mt-5 relative">
      <div className="w-full flex items-center justify-center relative">
        <div
          className="bg-white w-[150px] h-[150px] rounded-full overflow-hidden"
          onClick={() => setEditPic((prev) => !prev)}
        >
          {auth != {} ? (
            image == "" ? (
              <div className="w-full h-full flex justify-center items-center text-[100px] font-bold">
                <div className="text-black cursor-pointer">
                  {auth.name.charAt(0) != undefined ? auth.name.charAt(0) : ""}
                </div>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="profilepic" width="100%"></img>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      {editPic ? (
        <div className="w-full relative">
          <input
            className="hidden"
            type="file"
            name="file"
            ref={inputRef}
            onChange={handleImageUpload}
          />
          <button
            type="file"
            className="text-blue-700 py-2 rounded-full bg-[#181818] hover:bg-[#222222] px-3 w-[46%] m-[2%] box-border float-left"
            onClick={handleImageClick}
          >
            Upload
          </button>
          <button
            className="text-red-700 py-2 rounded-full bg-[#181818] hover:bg-[#222222] px-3 w-[46%] m-[2%] box-border float-left"
            onClick={handleImageDelete}
          >
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
