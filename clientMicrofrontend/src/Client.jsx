import { createSignal, createEffect } from "solid-js";
import { createDate } from "@solid-primitives/date";

const Client = () => {
  // Create signals for form input values and client list
  const [name, setName] = createSignal("");
  const [birthDate, setBirthDate] = createSignal(createDate());
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [clients, setClients] = createSignal([]);

  // Function to format the date as "DD.MM.YYYY"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  setBirthDate(formatDate(new Date("01.01.2000")));

  // Function to handle input change and update selected date
  const handleDateChange = (event) => {
    const selectedDateString = event.target.value;
    const selectedDateObject = new Date(selectedDateString);
    setBirthDate(formatDate(selectedDateObject));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to add a new client
      const response = await fetch("http://localhost:18080/addClient", {
        method: "POST",
        body: JSON.stringify({
            name: name(),
            birthDate: birthDate(), 
            username: username(),
            email: email()
          }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
      });

      if (response.ok) {
        // If the client is added successfully, fetch the updated list of clients
        fetchClients();
        // Reset form fields
        setName("");
        setBirthDate(formatDate(new Date("01.01.2000")));
        setUsername("");
        setEmail("");
      } else {
        console.error("Error adding client:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Function to handle client deletion
  const handleDelete = async (clientId) => {
    try {
      // Make a DELETE request to remove the client
      const response = await fetch(`http://localhost:18080/removeClient/${clientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the client is deleted successfully, fetch the updated list of clients
        fetchClients();
      } else {
        console.error("Error deleting client:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // Function to fetch the updated list of clients
  const fetchClients = async () => {
    try {
      // Make a GET request to fetch the list of clients
      const response = await fetch("http://localhost:18080/clients");

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

  // Use createEffect to fetch the initial list of clients when the component mounts
  createEffect(() => {
    fetchClients();
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Client Name:
          <input type="text" value={name()} onInput={(e) => setName(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <label>
          Birth Date:
          <input type="date" value={birthDate()} onInput={handleDateChange} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username()} onInput={(e) => setUsername(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email()} onInput={(e) => setEmail(e.target.value)} class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </label>
        <br />
        <button type="submit" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Client</button>
      </form>
      <br />

      {/* Display the table of clients */}
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
        <tr class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th>Name</th>
            <th>Birth Date</th>
            <th>Username</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clients().map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.birthDate}</td>
              <td>{client.username}</td>
              <td>{client.email}</td>
              <td>
                <button onClick={() => handleDelete(client.id)} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Client;
