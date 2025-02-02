"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import AuditDialog from "@/components/AuditDialog";
import AuditCreateUpdateDialog from "@/components/AuditCreateUpdateDialog";
import AuditCard from "@/components/AuditCard";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const [auditFindings, setAuditFindings] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentFinding, setCurrentFinding] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  // Fungsi untuk edit audit finding
  const handleEdit = useCallback((id) => {
    const finding = auditFindings.find((item) => item.id === id);
    setCurrentFinding(finding);
    setShowDialog(true);
  }, [auditFindings]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Render component hanya jika user sudah login
  if (!user) return null;

  return (
    <Layout title="Home">
      <div className="min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center pt-10 md:pt-12 lg:pt-14">
          <div className="flex flex-col gap-5 lg:gap-10 w-11/12 lg:w-4/6 mt-6 md:px-4 overflow-hidden sm:rounded-lg">
            <div className={`justify-start ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
              <div className="mb-5 flex flex-row justify-between">
                <h1 className="text-lg md:text-2xl text-black font-extrabold">Audit Findings</h1>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={() => setShowCreateDialog(true)}
                >
                  Add Finding
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {auditFindings.map((finding) => (
                  <AuditCard key={finding.id} finding={finding} onShow={handleShow} />
                ))}
              </div>

              {showDialog && (
                <AuditDialog
                  finding={currentFinding}
                  onClose={() => setShowDialog(false)}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              )}

              {showCreateDialog && (
                <AuditCreateUpdateDialog
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