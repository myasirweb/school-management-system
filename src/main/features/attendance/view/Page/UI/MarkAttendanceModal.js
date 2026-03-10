import { useState, useEffect } from "react";
import {
  Modal, Form, DatePicker, Select, Button, Avatar, Radio,
} from "antd";

const { Option } = Select;

const MarkAttendanceModal = ({ visible, onClose, onSubmit, students, classes }) => {
  const [form] = Form.useForm();
  const [selectedClass, setSelectedClass] = useState("all");
  const [attendanceMap, setAttendanceMap] = useState({});

  const filteredStudents =
    selectedClass === "all"
      ? students
      : students.filter((s) => s.className === selectedClass);

  /* Initialise every visible student as "present" */
  useEffect(() => {
    const map = {};
    filteredStudents.forEach((s) => { map[s.id] = "present"; });
    setAttendanceMap(map);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass, students]);

  const handleMarkAllPresent = () => {
    const map = {};
    filteredStudents.forEach((s) => { map[s.id] = "present"; });
    setAttendanceMap(map);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const records = filteredStudents.map((s) => ({
        studentId: s.id,
        status: attendanceMap[s.id] || "present",
      }));
      onSubmit({ date: values.date.format("YYYY-MM-DD"), records });
      form.resetFields();
      setSelectedClass("all");
      onClose();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedClass("all");
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={640}
      destroyOnClose
      title={
        <span
          className="text-base font-bold text-gray-800"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Mark Attendance
        </span>
      }
      styles={{ body: { fontFamily: "Montserrat, sans-serif" } }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="flex gap-3">
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Select a date" }]}
            className="flex-1"
          >
            <DatePicker className="w-full" format="DD MMM YYYY" />
          </Form.Item>
          <Form.Item name="class" label="Class" className="flex-1">
            <Select
              placeholder="All Classes"
              value={selectedClass}
              onChange={(v) => { setSelectedClass(v); form.setFieldValue("class", v); }}
            >
              <Option value="all">All Classes</Option>
              {classes.map((c) => (
                <Option key={c} value={c}>{c}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {filteredStudents.length} Student{filteredStudents.length !== 1 ? "s" : ""}
          </span>
          <Button
            size="small"
            onClick={handleMarkAllPresent}
            style={{
              backgroundColor: "rgb(100,196,178)",
              color: "#fff",
              border: "none",
              fontFamily: "Montserrat, sans-serif",
              fontSize: 11,
            }}
          >
            Mark All Present
          </Button>
        </div>

        {/* Student list */}
        <div
          className="max-h-64 overflow-y-auto no-scrollbar border border-gray-100 rounded-xl"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-50 last:border-b-0"
            >
              <Avatar src={student.avatar} size={30} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">{student.name}</div>
                <div className="text-xs text-gray-400">{student.className}</div>
              </div>
              <Radio.Group
                value={attendanceMap[student.id] || "present"}
                onChange={(e) => handleStatusChange(student.id, e.target.value)}
                size="small"
              >
                <Radio.Button
                  value="present"
                  style={{ fontSize: 10, color: attendanceMap[student.id] === "present" ? "#fff" : undefined, backgroundColor: attendanceMap[student.id] === "present" ? "rgb(100,196,178)" : undefined }}
                >
                  P
                </Radio.Button>
                <Radio.Button
                  value="absent"
                  style={{ fontSize: 10, color: attendanceMap[student.id] === "absent" ? "#fff" : undefined, backgroundColor: attendanceMap[student.id] === "absent" ? "rgb(232,19,123)" : undefined }}
                >
                  A
                </Radio.Button>
                <Radio.Button
                  value="late"
                  style={{ fontSize: 10, color: attendanceMap[student.id] === "late" ? "#fff" : undefined, backgroundColor: attendanceMap[student.id] === "late" ? "rgb(247,212,71)" : undefined }}
                >
                  L
                </Radio.Button>
                <Radio.Button
                  value="leave"
                  style={{ fontSize: 10, color: attendanceMap[student.id] === "leave" ? "#fff" : undefined, backgroundColor: attendanceMap[student.id] === "leave" ? "rgb(69,198,238)" : undefined }}
                >
                  V
                </Radio.Button>
              </Radio.Group>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={handleCancel} style={{ fontFamily: "Montserrat, sans-serif" }}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "rgb(82,107,177)",
              borderColor: "rgb(82,107,177)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Save Attendance
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default MarkAttendanceModal;
