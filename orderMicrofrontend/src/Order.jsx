import { createSignal, createEffect } from "solid-js";

const Order = () => {
  // Create a signal for the selected option
  const [selectedProduct, setSelectedProduct] = createSignal("");
  const [selectedClient, setSelectedClient] = createSignal("");
  const [currentPrice, setCurrentPrice] = createSignal(0);
  const [quantity, setQuantity] = createSignal(0);
  const [clients, setClients] = createSignal([]);
  const [products, setProducts] = createSignal([]);
  const [orders, setOrders] = createSignal([]);

  const usernameSecurity = "user";
  const passwordSecurity = "password";

  // Encode username and password in Base64 format
  const basicAuthHeader = btoa(`${usernameSecurity}:${passwordSecurity}`);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${basicAuthHeader}`);
  myHeaders.append("Content-type", "application/json; charset=UTF-8");

  // Function to handle option selection
  const handleProductsChange = (event) => {
    setSelectedProduct(event.target.value);
    setCurrentPrice(event.target.options[event.target.options.selectedIndex].slot);
  };

  const handleClientsChange = (event) => {
    setSelectedClient(event.target.value);
  };

  // Function to fetch the updated list of clients
  const fetchClients = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // Make a GET request to fetch the list of clients
      const response = await fetch("http://localhost:18080/clients", requestOptions);

      if (response.ok) {
        // Parse the response and update the clients signal
        const clientsList = await response.json();
        setClients(clientsList);
      } else {
        console.error("Error fetching clients:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // Function to fetch the updated list of products
  const fetchProducts = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      // Make a GET request to fetch the list of products
      const response = await fetch("http://localhost:18080/products", requestOptions);

      if (response.ok) {
        // Parse the response and update the products signal
        const productList = await response.json();
        setProducts(productList);
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // Function to fetch the updated list of products
  const fetchOrders = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      // Make a GET request to fetch the list of products
      const response = await fetch("http://localhost:18080/orders", requestOptions);

      if (response.ok) {
        // Parse the response and update the products signal
        const orderList = await response.json();
        setOrders(orderList);
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Use createEffect to fetch the initial list of clients when the component mounts
  createEffect(() => {
    fetchClients();
    fetchProducts();
    fetchOrders();
  });

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          client: {id: selectedClient()},
          product: {id: selectedProduct()},
          quantity: quantity(),
          price: currentPrice()*quantity()
        }),
        headers: myHeaders,
        redirect: "follow"
      };
      // Make a POST request to add a new product
      const response = await fetch("http://localhost:18080/addOrder", requestOptions);

      if (response.ok) {
        // If the product is added successfully, fetch the updated list of products
        fetchOrders();
        // Reset form fields
        setName("");
        setCurrentPrice(0);
        setQuantity(0);
        setSelectedClient("");
        setSelectedProduct("");
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Function to handle product deletion
  const handleDelete = async (orderId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };
      // Make a DELETE request to remove the product
      const response = await fetch(`http://localhost:18080/removeOrder/${orderId}`, requestOptions);

      if (response.ok) {
        // If the product is deleted successfully, fetch the updated list of products
        fetchOrders();
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Select  product</h1>
      {/* Create a select element for the dropdown */}
      <select value={selectedProduct()} onChange={handleProductsChange}>
        {/* Add options to the select element */}
        <option value="">Select an option</option>
        {products().map((product) => (
          <option value={product.id} slot={product.price}>Name:{product.name}</option>
        ))}
      </select>
      <h1>Select a client</h1>
      {/* Create a select element for the dropdown */}
      <select value={selectedClient()} onChange={handleClientsChange}>
        {/* Add options to the select element */}
        <option value="">Select an option</option>
        {clients().map((client) => (
          <option value={client.id}>Name:{client.username}</option>
        ))}
      </select>
      <br />
      <label>
          Quantity:
          <input type="number" value={quantity()} onInput={(e) => setQuantity(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
      {/* Display the selected price */}
      <p>Current price: {currentPrice()}</p> <br />
      <p>Total price of the order: {currentPrice()*quantity()}</p>
      <br />
      <button type="submit" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Place Order</button>
      </form>
      <br />
      {/* Display the table of products */}
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
        <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th>Client</th>
            <th>Product</th>
            <th>Quantiy</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders().map((order) => (
            <tr key={order.id}>
              <td>{order.client.username}</td>
              <td>{order.product.name}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>
                <button onClick={() => handleDelete(order.id)} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
