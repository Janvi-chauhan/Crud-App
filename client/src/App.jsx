import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", email: "", age: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      age: student.age,
    });
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Student CRUD App</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "25px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ padding: "8px", width: "150px" }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ padding: "8px", width: "200px" }}
        />
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={{ padding: "8px", width: "80px" }}
        />
        <button style={{ padding: "8px 15px" }}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>
                <button
                  onClick={() => handleEdit(s)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(s._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;