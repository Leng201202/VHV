import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";

const ListOfPatients = () => {
  const showListofPatientApi = "https://nightmarish-skeleton-q79j7pvj9qvwhxpp6-8080.app.github.dev/concerts";

  const [concerts, setConcerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const getConcerts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(showListofPatientApi);
        setConcerts(data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    getConcerts();
  }, []);

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(concerts.map((concert) => concert.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSendSelected = () => {
    if (selectedItems.length === 0) {
      alert("No items selected!");
      return;
    }
    console.log("Sending items:", selectedItems);
    alert(`Selected items: ${selectedItems.join(", ")}`);
  };

  if (isLoading) return <Loader />;
  if (concerts.length === 0 && !isLoading)
    return (
      <div className="text-center mt-5">
        <h1>No Patients Found</h1>
        <p className="text-muted">Try refreshing or adding new patients.</p>
      </div>
    );

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Patient List</h2>
      </div>
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedItems.length === concerts.length && concerts.length > 0
                }
                aria-label="Select All"
              />
            </th>
            <th>#</th>
            <th>Title</th>
            <th>Performer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((concert, i) => (
            <tr key={concert.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(concert.id)}
                  onChange={() => handleSelect(concert.id)}
                  aria-label={`Select ${concert.title}`}
                />
              </td>
              <td>{i + 1}</td>
              <td>{concert.title}</td>
              <td>{concert.performer}</td>
              <td>{concert.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
          className="btn btn-primary"
          onClick={handleSendSelected}
          disabled={selectedItems.length === 0}
        >
          Send Selected
        </button>
    </div>
  );
};

export default ListOfPatients;
