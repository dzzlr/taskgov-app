import React, { useEffect } from "react";
import Badge from "./Badge";

const AuditCard = ({ finding, onShow }) => {
  useEffect(() => {
    const today = new Date();
    const deadline = new Date(finding.batasAkhirKomitmen);
    const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;

    if (deadline - today <= oneMonthInMillis && deadline - today > 0) {
      alert(`Batas akhir komitmen untuk "${finding.namaTemuan}" tersisa kurang dari satu bulan.`);
    }
  }, [finding.batasAkhirKomitmen, finding.namaTemuan]);

  return (
    <div
      className="border p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
      onClick={() => onShow(finding.id)}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="sm:w-2/3 w-full">
          <div className="mb-2 md:text-lg font-semibold">{finding.namaTemuan}</div>
          <p className="mb-1 text-sm"><strong>Kategori:</strong> {finding.kategoriAudit}</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid content-between">
            <div className="text-sm">Tenggat Pemenuhan:</div>
            <div className="text-medium font-semibold">{finding.batasAkhirKomitmen}</div>
          </div>
          <div>
            { finding.status == 'done' ? <Badge className={'text-xs md:text-base bg-green-100 text-green-800'}>Done</Badge> : null }
            { finding.status == 'on progress' ? <Badge className={'text-xs md:text-base bg-yellow-100 text-yellow-600'}>On Progress</Badge> : null }
            { finding.status == 'not yet' ? <Badge className={'text-xs md:text-base bg-gray-100 text-gray-800'}>Not Yet</Badge> : null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditCard;