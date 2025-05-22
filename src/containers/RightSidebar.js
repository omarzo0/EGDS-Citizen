import { useEffect, useState } from "react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { useDispatch, useSelector } from "react-redux";
import { closeRightDrawer } from "../features/common/rightDrawerSlice";

function RightSidebar() {
  const { isOpen, header } = useSelector((state) => state.rightDrawer);
  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");

  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState({
    unread: [],
    read: [],
    unreadCount: 0,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isOpen && citizenId) {
        setLoading(true);
        try {
          console.log(`Fetching notifications for citizenId: ${citizenId}`);
          const response = await fetch(
            `http://localhost:5000/api/citizen/Notification-list/${citizenId}`
          );

          if (!response.ok) throw new Error("Network response was not ok");

          const data = await response.json();
          console.log("Fetched Notifications:", data);

          if (data.success) {
            setNotificationData(data.data);
          } else {
            throw new Error(data.message || "Failed to fetch notifications");
          }
        } catch (err) {
          setError(err.message);
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [isOpen, citizenId]);

  const close = (e) => {
    dispatch(closeRightDrawer(e));
  };

  // Combine unread and read notifications for display
  const allNotifications = [
    ...notificationData.unread,
    ...notificationData.read,
  ];

  return (
    <div
      className={
        "fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 "
          : " transition-all delay-500 opacity-0 translate-x-full ")
      }
    >
      <section
        className={
          "w-80 md:w-96 right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <div className="relative pb-5 flex flex-col h-full">
          <div className="navbar flex pl-4 pr-4 shadow-md">
            <button
              className="float-left btn btn-circle btn-outline btn-sm"
              onClick={() => close()}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <span className="ml-2 font-bold text-xl">{header}</span>
            {notificationData.unreadCount > 0 && (
              <span className="badge badge-primary ml-auto">
                {notificationData.unreadCount} new
              </span>
            )}
          </div>

          <div className="overflow-y-scroll p-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            ) : allNotifications.length > 0 ? (
              <div className="space-y-4">
                {/* Unread Notifications Section */}
                {notificationData.unread.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      New Notifications
                    </h3>
                    {notificationData.unread.map((notification) => (
                      <div
                        key={notification._id}
                        className="p-4 rounded-lg bg-blue-50 border border-blue-100"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Read Notifications Section */}
                {notificationData.read.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Earlier</h3>
                    {notificationData.read.map((notification) => (
                      <div
                        key={notification._id}
                        className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No notifications found
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => close()}
      ></section>
    </div>
  );
}

export default RightSidebar;
