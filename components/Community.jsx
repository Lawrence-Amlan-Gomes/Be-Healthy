"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  callCreatePost,
  callUpdatePost,
  callDeletePost,
  callGetAllPosts,
} from "@/app/actions";
import EachPostCard from "./EachPostCard";
import { motion } from "framer-motion";

export default function CommunitySupportForum() {
  const { theme } = useTheme();
  const { auth, setAllPosts } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    photo: "",
    description: "",
  });
  const fileInputRef = useRef(null);

  // Fetch all posts on initial render
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await callGetAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        setAllPosts(allPosts);
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [setAllPosts]);

  // Filter posts based on search query
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewPost((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.onerror = () => {
      setError("Failed to read image file");
    };
  };

  // Handle create post
  const handleCreatePost = async () => {
    if (!auth) {
      setError("You must be logged in to create a post");
      return;
    }
    if (!newPost.title || !newPost.description) {
      setError("Title and description are required");
      return;
    }
    setIsCreating(false);
    try {
      const initialId = `${auth.email}${Date.now()}`;
      await callCreatePost(
        {
          InitialId: initialId,
          title: newPost.title,
          photo: newPost.photo,
          description: newPost.description,
          userEmail: auth.email,
          userName: auth.name,
        },
        initialId
      );
      // Re-fetch all posts after creation
      const allPosts = await callGetAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setAllPosts(allPosts);
      setNewPost({ title: "", photo: "", description: "" });
      setError("");
    } catch (error) {
      console.error("Post creation failed:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  // Handle update post
  const handleUpdatePost = async (postId) => {
    if (!auth) {
      setError("You must be logged in to update a post");
      return;
    }
    if (!newPost.title || !newPost.description) {
      setError("Title and description are required");
      return;
    }
    try {
      await callUpdatePost(postId, newPost.title, newPost.photo, newPost.description, auth.name);
      const allPosts = await callGetAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setAllPosts(allPosts);
      setSelectedPost((prev) =>
        prev?.postId === postId
          ? { ...prev, title: newPost.title, photo: newPost.photo, description: newPost.description }
          : prev
      );
      setNewPost({ title: "", photo: "", description: "" });
      setIsCreating(false);
      setError("");
    } catch (error) {
      console.error("Post update failed:", error);
      setError("Failed to update post. Please try again.");
    }
  };

  // Handle delete post
  const handleDeletePost = async (postId) => {
    if (!auth) {
      setError("You must be logged in to delete a post");
      return;
    }
    try {
      await callDeletePost(postId);
      const allPosts = await callGetAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setAllPosts(allPosts);
      setSelectedPost(null);
      setError("");
    } catch (error) {
      console.error("Post deletion failed:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  // Handle photo input click
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`h-full w-full overflow-hidden p-5 ${
        theme ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#000000] text-[#ebebeb]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        {/* Left Side: Search and Posts (70%) */}
        <div className="w-[70%] h-full float-left pr-5 overflow-auto">
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or username"
            className={`w-full p-2 mb-4 rounded-lg border-2 ${
              theme
                ? "bg-[#ffffff] border-blue-700 focus:border-green-700"
                : "bg-[#1a1a1a] border-blue-700 focus:border-green-700"
            } focus:outline-none`}
          />
          <div className="flex flex-wrap -mx-2">
            {filteredPosts.map((post) => (
              <div key={post.postId} className="w-1/3 px-2 mb-4">
                <EachPostCard post={post} onSelect={() => setSelectedPost(post)} />
              </div>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <p className="text-center">No posts found</p>
          )}
        </div>

        {/* Right Side: Create and Details (30%) */}
        <div
          className={`w-[30%] h-full float-left p-5 rounded-lg shadow-lg overflow-auto ${
            theme ? "bg-[#ececec]" : "bg-[#0f0f0f]"
          }`}
        >
          {/* Create Post Button and Form */}
          {auth && (
            <>
              <button
                onClick={() => setIsCreating((prev) => !prev)}
                className={`w-full p-3 mb-4 rounded-lg ${
                  theme
                    ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-blue-700"
                    : "bg-[#161616] hover:bg-[#202020] text-blue-700"
                }`}
              >
                {isCreating ? "Cancel" : "Create Post"}
              </button>
              {isCreating && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    placeholder="Post Title"
                    className={`w-full p-2 mb-2 rounded-lg border-2 ${
                      theme
                        ? "bg-[#ffffff] border-blue-700 focus:border-green-700"
                        : "bg-[#1a1a1a] border-blue-700 focus:border-green-700"
                    } focus:outline-none`}
                  />
                  <div className="w-full mb-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <button
                      onClick={handlePhotoClick}
                      className={`w-full p-2 rounded-lg ${
                        theme
                          ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-blue-700"
                          : "bg-[#161616] hover:bg-[#202020] text-blue-700"
                      }`}
                    >
                      {newPost.photo ? "Change Photo" : "Upload Photo"}
                    </button>
                    {newPost.photo && (
                      <>
                        <img
                          src={newPost.photo}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg mt-2"
                        />
                        <button
                          onClick={() => setNewPost({ ...newPost, photo: "" })}
                          className={`w-full p-2 mt-2 rounded-lg ${
                            theme
                              ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-red-700"
                              : "bg-[#161616] hover:bg-[#202020] text-red-700"
                          }`}
                        >
                          Remove Photo
                        </button>
                      </>
                    )}
                  </div>
                  <textarea
                    value={newPost.description}
                    onChange={(e) =>
                      setNewPost({ ...newPost, description: e.target.value })
                    }
                    placeholder="Post Description"
                    className={`w-full p-2 mb-2 rounded-lg border-2 ${
                      theme
                        ? "bg-[#ffffff] border-blue-700 focus:border-green-700"
                        : "bg-[#1a1a1a] border-blue-700 focus:border-green-700"
                    } focus:outline-none`}
                  />
                  <button
                    onClick={handleCreatePost}
                    className={`w-full p-3 rounded-lg ${
                      theme
                        ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-green-700"
                        : "bg-[#161616] hover:bg-[#202020] text-green-700"
                    }`}
                  >
                    Submit Post
                  </button>
                </div>
              )}
            </>
          )}

          {/* Post Details */}
          {selectedPost && (
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
              <p className="mb-2">By: {selectedPost.userName}</p>
              <p className="mb-2">{selectedPost.description}</p>
              {selectedPost.photo ? (
                <img
                  src={selectedPost.photo}
                  alt="Post"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              ) : (
                <></>
              )}
              {auth && auth.email === selectedPost.userEmail && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setIsCreating(true);
                      setNewPost({
                        title: selectedPost.title,
                        photo: selectedPost.photo,
                        description: selectedPost.description,
                      });
                    }}
                    className={`w-full p-3 mb-2 rounded-lg ${
                      theme
                        ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-blue-700"
                        : "bg-[#161616] hover:bg-[#202020] text-blue-700"
                    }`}
                  >
                    Edit Post
                  </button>
                  {isCreating && auth.email === selectedPost.userEmail && (
                    <button
                      onClick={() => handleUpdatePost(selectedPost.postId)}
                      className={`w-full p-3 mb-2 rounded-lg ${
                        theme
                          ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-green-700"
                          : "bg-[#161616] hover:bg-[#202020] text-green-700"
                      }`}
                    >
                      Update Post
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePost(selectedPost.postId)}
                    className={`w-full p-3 rounded-lg ${
                      theme
                        ? "bg-[#c9c9c9] hover:bg-[#bdbdbd] text-red-700"
                        : "bg-[#161616] hover:bg-[#202020] text-red-700"
                    }`}
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
          {error && <p className="text-red-700 mt-4">{error}</p>}
        </div>
      </motion.div>
    </div>
  );
}