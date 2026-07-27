import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import {
  createOffer,
  createAnswer,
  setRemoteAnswer,
  addIceCandidate,
  closePeerConnection,
} from "../webrtc/peer";

import MeetingHeader from "../components/MeetingHeader";
import VideoSection from "../components/VideoSection";
import ChatSection from "../components/ChatSection";

import useCamera from "../hooks/useCamera";
import useChat from "../hooks/useChat";

import toast from "react-hot-toast";

const Meeting = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const remoteSocketIdRef = useRef(null);
  const {
    localVideoRef,
    remoteVideoRef,
    localStreamRef,
    isMicOn,
    isCameraOn,
    isReady,
    handleToggleMic,
    handleToggleCamera,
  } = useCamera(remoteSocketIdRef);
  const { messages, message, setMessage, messagesEndRef, handleSendMessage } =
    useChat(meetingId);

  const handleLeaveMeeting = () => {
    // Stop camera and microphone
    localStreamRef.current?.getTracks().forEach((track) => track.stop());

    // Close the WebRTC connection
    closePeerConnection();

    // Disconnect Socket.IO
    socket.disconnect();

    navigate("/dashboard");
  };

  const handleCopyMeetingId = async () => {
    try {
      await navigator.clipboard.writeText(meetingId);
      toast.success("Meeting ID copied.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Wait until camera and peer connection are ready
    if (!isReady) return;

    // Connect only if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    // Join the meeting room
    socket.emit("join-meeting", meetingId);

    // Listen for new users
    socket.on("room-users", (users) => {
      setUsers(users);
    });

    // Existing user starts the WebRTC connection
    socket.on("user-joined", async (newUserId) => {
      console.log("New user joined:", newUserId);

      remoteSocketIdRef.current = newUserId;

      const offer = await createOffer();

      socket.emit("offer", {
        target: newUserId,
        offer,
      });
    });

    //Receive offer
    socket.on("offer", async ({ sender, offer }) => {
      console.log("Offer received");

      remoteSocketIdRef.current = sender;

      const answer = await createAnswer(offer);

      socket.emit("answer", {
        target: sender,
        answer,
      });
    });

    //Receive answer
    socket.on("answer", async ({ answer }) => {
      console.log("Answer received");

      await setRemoteAnswer(answer);
    });

    //Receive ICE Candidate
    socket.on("ice-candidate", async ({ candidate }) => {
      await addIceCandidate(candidate);
    });

    return () => {
      socket.off("room-users");
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [meetingId, isReady]);

  return (
    <div className="h-screen overflow-hidden bg-slate-100 p-4">
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        <MeetingHeader
          meetingId={meetingId}
          users={users}
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          handleCopyMeetingId={handleCopyMeetingId}
          handleToggleMic={handleToggleMic}
          handleToggleCamera={handleToggleCamera}
          handleLeaveMeeting={handleLeaveMeeting}
        />
        <div className="grid flex-1 gap-4 overflow-hidden lg:grid-cols-4">
          <VideoSection
            localVideoRef={localVideoRef}
            remoteVideoRef={remoteVideoRef}
          />
          {/* Chat Area */}
          <ChatSection
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Meeting;
