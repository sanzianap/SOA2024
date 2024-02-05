import { createSignal, createEffect } from "solid-js";

const GetAllProducts = () => {
  // Create a signal to hold the fetched data
  const [data, setData] = createSignal(null);

  // Create an effect to fetch data when the component mounts
  createEffect(() => {
    // Define the API endpoint
    const apiUrl = "http://localhost:18080/products";

    // Fetch data using the GET method
    fetch(apiUrl)
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
    <div class="relative overflow-x-auto">
        <span>PRODUCT TABLE</span>
      {/* Display the fetched data */}
      {data() && (
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"><tbody>
            <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th>Price</th>
                <th>Stock</th>
            </tr>
            {data().map((item) => (
            <tr id={item.id}> 
                <td>{item.price}</td>
                <td>{item.stock}</td>
            </tr>
          ))}
        </tbody></table>
      )}
    </div>
  );
};

export default GetAllProducts;
