import FormCard from "../../UI/FormCard";

const FormsGrid = ({ forms, onCardClick }) => {
  if (!forms.length) {
    return (
      <div
        className="flex items-center justify-center py-20 text-gray-400 text-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        No form records found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-6 py-4 w-full">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default FormsGrid;
