import { createSignal, createEffect } from "solid-js";

const Daate = () => {
  // Create a signal to hold the fetched data
  const [data, setData] = createSignal(null);

  // Create an effect to fetch data when the component mounts
  createEffect(() => {
    // Define the API endpoint
    const apiUrl = "http://localhost:18080/products";

    // Fetch data using the GET method
    fetch(apiUrl, {
        method : "GET",
        mode: 'cors',
        headers: {}
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Update the data signal with the fetched data
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  return (
    <div>
      {/* Display the fetched data */}
      {data() && (
        <ul>
          {data().map((item) => (
            <li key={item.price}>{item.stock}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Daate;
