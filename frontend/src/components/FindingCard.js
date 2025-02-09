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
        <div className="text-xs md:text-sm mb-1">
          <strong>Kategori:</strong> {finding.kategoriAudit}
        </div>
        {finding.status == 'done' ? <Badge className={'text-xs bg-green-100 text-green-800'}>Done</Badge> : null}
        {finding.status == 'on progress' ? <Badge className={'text-xs bg-yellow-100 text-yellow-600'}>On Progress</Badge> : null}
        {finding.status == 'not yet' ? <Badge className={'text-xs bg-gray-100 text-gray-800'}>Not Yet</Badge> : null}
      </div>
      <div className="text-xs md:text-sm mb-1">
        <strong>Person in Charge:</strong> {finding.pic}
      </div>
    </div>
  );
};

export default FindingCard;
