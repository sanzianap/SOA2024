import { createSignal, createEffect } from "solid-js";

const Product = () => {
  // Create signals for form input values and product list
  const [name, setName] = createSignal("");
  const [price, setPrice] = createSignal(0);
  const [stock, setStock] = createSignal(0);
  const [products, setProducts] = createSignal([]);

  const usernameSecurity = "user";
  const passwordSecurity = "password";

  // Encode username and password in Base64 format
  const basicAuthHeader = btoa(`${usernameSecurity}:${passwordSecurity}`);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${basicAuthHeader}`);
  myHeaders.append("Content-type", "application/json; charset=UTF-8");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          name: name(),
          price: price(), 
          stock: stock()
        }),
        headers: myHeaders,
        redirect: "follow"
      };

      // Make a POST request to add a new product
      const response = await fetch("http://localhost:18080/addProduct", requestOptions);

      if (response.ok) {
        // If the product is added successfully, fetch the updated list of products
        fetchProducts();
        // Reset form fields
        setName("");
        setPrice(0);
        setStock(0);
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Function to handle product deletion
  const handleDelete = async (productId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };

      // Make a DELETE request to remove the product
      const response = await fetch(`http://localhost:18080/removeProduct/${productId}`, requestOptions);

      if (response.ok) {
        // If the product is deleted successfully, fetch the updated list of products
        fetchProducts();
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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

  // Use createEffect to fetch the initial list of products when the component mounts
  createEffect(() => {
    fetchProducts();
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={name()} onInput={(e) => setName(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price()} onInput={(e) => setPrice(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <label>
          Stock:
          <input type="number" value={stock()} onInput={(e) => setStock(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <button type="submit" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Product</button>
      </form>
      <br />

      {/* Display the table of products */}
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
        <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products().map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleDelete(product.id)} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
