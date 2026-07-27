import { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const [meetingId, setMeetingId] = useState("");

  const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    try {
      const token = localStorage.getItem("callixa_token");

      const response = await api.post(
        "/meetings/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate(`/meeting/${response.data.meetingId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create meeting.");
    }
  };

  const handleJoinMeeting = async () => {
    if (!meetingId.trim()) {
      return toast.error("Please enter a meeting ID.");
    }

    try {
      const token = localStorage.getItem("callixa_token");

      await api.get(`/meetings/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/meeting/${meetingId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Meeting not found.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("callixa_token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Welcome to Callixa
        </h1>

        <button
          onClick={handleCreateMeeting}
          className="mb-6 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700"
        >
          Create Meeting
        </button>

        <input
          type="text"
          placeholder="Enter Meeting ID"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleJoinMeeting}
          className="mb-4 w-full rounded-lg bg-slate-800 py-3 text-white transition hover:bg-slate-900"
        >
          Join Meeting
        </button>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg border border-red-500 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
