import { useState } from "react";
import DOMPurify from "dompurify";

const SubPackageTabs = ({ subPackage, editable, onSave }) => {
  const [active, setActive] = useState("introduction");
  const [form, setForm] = useState({
    introduction: subPackage.introduction,
    tourPlan: subPackage.tourPlan,
  });

  const handleSaveClick = () => {
    onSave(form);
  };

  const renderContent = () => {
    if (editable) {
      return (
        <textarea
          value={form[active]}
          onChange={(e) =>
            setForm({ ...form, [active]: e.target.value })
          }
          className="w-full min-h-[200px] border p-2 rounded"
        />
      );
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(subPackage[active] || ""),
        }}
      />
    );
  };

  return (
    <>
      <div className="flex gap-1 bg-blue-500 rounded mb-3">
        {["introduction", "tourPlan"].map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex-1 py-2 text-xs md:text-sm rounded ${
              active === key
                ? "bg-white text-blue-600"
                : "text-white"
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {renderContent()}

      {editable && (
        <button
          onClick={handleSaveClick}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      )}
    </>
  );
};

export default SubPackageTabs;