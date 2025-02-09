import React, { useState } from "react";
import Button from "./Button";

export default function TaskCreateDialog({ onClose, onSave }) {
  const [formState, setFormState] = useState({
    id: "",
    namaTugas: "",
    catatan: "",
    tanggal: "",
    status: "not yet",
    pic: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formState);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-11/12 lg:w-2/3">
        <div className="flex flex-row justify-between mb-2">
          <h3 className="text-lg font-bold mb-4">
            {formState.id ? "Edit Task" : "Add Task"}
          </h3>
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
              <div className="font-bold">Nama Tugas</div>
              <input
                name="namaTugas"
                className="p-2 border rounded"
                placeholder="Nama Tugas"
                value={formState.namaTugas}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3 flex flex-row gap-2">
              <div className="flex flex-col w-1/2">
                <div className="font-bold">Rencana Selesai</div>
                <input
                  type="date"
                  name="tanggal"
                  className="w-full p-2 border rounded"
                  value={formState.tanggal}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <div className="font-bold">Status</div>
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
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full text-sm mb-4">
          <div className="font-bold">Catatan</div>
          <textarea
            name="catatan"
            className="p-2 border rounded"
            placeholder="Catatan"
            value={formState.catatan}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full text-sm mb-4">
          <div className="font-bold">Person in Charge</div>
          <input
            name="pic"
            className="p-2 border rounded"
            placeholder="Person in Charge"
            value={formState.pic}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            className="bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}