import React, { useState } from "react";
import Button from "./Button";

const FindingCreateDialog = ({ finding, onClose, onSave, onDelete }) => {
  const [formState, setFormState] = useState({
    id: "",
    kategoriAudit: "",
    namaTemuan: "",
    penyebab: "",
    rekomendasi: "",
    komitmenTindakLanjut: "",
    batasAkhirKomitmen: "",
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
            {formState.id ? "Edit Finding" : "Add Finding"}
          </h3>
          <Button
            className="bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4 text-sm">
          <div className="flex flex-row w-2/3 gap-4">
            <div className="flex flex-col w-full md:w-2/3">
              <div className="font-bold">Nama Temuan</div>
              <input
                name="namaTemuan"
                className="p-2 border rounded mb-4"
                placeholder="Nama Temuan"
                value={formState.namaTemuan}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <div className="font-bold">Kategori Audit</div>
              <input
                name="kategoriAudit"
                className="p-2 border rounded mb-4"
                placeholder="Kategori Audit"
                value={formState.kategoriAudit}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-row w-full md:w-1/3 gap-10">
            <div className="flex flex-col">
              <div className="font-bold">Tenggat Pemenuhan</div>
              <input
                type="date"
                name="batasAkhirKomitmen"
                className="w-full p-2 border rounded mb-4"
                value={formState.batasAkhirKomitmen}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold">Status</div>
              <select
                name="status"
                className="w-full p-2 border rounded mb-4"
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
        <div className="flex flex-col md:flex-row justify-between gap-2 text-sm">
          <div className="flex flex-col w-full md:w-1/3">
            <div className="font-bold">Penyebab</div>
            <textarea
              name="penyebab"
              className="w-full p-2 border rounded mb-4"
              placeholder="Penyebab"
              rows={4}
              value={formState.penyebab}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <div className="font-bold">Rekomendasi</div>
            <textarea
              name="rekomendasi"
              className="w-full p-2 border rounded mb-4"
              placeholder="Rekomendasi"
              rows={4}
              value={formState.rekomendasi}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <div className="font-bold">Komitmen Tindak Lanjut</div>
            <textarea
              name="komitmenTindakLanjut"
              className="w-full p-2 border rounded mb-4"
              placeholder="Komitmen Tindak Lanjut"
              rows={4}
              value={formState.komitmenTindakLanjut}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/3 text-sm">
          <div className="font-bold">Person in Charge</div>
          <input
            name="pic"
            className="p-2 border rounded mb-4"
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
  );
};

export default FindingCreateDialog;