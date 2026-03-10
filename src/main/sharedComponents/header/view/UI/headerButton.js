import { Button } from "antd";

const HeaderButton = ({ title, onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: "var(--color-blue)",
        color: "#ffffff",
        borderColor: "var(--color-blue)",
      }}
      className="flex items-center gap-2 hover:!bg-[rgba(65,87,150,1)] hover:!border-[rgba(65,87,150,1)]"
    >
      {title}
    </Button>
  );
};

export default HeaderButton;
