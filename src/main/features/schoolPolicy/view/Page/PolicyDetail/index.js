import { Tag, Divider, Button } from "antd";
import {
  BankOutlined,
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const PolicyDetail = ({ policy }) => {
  return (
    <div className="flex flex-col flex-1 bg-[#f6f6f9] h-full overflow-hidden">
      {/* Panel header — gradient */}
      <div
        className="px-6 py-3 flex items-center justify-between shrink-0"
        style={{
          background: "linear-gradient(135deg, rgb(82,107,177), rgb(69,198,238))",
        }}
      >
        <span
          className="text-sm font-bold text-white"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Description
        </span>
        {policy && (
          <Tag
            style={{
              borderColor: "rgba(255,255,255,0.6)",
              color: "#fff",
              backgroundColor: "transparent",
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {policy.category}
          </Tag>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {!policy ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <BankOutlined style={{ fontSize: 52, color: "#d1d5db" }} />
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Select a policy to view details
            </p>
          </div>
        ) : (
          /* CHANGE 3: p-5 outer wrapper so card never touches panel edges */
          <div className="p-5">
            {/* CHANGE 2: card with shadow + 5px border-radius */}
            <div
              className="bg-white flex flex-col"
              style={{
                borderRadius: 5,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                padding: "20px 24px",
              }}
            >
              {/* Title */}
              <h2
                className="text-2xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {policy.title}
              </h2>

              {/* Meta row */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Tag
                  style={{
                    backgroundColor: policy.tagColor,
                    color: "#fff",
                    border: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 8px",
                    borderRadius: 999,
                  }}
                >
                  {policy.tag}
                </Tag>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs text-gray-400">
                  Effective: {policy.effectiveDate}
                </span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs text-gray-400">
                  Last Updated: {policy.lastUpdated}
                </span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs text-gray-400">
                  By: {policy.createdBy}
                </span>
              </div>

              <Divider className="my-4" />

              {/* Description paragraphs */}
              {(Array.isArray(policy.description)
                ? policy.description
                : [policy.description]
              ).map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-700 leading-8 mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky action bar — only shown when a policy is selected */}
      {policy && (
        <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-3 flex items-center gap-3">
          <Button
            icon={<DownloadOutlined />}
            style={{
              borderColor: "rgb(82,107,177)",
              color: "rgb(82,107,177)",
            }}
          >
            Download PDF
          </Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Button icon={<ShareAltOutlined />}>Share</Button>
        </div>
      )}
    </div>
  );
};

export default PolicyDetail;
