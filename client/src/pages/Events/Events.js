import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Events.css";
import Loading from "../../components/Loading/Loading";

const Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);
  const [isLoadingGifts, setIsLoadingGifts] = useState(false); // Added isLoadingGifts state

  const [selection, setSelection] = useState({
    duration: "7days",
    event: "birthdays",
  });
  const [favColor, setFavColor] = useState(null);
  const [gender, setGender] = useState(null);
  const handleSelectionChange = (e) => {
    setSelection({
      ...selection,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost/api/events/${selection.event}/${selection.duration}`
        );
        setData(response.data);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error("Nothing to show: ", e);
        setError("Please select options from above"); // Set the error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selection]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        setIsLoadingGifts(true); // Start loading animation
        const response = await axios.get("http://localhost/api/scrape/", {
          params: {
            color: favColor,
            gender: gender,
          },
        });

        const url = await response.data;
        setUrls(url);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingGifts(false); // Stop loading animation
      }
    };
    fetchGifts();
  }, [favColor,gender]);

  const handleClick = (index, e) => {
    const isGetGiftsButtonClicked =
      e.target.classList.contains("get-gifts-button");
    const isProductsLinkClicked = e.target.closest(".products");
    if (isGetGiftsButtonClicked || isProductsLinkClicked) {
      e.stopPropagation(); // Prevent card collapse when Get Gifts button is clicked
    } else {
      const updatedData = [...data];
      updatedData[index].expanded = !updatedData[index].expanded;
      setData(updatedData);
      setUrls([]);
    }
  };

  const calculateYearsOfService = (dateOfJoining) => {
    const joiningDate = new Date(dateOfJoining);
    const currentDate = new Date();
    const diffInMilliseconds = Math.abs(currentDate - joiningDate);
    const yearsOfService = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    return yearsOfService;
  };

  return (
    <div className="events-container">
      <div className="select-duration">
        <select
          value={selection.duration}
          name="duration"
          onChange={handleSelectionChange}
        >
          <option value="">Select Duration</option>
          <option value="7days">7 days</option>
          <option value="14days">14 days</option>
          <option value="1month">1 month</option>
          <option value="6month">6 months</option>
        </select>
      </div>
      <br />
      <div className="select-event">
        <select
          value={selection.event}
          name="event"
          onChange={handleSelectionChange}
        >
          <option value="">Select Event</option>
          <option value="birthdays">Birthdays</option>
          <option value="anniversaries">Anniversaries</option>
        </select>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="data-card">
          {data.map((item, index) => (
            <div
              className={`card ${item.expanded ? "expanded" : ""}`}
              key={item._id}
              onClick={(e) => handleClick(index, e)}
            >
              <div className="card-content">
                <p className="employee-name">{item.employeeName}</p>
                {selection.event === "birthdays" && (
                  <p className="employee-dob">
                    Birth Date:
                    {`${item.dateOfBirth.slice(8, 10)}-${item.dateOfBirth.slice(
                      5,
                      7
                    )}`}
                  </p>
                )}
                {selection.event === "anniversaries" && (
                  <>
                    <p className="employee-joining">
                      Joining Date:
                      {`${item.dateOfJoining.slice(
                        8,
                        10
                      )}-${item.dateOfJoining.slice(5, 7)}`}
                    </p>
                    <p className="employee-years-of-service">
                      Years of Service:{" "}
                      {calculateYearsOfService(item.dateOfJoining)}
                    </p>
                  </>
                )}
                {item.expanded && (
                  <div>
                    {urls.url1 === undefined && (
                      <button
                        className="get-gifts-button"
                        onClick={() => {
                          setFavColor(item.favouriteColour);
                          setGender(item.gender);
                        }}
                      >
                        Get Gifts
                      </button>
                    )}

                    {isLoadingGifts ? ( // Check if loading is in progress
                      <Loading />
                    ) : urls.url1 !== undefined ? (
                      <div className="products">
                        <a
                          href={urls.url1}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          First Gift
                        </a>
                        <a
                          href={urls.url2}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Second Gift
                        </a>
                        <a
                          href={urls.url3}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Third Gift
                        </a>
                      </div>
                    ) : null}
                    <div className="resto-search">
                      <a  href={`https://www.google.com/search?q=${item.favouriteFood}+near+me&oq=${item.favouriteFood}+near+me`} target="_blank" rel="noopener noreferrer" >
                        {`Take ${item.employeeName} out for a eat`}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
