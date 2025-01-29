import React, { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

const AuditDialog = ({ finding, onClose, onSave, onDelete }) => {
  const [formState, setFormState] = useState({
    id: finding.id || "",
    kategoriAudit: finding.kategoriAudit || "",
    namaTemuan: finding.namaTemuan || "",
    penyebab: finding.penyebab || "",
    rekomendasi: finding.rekomendasi || "",
    komitmenTindakLanjut: finding.komitmenTindakLanjut || "",
    batasAkhirKomitmen: finding.batasAkhirKomitmen || "",
    status: finding.status || "not yet",
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
    onDelete(finding.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-11/12 lg:w-2/3">
        <div className="flex flex-row justify-between mb-2">
          {!isEdit && (<div className="text-lg font-bold">{formState.kategoriAudit}</div>)}
          {isEdit && (<div className="text-lg font-bold">Edit Audit Finding</div>)}
          <Button
            className="bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4 text-sm">
          <div className="flex flex-row gap-2 md:w-2/3">
            <div className="flex flex-col w-full">
              <div className="font-bold">Nama Temuan</div>
              {!isEdit && (<div className="">{formState.namaTemuan}</div>)}
              {isEdit && (
                <input
                  name="namaTemuan"
                  className="p-2 border rounded mb-4"
                  placeholder="Nama Temuan"
                  value={formState.namaTemuan}
                  onChange={handleChange}
                />
              )}
            </div>
            {isEdit && (
              <div className="flex flex-col">
                <div className="font-bold">Kategori Audit</div>
                <input
                  name="kategoriAudit"
                  className="p-2 border rounded mb-4"
                  placeholder="Kategori Audit"
                  value={formState.kategoriAudit}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row w-full md:w-1/3 gap-10 md:gap-6">
            <div className="flex flex-col">
              <div className="font-bold">Tenggat Pemenuhan</div>
              {!isEdit && (<div className="">{formState.batasAkhirKomitmen}</div>)}
              {isEdit && (
                <input
                  type="date"
                  name="batasAkhirKomitmen"
                  className="w-full p-2 border rounded mb-4"
                  value={formState.batasAkhirKomitmen}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="flex flex-col">
              <div className="font-bold">Status</div>
              {!isEdit && (
                <>
                  {finding.status == 'done' ? <Badge className={'text-xs bg-green-100 text-green-800'}>Done</Badge> : null}
                  {finding.status == 'on progress' ? <Badge className={'text-xs bg-yellow-100 text-yellow-600'}>On Progress</Badge> : null}
                  {finding.status == 'not yet' ? <Badge className={'text-xs bg-gray-100 text-gray-800'}>Not Yet</Badge> : null}
                </>
              )}
              {isEdit && (
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
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 text-sm">
          <div className="flex flex-col w-full md:w-1/3">
            <div className="font-bold">Penyebab</div>
            {!isEdit && (<div className="">{formState.penyebab}</div>)}
            {isEdit && (
              <textarea
                name="penyebab"
                className="w-full p-2 border rounded mb-4"
                placeholder="Penyebab"
                rows={4}
                value={formState.penyebab}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <div className="font-bold">Rekomendasi</div>
            {!isEdit && (<div className="">{formState.rekomendasi}</div>)}
            {isEdit && (
              <textarea
                name="rekomendasi"
                className="w-full p-2 border rounded mb-4"
                placeholder="Rekomendasi"
                rows={4}
                value={formState.rekomendasi}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <div className="font-bold">Komitmen Tindak Lanjut</div>
            {!isEdit && (<div className="mb-4">{formState.komitmenTindakLanjut}</div>)}
            {isEdit && (
              <textarea
                name="komitmenTindakLanjut"
                className="w-full p-2 border rounded mb-4"
                placeholder="Komitmen Tindak Lanjut"
                rows={4}
                value={formState.komitmenTindakLanjut}
                onChange={handleChange}
              />
            )}
          </div>
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
  );
};

export default AuditDialog;