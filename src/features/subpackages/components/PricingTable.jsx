import { useState } from "react";

const PricingTable = ({ pricing, editable, onSave }) => {
  const [rows, setRows] = useState(pricing);

  if (!rows?.length) return null;

  const updateCell = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <>
      <table className="w-full border mt-4 text-center">
        <thead className="bg-gray-200">
          <tr>
            <th>Pax</th>
            <th>Cab</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {["noOfPax", "cab", "costPerPax"].map((field) => (
                <td key={field} className="border p-2">
                  {editable ? (
                    <input
                      value={row[field]}
                      onChange={(e) =>
                        updateCell(i, field, e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  ) : (
                    row[field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {editable && (
        <button
          onClick={() => onSave(rows)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Pricing
        </button>
      )}
    </>
  );
};

export default PricingTable;