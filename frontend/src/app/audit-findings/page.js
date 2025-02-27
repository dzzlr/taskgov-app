"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import FindingCard from "@/components/FindingCard";
import FindingDialog from "@/components/FindingDialog";
import FindingCreateDialog from "@/components/FindingCreateDialog";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const [auditFindings, setAuditFindings] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentFinding, setCurrentFinding] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Redirect user jika belum login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Fetch data audit findings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/findings`);
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(a.batasAkhirKomitmen) - new Date(b.batasAkhirKomitmen));
        setAuditFindings(sortedData);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  // Fungsi untuk menyimpan audit finding baru
  const handlePost = useCallback(async (finding) => {
    try {
      const response = await fetch(`${API_BASE_URL}/findings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finding),
      });
      const newFinding = await response.json();
      setAuditFindings((prev) => [...prev, newFinding]);
      setShowCreateDialog(false);
    } catch (error) {
      console.error("Failed to save data", error);
    }
  }, [API_BASE_URL]);

  // Fungsi untuk mengupdate audit finding yang sudah ada
  const handleSave = useCallback(async (finding) => {
    try {
      await fetch(`${API_BASE_URL}/findings/${finding.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finding),
      });
      setAuditFindings((prev) =>
        prev.map((item) => (item.id === finding.id ? finding : item))
      );
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to update data", error);
    }
  }, [API_BASE_URL]);

  // Fungsi untuk menghapus audit finding
  const handleDelete = useCallback(async (id) => {
    try {
      await fetch(`${API_BASE_URL}/findings/${id}`, { method: "DELETE" });
      setAuditFindings((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete data", error);
    }
  }, [API_BASE_URL]);

  // Fungsi untuk menampilkan detail audit finding
  const handleShow = useCallback((id) => {
    const finding = auditFindings.find((item) => item.id === id);
    setCurrentFinding(finding);
    setShowDialog(true);
  }, [auditFindings]);

  // Render component hanya jika user sudah login
  if (!user) return null;

  return (
    <Layout title="Audit Findings">
      <div className="min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center pt-10 md:pt-12 lg:pt-14">
          <div className="flex flex-col gap-5 lg:gap-10 w-11/12 lg:w-5/6 mt-6 md:px-4 overflow-hidden sm:rounded-lg">
            <div className="justify-start text-black">
              <div className="mb-5 flex flex-row justify-between">
                <h1 className="text-lg md:text-2xl text-black font-extrabold">Audit Findings</h1>
                <button
                  className="flex flex-row gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={() => setShowCreateDialog(true)}
                >
                  <svg className="w-5 h-5 text-white self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <div>Add Finding</div>
                </button>
              </div>
              <div className="flex flex-col gap-4 pb-5">
                {auditFindings.map((finding) => (
                  <FindingCard key={finding.id} finding={finding} onShow={handleShow} />
                ))}
              </div>

              {showDialog && (
                <FindingDialog
                  finding={currentFinding}
                  onClose={() => setShowDialog(false)}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              )}

              {showCreateDialog && (
                <FindingCreateDialog
                  finding={currentFinding}
                  onClose={() => setShowCreateDialog(false)}
                  onSave={handlePost}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}