import React, { useState } from "react";
import Button from "./Button";

const AuditCreateUpdateDialog = ({ finding, onClose, onSave, onDelete }) => {
  const [formState, setFormState] = useState({
    // id: finding.id || "",
    // kategoriAudit: finding.kategoriAudit || "",
    // namaTemuan: finding.namaTemuan || "",
    // penyebab: finding.penyebab || "",
    // rekomendasi: finding.rekomendasi || "",
    // komitmenTindakLanjut: finding.komitmenTindakLanjut || "",
    // batasAkhirKomitmen: finding.batasAkhirKomitmen || "",
    // status: finding.status || "not yet",
    id: "",
    kategoriAudit: "",
    namaTemuan: "",
    penyebab: "",
    rekomendasi: "",
    komitmenTindakLanjut: "",
    batasAkhirKomitmen: "",
    status: "not yet",
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

    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    //   <div className="bg-white rounded p-6 w-1/2">
    //     <h3 className="text-lg font-bold mb-4">
    //       {formState.id ? "Edit Finding" : "Add Finding"}
    //     </h3>
    //     <div className="flex flex-row justify-between gap-4">
    //       <div className="flex flex-col gap-2 w-full">
    //         <input
    //           name="kategoriAudit"
    //           className="w-full p-2 border rounded mb-4"
    //           placeholder="Kategori Audit"
    //           value={formState.kategoriAudit}
    //           onChange={handleChange}
    //         />
    //         <input
    //           name="namaTemuan"
    //           className="w-full p-2 border rounded mb-4"
    //           placeholder="Nama Temuan"
    //           value={formState.namaTemuan}
    //           onChange={handleChange}
    //         />
    //         <textarea
    //           name="penyebab"
    //           className="w-full p-2 border rounded mb-4"
    //           placeholder="Penyebab"
    //           value={formState.penyebab}
    //           onChange={handleChange}
    //         />
    //         <textarea
    //           name="rekomendasi"
    //           className="w-full p-2 border rounded mb-4"
    //           placeholder="Rekomendasi"
    //           value={formState.rekomendasi}
    //           onChange={handleChange}
    //         />
    //         <textarea
    //           name="komitmenTindakLanjut"
    //           className="w-full p-2 border rounded mb-4"
    //           placeholder="Komitmen Tindak Lanjut"
    //           value={formState.komitmenTindakLanjut}
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div className="flex flex-col gap-2 w-full">
    //         <input
    //           type="date"
    //           name="batasAkhirKomitmen"
    //           className="w-full p-2 border rounded mb-4"
    //           value={formState.batasAkhirKomitmen}
    //           onChange={handleChange}
    //         />
    //         <select
    //           name="status"
    //           className="w-full p-2 border rounded mb-4"
    //           value={formState.status}
    //           onChange={handleChange}
    //         >
    //           <option value="not yet">Not Yet</option>
    //           <option value="on progress">On Progress</option>
    //           <option value="done">Done</option>
    //         </select>
    //       </div>
    //     </div>
    //     <div className="flex justify-end gap-2">
    //       <Button
    //         className="bg-blue-500 text-white rounded hover:bg-blue-600"
    //         onClick={handleSave}
    //       >
    //         Save
    //       </Button>
    //       <Button
    //         className="bg-red-500 text-white rounded hover:bg-red-600"
    //         onClick={handleDelete}
    //       >
    //         Delete
    //       </Button>
    //       <Button
    //         className="bg-gray-500 text-white rounded hover:bg-gray-600"
    //         onClick={onClose}
    //       >
    //         Cancel
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AuditCreateUpdateDialog;