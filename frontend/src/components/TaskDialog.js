import React, { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

export default function TaskDialog({ task, onClose, onSave, onDelete }) {
  const [formState, setFormState] = useState({
    id: task.id || "",
    namaTugas: task.namaTugas || "",
    catatan: task.catatan || "",
    tanggal: task.tanggal || "",
    pic: task.pic || "",
    status: task.status || "not yet",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formState);
    onClose();
  };

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-11/12 lg:w-2/3">
        <div className="flex flex-row justify-between mb-2">
          {!isEdit && (<div className="text-lg font-bold">{formState.namaTugas}</div>)}
          {isEdit && (<div className="text-lg font-bold">Edit Task</div>)}
          <Button
            className="bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-2 text-sm">
          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col w-2/3">
              {!isEdit && (
                <>
                  <div className="font-bold">Catatan</div>
                  <div className="">{formState.catatan}</div>
                </>
              )}
              {isEdit && (
                <>
                  <div className="font-bold">Nama Tugas</div>
                  <input
                    name="namaTugas"
                    className="p-2 border rounded"
                    placeholder="Nama Tugas"
                    value={formState.namaTugas}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div className="w-1/3 flex flex-row gap-2">
              <div className="flex flex-col w-1/2">
                <div className="font-bold">Rencana Selesai</div>
                {!isEdit && (<div className="">{formatDate(formState.tanggal)}</div>)}
                {isEdit && (
                  <input
                    type="date"
                    name="tanggal"
                    className="w-full p-2 border rounded"
                    value={formState.tanggal}
                    onChange={handleChange}
                  />
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <div className="font-bold">Status</div>
                {!isEdit && (
                  <>
                    {task.status == 'done' ? <Badge className={'text-xs bg-green-100 text-green-800'}>Done</Badge> : null}
                    {task.status == 'on progress' ? <Badge className={'text-xs bg-yellow-100 text-yellow-600'}>On Progress</Badge> : null}
                    {task.status == 'not yet' ? <Badge className={'text-xs bg-gray-100 text-gray-800'}>Not Yet</Badge> : null}
                  </>
                )}
                {isEdit && (
                  <select
                    name="status"
                    className="w-full p-2 border rounded"
                    value={formState.status}
                    onChange={handleChange}
                  >
                    <option value="not yet">Not Yet</option>
                    <option value="on progress">On Progress</option>
                    <option value="done">Done</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full text-sm mb-4">
          {isEdit && (
            <>
              <div className="font-bold">Catatan</div>
              <textarea
                name="catatan"
                className="p-2 border rounded"
                placeholder="Catatan"
                value={formState.catatan}
                onChange={handleChange}
              />
            </>
          )}
        </div>
        <div className="flex flex-col w-full text-sm mb-4">
          <div className="font-bold">Person in Charge</div>
          {!isEdit && (<div className="">{formState.pic}</div>)}
          {isEdit && (
            <input
              name="pic"
              className="p-2 border rounded"
              placeholder="Person in Charge"
              value={formState.pic}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="flex justify-end gap-2">
          {isEdit && (
            <>
              <Button
                className="bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
            </>
          )}
          {!isEdit && (
            <>
              <Button
                className="bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                className="bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}