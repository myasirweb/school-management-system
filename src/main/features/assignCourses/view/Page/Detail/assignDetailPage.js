import React from "react";
import { Button, Breadcrumb, Progress, Divider } from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mock = {
  id: "ASG001",
  courseName: "Mathematics",
  studentName: "Alice Brown",
  assignedDate: "2025-08-01",
  dueDate: "2025-09-01",
  status: "In Progress",
  progress: 45,
  notes: "Complete chapter 1-3 and submit assignment file.",
};

const AssignDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button type="text" icon={<ArrowLeft />} onClick={() => navigate(-1)}>Back</Button>

      <Breadcrumb items={[{ title: 'Home' }, { title: 'Assign Courses', onClick: () => navigate('/assign/courses') }, { title: mock.id }]} />

      <div className="bg-white rounded-lg border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">{mock.courseName}</h2>
            <div className="text-sm text-gray-600">Assigned to {mock.studentName}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{mock.status}</div>
            <div className="text-sm text-gray-500">Due: {mock.dueDate}</div>
          </div>
        </div>

        <Divider />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-gray-700">{mock.notes}</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Progress</div>
              <div className="text-lg font-bold">{mock.progress}%</div>
              <Progress percent={mock.progress} />
            </div>

            <div>
              <div className="text-xs text-gray-500">Assigned Date</div>
              <div className="font-semibold">{mock.assignedDate}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Due Date</div>
              <div className="font-semibold">{mock.dueDate}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => navigate(-1)}>Close</Button>
          <Button type="primary">Mark Completed</Button>
        </div>
      </div>
    </div>
  );
};

export default AssignDetailPage;
