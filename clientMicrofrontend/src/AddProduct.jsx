import { createSignal } from "solid-js";

const AddProduct = () => {
  // Create signals for form input values
  const [price, setPrice] = createSignal(0);
  const [stock, setStock] = createSignal(0);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to serialize the form data
    const formData = new FormData();
    formData.append("price", price());
    formData.append("stock", stock());

    try {
      // Make a POST request to the API
      const response = await fetch("http://localhost:18080/addProduct", {
        method: "POST",
        body: JSON.stringify({
            price: price(), 
            stock: stock()
          }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
      });

      // Handle the response
      if (response.ok) {
        console.log("Form submitted successfully");
        // Reset form fields or perform any other actions on success
        setName(0);
        setEmail(0);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input type="number" value={price()} onInput={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Stock:
          <input type="number" value={stock()} onInput={(e) => setStock(e.target.value)} />
        </label>
        <br />
        <button type="submit">SaveProduct</button>
      </form>
    </div>
  );
};

export default AddProduct;
