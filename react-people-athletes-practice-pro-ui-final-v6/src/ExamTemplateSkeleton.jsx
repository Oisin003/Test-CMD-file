// src/ExamTemplateSkeleton.jsx
//
// EXAM TEMPLATE SKELETON (MINIMAL GET EXAMPLE)
// -------------------------------------------
// If you are under time pressure in the test, this is the pattern to remember.
//  - useState for list, loading, error
//  - useEffect with fetch()
//  - res.ok check
//  - map() to render list
//
// STEPS TO ADAPT IN THE EXAM:
//  1. Change the fetch URL to the JSON file or endpoint given.
//  2. Change the fields in the JSX (item.name, item.age, etc.).
//  3. Rename the component if you want (not required).

import { useEffect, useState } from "react";

export default function ExamTemplateSkeleton() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // CHANGE HERE FOR EXAM:
    //   "/people.json" -> e.g. "/students.json" or "/players.json"
    fetch("/people.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load data (status " + res.status + ")");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {/* CHANGE FIELDS HERE FOR EXAM */}
          {item.name} – Age {item.age}
        </li>
      ))}
    </ul>
  );
}