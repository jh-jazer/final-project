// src/Notifications.jsx

import React from "react";
import '../StudentpagesCSS/Notifications.css'; // Importing CSS for styling

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "Announcement",
      title: "New Semester Starts Soon!",
      message:
        "The new semester begins on January 15th. Make sure to complete your course registration before the deadline.",
      date: "2024-11-21",
    },
    {
      id: 2,
      type: "Due Date",
      title: "Assignment 1 Due Tomorrow",
      message:
        "Your first assignment for the Web Development course is due tomorrow. Please submit it by 11:59 PM.",
      date: "2024-11-22",
    },
    {
      id: 3,
      type: "Message",
      title: "Reminder from Professor Smith",
      message:
        "Please review the chapter on React components before tomorrow's class. Reach out if you have any questions.",
      date: "2024-11-21",
    },
    {
      id: 4,
      type: "Update",
      title: "System Maintenance Tonight",
      message:
        "The campus systems will undergo maintenance from 11:00 PM to 2:00 AM. Expect brief interruptions during that time.",
      date: "2024-11-21",
    },
    {
      id: 5,
      type: "Announcement",
      title: "General Assembly",
      message:
        "General Assemby will be held on November 21st. This is your moment to connect with fellow 𝗕𝗦𝗖𝗦 𝘀𝘁𝘂𝗱𝗲𝗻𝘁𝘀, engage in inspiring activities, and discover what’s ahead for our community.",
      date: "2024-11-19",
    },
  ];

  return (
    <div className="notifications-container">
      <h1>Student Notifications</h1>
      <div className="notifications-list">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-card">
            <div className={`notification-type ${notif.type.toLowerCase()}`}>
              <strong>{notif.type}</strong>
            </div>
            <h3>{notif.title}</h3>
            <p>{notif.message}</p>
            <small>{notif.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
