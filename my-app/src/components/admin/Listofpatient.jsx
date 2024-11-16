import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import Loader from "../common/Loader";

const Listofpatient = () => {
  const showConcertApi = "https://nightmarish-skeleton-q79j7pvj9qvwhxpp6-8080.app.github.dev/concerts"; // Assuming this is your API endpoint

  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showConcertApi.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setConcerts(concerts.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getConcerts();
  }, []);

  const getConcerts = () => {
    axios
      .get(showConcertApi)
      .then((res) => {
        setConcerts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (concerts.length === 0) { // Check if the array is empty
    return <h1>No concerts found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Performer</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert, i) => {
              return (
                <tr key={concert.id}> {/* Use concert.id as the key */}
                  <td>{i + 1}</td>
                  <td>{concert.title}</td>
                  <td>{concert.performer}</td>
                  <td>{concert.date}</td> 
                  <td>
                    <Link to={`/edit-concert/${concert.id}`}> {/* Use concert.id */}
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/view-concert/${concert.id}`}> {/* Use concert.id */}
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(concert.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Listofpatient;
