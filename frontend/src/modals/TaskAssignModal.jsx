import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const TaskAssignModal = ({ isOpen, onClose, employee }) => {
  const { getUserInfo } = useUserContext();
  const userInfo = getUserInfo();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sendButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }
    setIsSending(true);
    sendButtonRef.current.disabled = true;
    try {
      const response = await axios.post("/assign-task", {
        message,
        subject,
        employee,
        user: userInfo.name,
      });
      console.log(response, "response");

      const { mail, task } = response.data;

      if (mail.statusCode === 200) {
        toast.success(`Email sent successfully to ${employee.email}`);
      } else {
        toast.error(`Error sending email to ${employee.email}`);
      }

      if (task.statusCode === 201) {
        toast.success("Task added successfully");
      } else {
        toast.error("Error adding task");
      }

      onClose();
    } catch (error) {
      console.log(error, "error");
      toast.error(`mail sending failed to ${employee.email}`);
      onClose();
    } finally {
      setMessage("");
      setSubject("");
      setIsSending(false);
      sendButtonRef.current.disabled = false;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <div className="relative bg-gray-800 rounded-lg w-96 p-6 mx-auto flex flex-col space-y-4">
          <div
            className="absolute right-0 top-0 p-2 cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Assign Task</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 h-32 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              ref={sendButtonRef}
              onClick={handleSubmit}
              disabled={isSending}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${
                isSending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignModal;
