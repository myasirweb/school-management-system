import { Routes, Route } from "react-router-dom";
import FormsPage from "./Page";
import CreateForm from "./Page/CreateForm";

const FormsIndex = () => (
  <Routes>
    <Route index element={<FormsPage />} />
    <Route path="create" element={<CreateForm />} />
  </Routes>
);

export default FormsIndex;
