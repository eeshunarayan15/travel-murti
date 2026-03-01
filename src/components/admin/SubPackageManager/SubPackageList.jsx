import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-hot-toast";

const SubPackageList = ({
  subPackages,
  packageId,
  canEdit,
  onEdit,
  onDelete,
  refresh,
}) => {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    if (!canEdit) return toast.error("Permission denied");

    const items = Array.from(subPackages);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    try {
      await axiosInstance.put("/subpackages/reorder", {
        packageId,
        subPackages: items.map((item, index) => ({
          id: item._id,
          order: index,
        })),
      });
      toast.success("Order updated");
      refresh();
    } catch {
      toast.error("Failed to reorder");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="subpackages">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {subPackages.map((pkg, index) => (
              <Draggable
                key={pkg._id}
                draggableId={pkg._id}
                index={index}
                isDragDisabled={!canEdit}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg border
                      ${
                        snapshot.isDragging
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200"
                      }`}
                  >
                    {canEdit && (
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab text-xl text-gray-400"
                      >
                        ☰
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">
                        {pkg.description}
                      </p>
                    </div>

                    {canEdit && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(pkg)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(pkg._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SubPackageList;