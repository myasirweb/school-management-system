import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Select, Button, Popconfirm, Tooltip } from "antd";
import {
  SendOutlined,
  PaperClipOutlined,
  DeleteOutlined,
  BoldOutlined,
  MinusOutlined,
  FullscreenOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { sendEmail, saveDraft } from "../../../store/mailBoxSlice";
import { CURRENT_USER } from "../../../utils/mailBoxDummyData";

const ComposeWindow = ({ windowData, index, onMinimize, onMaximize, onClose }) => {
  const dispatch = useDispatch();
  const { minimized, maximized } = windowData;

  const [to,      setTo]      = useState([]);
  const [cc,      setCc]      = useState([]);
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [showCc,  setShowCc]  = useState(false);

  const hasContent = to.length > 0 || subject.trim() || body.trim();

  const resetForm = () => {
    setTo([]);
    setCc([]);
    setSubject("");
    setBody("");
    setShowCc(false);
  };

  const buildEmail = (folder) => ({
    id:             `EMAIL${Date.now()}`,
    from:           { name: CURRENT_USER.name, email: CURRENT_USER.email },
    to:             to.map((addr) => ({ name: addr, email: addr })),
    cc:             cc.map((addr) => ({ name: addr, email: addr })),
    subject:        subject.trim() || "(No Subject)",
    body,
    timestamp:      new Date().toISOString(),
    isRead:         true,
    isStarred:      false,
    isImportant:    false,
    folder,
    hasAttachment:  false,
    attachmentName: null,
    labels:         [],
  });

  const handleSend = () => {
    dispatch(sendEmail(buildEmail("sent")));
    resetForm();
    onClose();
  };

  const handleSaveDraft = () => {
    dispatch(saveDraft(buildEmail("drafts")));
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  /* Position logic */
  const rightOffset = 16 + index * 496;

  const windowStyle = maximized
    ? {
        position:      "fixed",
        top:           "50%",
        left:          "50%",
        transform:     "translate(-50%, -50%)",
        width:         700,
        height:        "80vh",
        zIndex:        1001,
        borderRadius:  12,
        overflow:      "hidden",
        boxShadow:     "0 25px 50px rgba(0,0,0,0.25)",
        display:       "flex",
        flexDirection: "column",
      }
    : {
        position:      "fixed",
        bottom:        0,
        right:         rightOffset,
        width:         480,
        height:        minimized ? 44 : 520,
        zIndex:        1000,
        borderRadius:  "12px 12px 0 0",
        overflow:      "hidden",
        boxShadow:     "0 8px 32px rgba(0,0,0,0.18)",
        display:       "flex",
        flexDirection: "column",
        transition:    "height 200ms ease",
      };

  return (
    <>
      {/* Backdrop for maximized state */}
      {maximized && (
        <div
          style={{
            position:        "fixed",
            inset:           0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex:          999,
          }}
          onClick={onMaximize}
        />
      )}

      <div style={windowStyle}>
        {/* Header */}
        <div
          className="flex items-center px-4 shrink-0 cursor-default select-none"
          style={{ backgroundColor: "#1f2937", color: "#ffffff", minHeight: 44 }}
        >
          <span className="flex-1 text-sm font-semibold truncate">New Message</span>
          <div className="flex items-center gap-0.5">
            <Tooltip title={minimized ? "Expand" : "Minimize"}>
              <button
                type="button"
                onClick={onMinimize}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
              >
                <MinusOutlined style={{ fontSize: 13, color: "#fff" }} />
              </button>
            </Tooltip>
            <Tooltip title={maximized ? "Restore" : "Maximize"}>
              <button
                type="button"
                onClick={onMaximize}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
              >
                <FullscreenOutlined style={{ fontSize: 13, color: "#fff" }} />
              </button>
            </Tooltip>
            <Tooltip title="Close">
              <button
                type="button"
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-500 transition-colors"
              >
                <CloseOutlined style={{ fontSize: 13, color: "#fff" }} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Form — hidden when minimized */}
        {!minimized && (
          <div className="flex flex-col flex-1 bg-white overflow-hidden">
            {/* To */}
            <div className="shrink-0 flex items-center border-b border-gray-100 px-4 py-1">
              <span className="text-xs font-semibold text-gray-400 w-14 shrink-0">To</span>
              <Select
                mode="tags"
                value={to}
                onChange={setTo}
                placeholder="Add recipients…"
                variant="borderless"
                className="flex-1 text-sm"
                tokenSeparators={[",", " "]}
                open={false}
                suffixIcon={null}
              />
              {!showCc && (
                <button
                  type="button"
                  onClick={() => setShowCc(true)}
                  className="text-xs text-gray-400 hover:text-gray-600 shrink-0 ml-2 transition-colors"
                >
                  CC
                </button>
              )}
            </div>

            {/* CC */}
            {showCc && (
              <div className="shrink-0 flex items-center border-b border-gray-100 px-4 py-1">
                <span className="text-xs font-semibold text-gray-400 w-14 shrink-0">CC</span>
                <Select
                  mode="tags"
                  value={cc}
                  onChange={setCc}
                  placeholder="Add CC recipients…"
                  variant="borderless"
                  className="flex-1 text-sm"
                  tokenSeparators={[",", " "]}
                  open={false}
                  suffixIcon={null}
                />
              </div>
            )}

            {/* Subject */}
            <div className="shrink-0 border-b border-gray-100 px-4 py-1">
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                variant="borderless"
                className="text-sm font-semibold text-gray-800"
              />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email here…"
                className="w-full h-full text-sm text-gray-700 leading-relaxed px-4 py-3 resize-none outline-none"
                style={{ border: "none" }}
              />
            </div>

            {/* Footer */}
            <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  size="small"
                  className="rounded-lg font-semibold"
                  style={{
                    backgroundColor: "var(--color-blue)",
                    borderColor:     "var(--color-blue)",
                    color:           "#ffffff",
                  }}
                >
                  Send
                </Button>
                <Button
                  onClick={handleSaveDraft}
                  size="small"
                  className="rounded-lg font-medium border-gray-300 text-gray-600"
                >
                  Save Draft
                </Button>
              </div>
              <div className="flex items-center gap-0.5">
                <Tooltip title="Attach file">
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<PaperClipOutlined style={{ color: "#9ca3af", fontSize: 14 }} />}
                    className="hover:bg-gray-100"
                  />
                </Tooltip>
                <Tooltip title="Bold">
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<BoldOutlined style={{ color: "#9ca3af", fontSize: 14 }} />}
                    className="hover:bg-gray-100"
                  />
                </Tooltip>
                <Popconfirm
                  title="Discard this email?"
                  description="Your unsaved changes will be lost."
                  okText="Discard"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                  onConfirm={handleClose}
                  disabled={!hasContent}
                >
                  <Tooltip title="Discard">
                    <Button
                      type="text"
                      shape="circle"
                      size="small"
                      icon={<DeleteOutlined style={{ color: "#ef4444", fontSize: 14 }} />}
                      className="hover:bg-red-50"
                      onClick={!hasContent ? handleClose : undefined}
                    />
                  </Tooltip>
                </Popconfirm>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ComposeWindow;
