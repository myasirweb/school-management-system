import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import {
  TableContainer,
  ContBody,
} from "../../../../sharedComponents/MainFlexContainer";
import {
  setPolicies,
  setActivePolicy,
  setActiveCategory,
  setSearchQuery,
  addPolicy,
} from "../../store/schoolPolicySlice";
import {
  seedPolicies,
  getPoliciesFromStorage,
  savePoliciesToStorage,
} from "../../utils/schoolPolicyDummyData";
import SchoolPolicyHeader from "./header";
import PolicyList from "./PolicyList";
import PolicyDetail from "./PolicyDetail";

const TAG_COLOR_MAP = {
  HR: "rgb(82,107,177)",
  Academic: "rgb(100,196,178)",
  Admin: "rgb(69,198,238)",
  Finance: "rgb(180,140,0)",
  Safety: "rgb(232,19,123)",
};

const TAG_LABEL_MAP = {
  HR: "HR",
  Academic: "ACE",
  Admin: "ADM",
  Finance: "FIN",
  Safety: "SAF",
};

const SchoolPolicyPage = () => {
  const dispatch = useDispatch();
  const { policies, activePolicyId, activeCategory, searchQuery } =
    useSelector((s) => s.schoolPolicy);

  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  /* Seed and load from localStorage on mount */
  useEffect(() => {
    seedPolicies();
    dispatch(setPolicies(getPoliciesFromStorage()));
  }, [dispatch]);

  const activePolicy = policies.find((p) => p.id === activePolicyId) || null;

  const filteredPolicies = policies.filter((p) => {
    const matchCat =
      activeCategory === "all" ||
      p.category.toLowerCase() === activeCategory;
    const matchSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddPolicy = (values) => {
    const newPolicy = {
      id: `POL${Date.now()}`,
      title: values.title,
      category: values.category,
      tag: TAG_LABEL_MAP[values.category] || values.category.slice(0, 3).toUpperCase(),
      tagColor: TAG_COLOR_MAP[values.category] || "rgb(82,107,177)",
      description: values.description
        ? values.description.split("\n\n").filter(Boolean)
        : [values.description],
      effectiveDate: values.effectiveDate.format("DD MMM YYYY"),
      lastUpdated: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdBy: "Administrator",
    };
    const updated = [newPolicy, ...policies];
    savePoliciesToStorage(updated);
    dispatch(addPolicy(newPolicy));
    form.resetFields();
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <TableContainer>
      <SchoolPolicyHeader onAddPolicy={() => setModalOpen(true)} />

      <ContBody style={{ overflowY: "hidden", paddingBottom: 0 }}>
        <div className="flex h-full overflow-hidden">
          <PolicyList
            policies={filteredPolicies}
            activePolicyId={activePolicyId}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onSelectPolicy={(id) => dispatch(setActivePolicy(id))}
            onCategoryChange={(cat) => dispatch(setActiveCategory(cat))}
            onSearch={(q) => dispatch(setSearchQuery(q))}
          />
          <PolicyDetail policy={activePolicy} />
        </div>
      </ContBody>

      {/* Add Policy Modal */}
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={560}
        destroyOnClose
        title={
          <span
            className="text-base font-bold text-gray-800"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Add New Policy
          </span>
        }
        styles={{ body: { fontFamily: "Montserrat, sans-serif", paddingTop: 8 } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddPolicy}
          requiredMark={false}
        >
          <Form.Item
            label="Policy Title"
            name="title"
            rules={[{ required: true, message: "Please enter a policy title" }]}
          >
            <Input placeholder="e.g. Code of Conduct" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select category">
              {["HR", "Academic", "Admin", "Finance", "Safety"].map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Effective Date"
            name="effectiveDate"
            rules={[{ required: true, message: "Please select an effective date" }]}
          >
            <DatePicker className="w-full" format="DD MMM YYYY" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea
              autoSize={{ minRows: 6 }}
              placeholder="Enter policy description. Separate paragraphs with a blank line."
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-3">
              <Button onClick={closeModal}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "rgb(82,107,177)",
                  borderColor: "rgb(82,107,177)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Add Policy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </TableContainer>
  );
};

export default SchoolPolicyPage;
