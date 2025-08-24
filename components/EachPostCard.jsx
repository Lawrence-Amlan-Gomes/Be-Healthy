import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";

export default function EachPostCard({ post, onSelect }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-full p-4 rounded-lg shadow-lg cursor-pointer flex flex-col ${
        theme ? "bg-[#ececec] text-[#0a0a0a]" : "bg-[#0f0f0f] text-[#f0f0f0]"
      }`}
      onClick={onSelect}
    >
      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
      <p className="text-sm mb-2">By: {post.userName}</p>
      {post.photo ? (
        <img
          src={post.photo}
          alt="Post"
          className="w-full h-[140px] object-cover rounded-lg mb-2"
        />
      ) : (
        <></>
      )}
      <div className="flex-grow" /> {/* Ensures equal height in row */}
    </motion.div>
  );
}