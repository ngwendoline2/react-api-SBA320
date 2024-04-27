import React, { useState, useEffect } from 'react';

function ChicagoData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);  // Adding state for handling errors

  useEffect(() => {
    // Example values - replace 'your-dataset-id' and 'Your SQL Query Here' with actual values
    const datasetId = "your-dataset-id";  // Replace with actual dataset ID
    const query = encodeURIComponent("SELECT * WHERE some_condition = 'value' LIMIT 100");
    const url = `https://data.cityofchicago.org/resource/${datasetId}.json?$query=${query}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {  // Check if response is not OK and throw an error
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());  // Setting error to state
      });
  }, []);

  if (error) {  // Rendering error message if there is an error
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Chicago Data</h1>
      <ul>
        {data.map((item, index) => (
          // Assuming 'item.id' is the unique identifier
          <li key={item.id || index}>{item.property} {/* Replace `property` with a key from your data objects */}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChicagoData;