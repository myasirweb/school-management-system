import { BookOpen, Calendar, FileText } from "lucide-react";
import { Card, Button, Row, Col, Tooltip } from "antd";

const QuickActions = () => {
  const actions = [
    { label: "Calendar", icon: Calendar, bg: "bg-emerald-50", iconColor: "text-green-600" },
    { label: "Exam Result", icon: FileText, bg: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Fees", icon: BookOpen, bg: "bg-cyan-50", iconColor: "text-cyan-600" },
    { label: "Home Works", icon: FileText, bg: "bg-red-50", iconColor: "text-red-600" },
  ];

  return (
    <Card
      title={<span className="font-semibold text-gray-900">Quick Links</span>}
      bordered
      className="shadow-sm pb-4"
    >
      <Row gutter={[28, 28]}>
        {actions.map((action, idx) => (
          <Col xs={12} sm={12} md={12} key={idx}>
            <Tooltip title={action.label}>
              <Button
                block
                className={`
                  flex flex-col items-center 
                  gap-4            /* more space between icon & text */
                  p-7              /* more inside padding */
                  h-40             /* taller tile */
                  border-0 
                  rounded-2xl 
                  transition 
                  hover:shadow-lg 
                  ${action.bg}
                `}
              >
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
                  <action.icon size={26} className={action.iconColor} />
                </div>

                {/* Label */}
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  {action.label}
                </span>
              </Button>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default QuickActions;
