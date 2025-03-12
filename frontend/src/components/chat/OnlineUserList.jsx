import React, { useState } from "react";
import Contact from "../chat/Contact";

const OnlineUsersList = ({
  onlinePeople = {},
  offlinePeople = {},
  selectedUserId,
  setSelectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter online users based on search term
  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId]?.username || "";
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Filter offline users based on search term
  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const user = offlinePeople[userId];
    if (!user) return false; // Prevent errors if user object is undefined
    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="w-[29%] py-3 border-r px-2 lg:px-4 border-gray-700">
      {/* Search Bar */}
      <div className="text-white flex items-center gap-2 p-1 px-2 lg:p-3 mt-1 mb-3 lg:mb-6 bg-primary w-[90%] mx-auto rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden sm:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* Users List */}
      <div className="max-h-[85vh] overflow-auto no-scrollbar">
        {/* Online Users */}
        {filteredOnlinePeople.map((userId) => {
          const { username = "Unknown User", avatarLink = "" } = onlinePeople[userId] || {};
          return (
            <Contact
              key={userId}
              userId={userId}
              username={username}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={true}
              avatarLink={avatarLink}
            />
          );
        })}

        {/* Offline Users */}
        {filteredOfflinePeople.map((userId) => {
          const user = offlinePeople[userId] || {};
          return (
            <Contact
              key={user._id || userId}
              userId={user._id || userId}
              username={`${user.firstName || "Unknown"} ${user.lastName || ""}`.trim()}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={false}
              avatarLink={user.avatarLink || ""}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OnlineUsersList;
