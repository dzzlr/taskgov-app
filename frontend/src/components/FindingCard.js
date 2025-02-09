import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Badge from "./Badge";

const FindingCard = ({ finding, onShow }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const today = new Date();
    const deadline = new Date(finding.batasAkhirKomitmen);
    const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;

    if (deadline - today <= oneMonthInMillis && deadline - today > 0) {
      setShowAlert(true);
    }
  }, [finding.batasAkhirKomitmen, finding.namaTemuan]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div
      className="border p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
      onClick={() => onShow(finding.id)}
    >

      {showAlert && (
        <Alert onClick={() => setShowAlert(false)} />
      )}

      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-4/6 font-semibold text-sm md:text-base mb-2">{finding.namaTemuan}</div>
        <div className="font-semibold text-xs md:text-base mb-2">{formatDate(finding.batasAkhirKomitmen)}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-row gap-1 mb-1 text-xs md:text-sm text-slate-600">
          <svg className="w-4 h-4 mt-[1px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clipRule="evenodd" />
          </svg>
          <div>{finding.kategoriAudit}</div>
        </div>
        {finding.status == 'done' ? <Badge className={'text-xs bg-green-100 text-green-800'}>Done</Badge> : null}
        {finding.status == 'on progress' ? <Badge className={'text-xs bg-yellow-100 text-yellow-600'}>On Progress</Badge> : null}
        {finding.status == 'not yet' ? <Badge className={'text-xs bg-gray-100 text-gray-800'}>Not Yet</Badge> : null}
      </div>
      <div className="flex flex-row gap-1 mb-1 text-xs md:text-sm text-slate-600">
        <svg className="w-4 h-4 mt-[1px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
        </svg>
        <div>{finding.pic}</div>
      </div>
    </div>
  );
};

export default FindingCard;
