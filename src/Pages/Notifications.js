import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNotificationsInitiate } from "../redux/actions/notifications/getAllNotificationsAction";
import Loader from "../Components/loader";

const Notifications = () => {
  const dispatch = useDispatch();
  const [categorizedNotifications, setCategorizedNotifications] = useState({
    today: [],
    yesterday: [],
    older: [],
  });

  const notificationsState = useSelector((state) => state.notificationsData);
  const { notifications, loading, error } = notificationsState;

  const categorizeNotifications = (notificationsList) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (dateStr) => new Date(dateStr).toDateString();

    const todayFormatted = today.toDateString();
    const yesterdayFormatted = yesterday.toDateString();

    const categorized = {
      today: notificationsList.filter((n) => formatDate(n.date) === todayFormatted),
      yesterday: notificationsList.filter((n) => formatDate(n.date) === yesterdayFormatted),
      older: notificationsList.filter(
        (n) =>
          formatDate(n.date) !== todayFormatted &&
          formatDate(n.date) !== yesterdayFormatted
      ),
    };

    console.log(" Categorized Notifications:", categorized);
    return categorized;
  };

  useEffect(() => {
    dispatch(GetAllNotificationsInitiate());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
      console.log("Raw Notifications:", notifications);
      setCategorizedNotifications(categorizeNotifications(notifications));
    }
  }, [notifications]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-start">Notifications</h2>

      <div className="max-h-[73vh] overflow-y-auto space-y-5 p-2 ">
        {["Today", "Yesterday", "Older"].map((label) => {
          const data = categorizedNotifications[label.toLowerCase()];
          console.log(` ${label} Notifications:`, data);

          return (
            data.length > 0 && (
              <div key={label}>
                <h3 className="text-xl font-bold text-red-700 border-b-2 border-gray-300 pb-1">{label}</h3>
                {data.map((notification) => (
                  <div
                    key={notification._id}
                    className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-900 hover:shadow-xl transition-all mt-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-700 mt-2 text-lg">{notification.description}</p>
                    <div className="flex justify-between text-gray-500 text-sm mt-4">
                      <span className="font-medium">{notification.date}</span>
                      <span className="font-medium">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
