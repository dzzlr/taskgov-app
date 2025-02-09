"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Badge from "@/components/Badge";
import TaskCard from "@/components/TaskCard";
import TaskCreateDialog from "@/components/TaskCreateDialog";
import TaskDialog from "@/components/TaskDialog";

export default function Home(props) {
  const { user } = useAuth();
  const router = useRouter();

  const [tasks, setTask] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Redirect user jika belum login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
        setTask(sortedData);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  // Fungsi untuk menyimpan audit finding baru
  const handlePost = useCallback(async (task) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTask((prev) => [...prev, newTask]);
      setShowCreateDialog(false);
    } catch (error) {
      console.error("Failed to save data", error);
    }
  }, [API_BASE_URL]);

  // Fungsi untuk mengupdate audit finding yang sudah ada
  const handleSave = useCallback(async (task) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      setTask((prev) =>
        prev.map((item) => (item.id === task.id ? task : item))
      );
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to update data", error);
    }
  }, [API_BASE_URL]);

  // Fungsi untuk menghapus audit finding
  const handleDelete = useCallback(async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, { method: "DELETE" });
      setTask((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete data", error);
    }
  }, [API_BASE_URL]);

  // Fungsi untuk menampilkan detail audit finding
  const handleShow = useCallback((id) => {
    const task = tasks.find((item) => item.id === id);
    setCurrentTask(task);
    setShowDialog(true);
  }, [tasks]);

  // Render component hanya jika user sudah login
  if (!user) return null;

  return (
    <Layout title="Home">
      <div className="min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center pt-10 md:pt-12 lg:pt-14">
          <div className="flex flex-col gap-3 w-11/12 lg:w-5/6 mt-6 md:px-4 overflow-hidden sm:rounded-lg">
            <div className="justify-start text-black">
              <div className="mb-5 flex flex-row justify-between">
                <h1 className="text-lg md:text-2xl text-black font-extrabold">IT Governance Tasks</h1>
                <button
                  className="flex flex-row gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <svg className="w-5 h-5 text-white self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <div>Add Task</div>
                </button>
              </div>
              <div className="flex flex-row gap-3 pb-4">
                <div className="w-1/3 p-3 border border-slate-100 rounded-md bg-slate-100">
                  <div className="font-semibold">Not Yet</div>
                  <div className="mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
                    {tasks
                      .filter((task) => task.status === 'not yet')  // Filter berdasarkan status
                      .map((task) => (
                        <TaskCard key={task.id} task={task} onShow={handleShow} />
                      ))}
                  </div>
                </div>
                <div className="w-1/3 p-3 border border-slate-100 rounded-md bg-slate-50">
                  <Badge className={'text-sm bg-yellow-100 text-yellow-600'}>On Progress</Badge>
                  <div className="mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
                    {tasks
                      .filter((task) => task.status === 'on progress')  // Filter berdasarkan status
                      .map((task) => (
                        <TaskCard key={task.id} task={task} onShow={handleShow} />
                      ))}
                  </div>
                </div>
                <div className="w-1/3 p-3 border border-slate-100 rounded-md bg-slate-50">
                  <Badge className={'text-sm bg-green-100 text-green-800'}>Done</Badge>
                  <div className="mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
                    {tasks
                      .filter((task) => task.status === 'done')  // Filter berdasarkan status
                      .map((task) => (
                        <TaskCard key={task.id} task={task} onShow={handleShow} />
                      ))}
                  </div>
                </div>
              </div>

              {showDialog && (
                <TaskDialog
                  task={currentTask}
                  onClose={() => setShowDialog(false)}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              )}

              {showCreateDialog && (
                <TaskCreateDialog
                  onClose={() => setShowCreateDialog(false)}
                  onSave={handlePost}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
