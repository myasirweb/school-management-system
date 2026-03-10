import { useSelector } from "react-redux";
import { Rss } from "lucide-react";
import PostCard from "../../UI/PostCard";

const NewsFeedListing = ({ posts: propPosts }) => {
  const reduxPosts = useSelector((state) => state.newsFeed.posts);

  /* Use prop posts (already sorted/filtered) or fall back to Redux sorted */
  const sorted = propPosts ?? [...reduxPosts].sort((a, b) => b.createdAt - a.createdAt);

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm text-center py-16 px-4">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Rss size={24} style={{ color: "var(--color-blue)" }} />
        </div>
        <p className="text-gray-600 font-semibold text-sm">No posts yet.</p>
        <p className="text-gray-400 text-xs mt-1">
          Create the first post for the school community!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sorted.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default NewsFeedListing;
