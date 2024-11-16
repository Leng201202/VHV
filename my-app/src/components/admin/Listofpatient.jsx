import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

const Listofpatient = () => {
  const showListofPatientApi =
    "https://nightmarish-skeleton-q79j7pvj9qvwhxpp6-8080.app.github.dev/concerts";
  const sendDataApi = "https://nightmarish-skeleton-q79j7pvj9qvwhxpp6-8080.app.github.dev/admin/sent";

  const [concerts, setConcerts] = useState([]);
  const [selectedConcerts, setSelectedConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle individual selection
  const handleCheckboxChange = (id) => {
    if (selectedConcerts.includes(id)) {
      setSelectedConcerts(selectedConcerts.filter((concertId) => concertId !== id));
    } else {
      setSelectedConcerts([...selectedConcerts, id]);
    }
  };

  // Handle Select All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = concerts.map((concert) => concert.id);
      setSelectedConcerts(allIds);
    } else {
      setSelectedConcerts([]);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${showListofPatientApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setConcerts(concerts.filter((item) => item.id !== id));
      setSelectedConcerts(selectedConcerts.filter((concertId) => concertId !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Submit (Send Selected Data)
  const handleSubmit = async () => {
    const selectedData = concerts.filter((concert) =>
      selectedConcerts.includes(concert.id)
    );

    if (selectedData.length === 0) {
      alert("No items selected!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(sendDataApi, selectedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Data sent successfully to VHV users!");
        setSelectedConcerts([]); // Clear selected checkboxes
      } else {
        alert("Failed to send data.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getConcerts();
  }, []);

  const getConcerts = () => {
    axios
      .get(showListofPatientApi)
      .then((res) => {
        setConcerts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (concerts.length === 0) {
    return <h1 className="text-center mt-5">No Patient List found</h1>;
  } else {
    return (
      <div className="container mt-5">
        {isLoading && <Loader />}
        {error && <p className="text-danger">Error: {error}</p>}

        <h2 className="mb-4">List of Patients</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-muted">Selected: {selectedConcerts.length}</span>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <thead className="table-white">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedConcerts.length === concerts.length && concerts.length > 0}
                />
              </th>
              <th>No.</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert, i) => (
              <tr key={concert.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedConcerts.includes(concert.id)}
                    onChange={() => handleCheckboxChange(concert.id)}
                  />
                </td>
                <td>{i + 1}</td>
                <td>{concert.title}</td>
                <td>{concert.performer}</td>
                <td>{concert.date}</td>
                <td>
                  <Link
                    to={`/admin/listofpatient/editlistofpatient/${concert.id}`}
                    className="btn btn-sm btn me-2"
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(concert.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedConcerts.length === 0}
          >
            Submit Selected
          </button>
      </div>
    );
  }
};

export default Listofpatient;
