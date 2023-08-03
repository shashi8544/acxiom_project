import React, { useState, useEffect } from 'react';
import './EventPage.css';
import Navbar from '../../../components/Navbar/Navbar';
import { getHomePageBasketballAttribute } from '../../../../src/action/homePagesGamesAttributeAction';
import { useParams, Link } from 'react-router-dom';

const EventPage = () => {
  const { documentID } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetch data using the documentID from the backend
    function fetchDataFromBackend() {
      getHomePageBasketballAttribute(documentID)
        .then((data) => {
          if (data && data.Events) {
            // Handle the fetched data here
            setEvents(data.Events);
          } else {
            console.log("No Event data found.");
          }
          setLoading(false); // Set loading to false when data fetching is done
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false in case of an error too
          // Handle the error if needed
        });
    }

    fetchDataFromBackend();
  }, [documentID]);

  return (
    <div>
      <Navbar />
      <div id="content">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            {events.map((event, index) => (
              <div className="event-container" key={index}>
                <h3>{event.EventName}</h3>
                <p>Event Date: {event["EventDate"]}</p>
                <p>Event Location: {event["EventLocation"]}</p>
                <p>Event Description: {event.EventDetails}</p>
                <button>Register</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="footer">
        <p>&copy; www.sportiitp.com.</p>
      </div>
    </div>
  );
};

export default EventPage;
