import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import {
  FileTextOutlined,
  PictureOutlined,
  BarChartOutlined,
  PaperClipOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { addPost } from "../../../store/newsFeedSlice";
import {
  CURRENT_USER,
  savePostsToStorage,
} from "../../../utils/newsFeedDummyData";

const POST_TYPES = [
  { key: "text",     label: "Text",     icon: <FileTextOutlined /> },
  { key: "photo",    label: "Photo",    icon: <PictureOutlined /> },
  { key: "poll",     label: "Poll",     icon: <BarChartOutlined /> },
  { key: "document", label: "Document", icon: <PaperClipOutlined /> },
];

/* initialPostType — pre-selects the tab matching whichever icon was clicked.
   onClose        — called on both submit and cancel to close the modal.
   destroyOnClose on the parent Modal guarantees a fresh mount each open,
   so useState(initialPostType) always reflects the clicked icon correctly. */
const NewsFeedComposer = ({ initialPostType = "text", onClose }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.newsFeed.posts);

  const [postType, setPostType]         = useState(initialPostType);
  const [content, setContent]           = useState("");
  const [imageUrl, setImageUrl]         = useState("");
  const [documentName, setDocumentName] = useState("");
  const [pollOptions, setPollOptions]   = useState(["", ""]);

  const handleAddOption = () => {
    if (pollOptions.length < 4) setPollOptions((p) => [...p, ""]);
  };

  const handleRemoveOption = (index) => {
    setPollOptions((p) => p.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    setPollOptions((p) => {
      const updated = [...p];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newPost = {
      id: `POST${Date.now()}`,
      authorName:   CURRENT_USER.name,
      authorAvatar: CURRENT_USER.avatar,
      authorRole:   CURRENT_USER.role,
      postType,
      content: content.trim(),
      image:
        postType === "photo" && imageUrl.trim() ? imageUrl.trim() : null,
      pollOptions:
        postType === "poll"
          ? pollOptions
              .filter((o) => o.trim())
              .map((o) => ({ option: o.trim(), votes: 0 }))
          : null,
      documentName:
        postType === "document" && documentName.trim()
          ? documentName.trim()
          : null,
      likes: 0,
      likedByCurrentUser: false,
      comments: [],
      shares: 0,
      createdAt: Date.now(),
    };

    dispatch(addPost(newPost));
    /* Page/index.js useEffect also persists, but save immediately here
       so the post is in localStorage before any navigation. */
    savePostsToStorage([newPost, ...posts]);
    onClose();
  };

  const isSubmitDisabled =
    !content.trim() ||
    (postType === "poll" &&
      pollOptions.filter((o) => o.trim()).length < 2);

  return (
    <div className="pt-1">
      {/* Post-type tab strip */}
      <div className="flex gap-1.5 mb-4 p-1 bg-gray-100 rounded-lg">
        {POST_TYPES.map((type) => (
          <button
            key={type.key}
            type="button"
            onClick={() => setPostType(type.key)}
            className={[
              "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md text-sm font-medium transition-all duration-150",
              postType === type.key
                ? "bg-white shadow-sm text-[var(--color-blue)]"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
          >
            {type.icon}
            <span className="hidden sm:inline">{type.label}</span>
          </button>
        ))}
      </div>

      <Form layout="vertical" requiredMark={false}>
        {/* Main text — always visible */}
        <Form.Item>
          <Input.TextArea
            placeholder={
              postType === "poll"
                ? "Add context for your poll (optional)…"
                : "What's on your mind? Share with the school community…"
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            showCount
            maxLength={500}
            size="large"
            autoFocus
          />
        </Form.Item>

        {/* Photo — URL + live preview */}
        {postType === "photo" && (
          <Form.Item label="Image URL">
            <Input
              placeholder="https://example.com/photo.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              prefix={<PictureOutlined className="text-gray-400" />}
              size="large"
            />
            {imageUrl.trim() && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-full rounded-lg object-cover max-h-48"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </Form.Item>
        )}

        {/* Poll — up to 4 options */}
        {postType === "poll" && (
          <Form.Item label="Poll Options (min 2)">
            <div className="space-y-2">
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    prefix={
                      <span className="text-xs text-gray-400 font-bold w-3">
                        {i + 1}
                      </span>
                    }
                    size="large"
                  />
                  {pollOptions.length > 2 && (
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => handleRemoveOption(i)}
                    />
                  )}
                </div>
              ))}

              {pollOptions.length < 4 && (
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={handleAddOption}
                  className="mt-1"
                >
                  Add Option
                </Button>
              )}
            </div>
          </Form.Item>
        )}

        {/* Document — file name */}
        {postType === "document" && (
          <Form.Item label="Document Name">
            <Input
              placeholder="e.g., Assignment_Chapter5.pdf"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              prefix={<PaperClipOutlined className="text-gray-400" />}
              size="large"
            />
          </Form.Item>
        )}
      </Form>

      {/* Modal footer — Cancel + Post */}
      <div className="flex justify-end gap-3 pt-4 border-t mt-2">
        <Button size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          style={{
            backgroundColor: "var(--color-blue)",
            borderColor: "var(--color-blue)",
            color: "#ffffff",
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default NewsFeedComposer;
