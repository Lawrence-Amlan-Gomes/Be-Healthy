"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { callAddCommunityPost, callGetCommunityPosts, callLikeCommunityPost } from "@/db/index";

export default function CommunitySupportForum() {
  const { theme } = useTheme();
  const { auth } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    } else {
      fetchPosts();
    }
  }, [auth, router]);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await callGetCommunityPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to load posts.");
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) {
      setError("Post content cannot be empty.");
      return;
    }
    try {
      await callAddCommunityPost(auth.email, newPost);
      setNewPost("");
      fetchPosts();
    } catch (err) {
      setError("Failed to create post.");
    }
  };

  const handleLike = async (postId) => {
    try {
      await callLikeCommunityPost(auth.email, postId);
      fetchPosts();
    } catch (err) {
      setError("Failed to like post.");
    }
  };

  return (
    <div
      className={`w-full h-full overflow-y-auto scrollbar ${
        theme
          ? "bg-[#ffffff] text-[#0a0a0a] scrollbar-track-[#eeeeee] scrollbar-thumb-[#333333]"
          : "bg-[#000000] text-[#ebebeb] scrollbar-track-[#222222] scrollbar-thumb-[#eeeeee]"
      }`}
    >
      <div
        className={`w-full py-10 font-bold float-left text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px] flex justify-center items-center`}
      >
        Community Support Forum
      </div>

      <div className={`w-full md:px-10 px-5 pb-10 flex flex-col gap-10`}>
        <div
          className={`w-full p-5 rounded-lg flex flex-col justify-center items-center ${
            theme
              ? "bg-[#ececec] text-[#0a0a0a]"
              : "bg-[#0f0f0f] text-[#f0f0f0]"
          }`}
        >
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your health tips or progress..."
            className={`p-3 border-[2px] w-full rounded-md focus:outline-none bg-transparent placeholder:text-zinc-400 ${
              theme ? "border-[#888888]" : "border-[#666666]"
            }`}
          />
          {error && (
            <div className="w-full text-red-600 text-center p-2">{error}</div>
          )}
          <div
            onClick={handlePost}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mt-3 cursor-pointer"
          >
            Post
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`p-5 rounded-lg flex flex-col justify-center items-start ${
                theme
                  ? "bg-[#ececec] text-[#0a0a0a]"
                  : "bg-[#0f0f0f] text-[#f0f0f0]"
              }`}
            >
              <div className="w-full font-bold">{post.userName}</div>
              <div className="w-full text-[16px] p-2">{post.content}</div>
              <div className="w-full flex gap-3">
                <div
                  onClick={() => handleLike(post._id)}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 cursor-pointer"
                >
                  Like ({post.likes})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}