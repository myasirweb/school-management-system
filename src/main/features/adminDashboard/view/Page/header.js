import React from "react";
import HeaderBar from "../../../../sharedComponents/header/view";
import { GraduationCap } from "lucide-react";

const AdminHeader = ({ onAddStudent, onBack, mode }) => {

  return (
   <HeaderBar
      title={mode === "create" ? "Add Student" : "Students"}
      icon={<GraduationCap size={18} />}
      showButton={false}
   
    />
  );
};

export default AdminHeader;
