import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import "./Patient.css"; // Assuming you have a CSS file for Concert styling

const Editpatient = () => {
  const [concert, setConcert] = useState({
    title: "",
    performer: "",
    date: "", // Date should be in YYYY-MM-DDTHH:mm format
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getConcertApi = "https://nightmarish-skeleton-q79j7pvj9qvwhxpp6-8080.app.github.dev/concerts"; // Assuming this is your API endpoint

  useEffect(() => {
    getConcert();
  }, []);

  const getConcert = () => {
    axios
      .get(getConcertApi.concat("/") + id)
      .then((response) => {
        setConcert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setConcert({ ...concert, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(getConcertApi.concat("/") + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(concert),
      });

      if (response.ok) {
        console.log('Concert updated successfully!');
        setConcert({ title: "", performer: "", date: "" }); // Reset form fields
        navigate('/admin/listofpatient'); // Navigate to your concert list page
      } else {
        console.error('Concert update failed!');
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="concert-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Concert</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={concert.title}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="performer" className="form-label">
            Performer
          </label>
          <input
            type="text"
            className="form-control"
            id="performer"
            name="performer"
            value={concert.performer}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date and Time (YYYY-MM-DDTHH:mm)
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={concert.date.substring(0, 16)} // Extract date and time part
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default Editpatient;
