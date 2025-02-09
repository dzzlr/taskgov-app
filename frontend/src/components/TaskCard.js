export default function TaskCard({ task, onShow }) {

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
      className="p-2 bg-white rounded-md text-black cursor-pointer hover:bg-slate-50 transition duration-300 ease-in-out"
      onClick={() => onShow(task.id)}
    >
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold">{task.namaTugas}</div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <svg className="w-4 h-4 text-slate-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
            </svg>
            <div className="flex flex-row gap-1">
              <svg className="w-4 h-4 text-slate-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div className="text-xs text-slate-600">{formatDate(task.tanggal)}</div>
            </div>
          </div>
          <div className="flex flex-row">
            <svg className="w-4 h-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
            </svg>
            <div className="text-xs text-slate-600">{task.pic}</div>
          </div>
        </div>
      </div>
    </div>
  )
}