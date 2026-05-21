import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://my-todo-list-xiif.onrender.com";

function App() {

  const [task, setTask] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        `${API}/tasks`
      );

      setTasks(response.data);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    }

  };

  useEffect(() => {

    setTimeout(() => {
      fetchTasks();
    }, 3000);

  }, []);

  const handleChange = (e) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  };

  const addTask = async () => {

    if (!task.title) {

      alert("Please enter task");
      return;

    }

    try {

      const response = await axios.post(
        `${API}/tasks/add`,
        task
      );

      alert(response.data.message);

      setTask({
        title: "",
        date: "",
        startTime: "",
        endTime: ""
      });

      fetchTasks();

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Backend server is not responding");

    }

  };

  const completeTask = async (id) => {

    try {

      await axios.put(
        `${API}/tasks/complete/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    }

  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `${API}/tasks/delete/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    }

  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const cardColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD93D",
    "#6C63FF",
    "#FF9F1C",
    "#2EC4B6"
  ];

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        My Todo List
      </h1>

      <div style={styles.statsContainer}>

        <div style={{
          ...styles.statBox,
          background: "linear-gradient(to right, #36D1DC, #5B86E5)"
        }}>
          <h3>{tasks.length}</h3>
          <p>Tasks Today</p>
        </div>

        <div style={{
          ...styles.statBox,
          background: "linear-gradient(to right, #11998e, #38ef7d)"
        }}>
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>

        <div style={{
          ...styles.statBox,
          background: "linear-gradient(to right, #fc4a1a, #f7b733)"
        }}>
          <h3>{pendingTasks}</h3>
          <p>Pending</p>
        </div>

      </div>

      <div style={styles.form}>

        <input
          type="text"
          name="title"
          placeholder="Task Input"
          value={task.title}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="time"
          name="startTime"
          value={task.startTime}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="time"
          name="endTime"
          value={task.endTime}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          onClick={addTask}
          style={styles.button}
        >
          Add Task
        </button>

      </div>

      <div style={styles.taskContainer}>

        {tasks.map((item, index) => (

          <div
            key={item._id}
            style={{
              ...styles.card,
              borderLeft: `10px solid ${cardColors[index % cardColors.length]}`
            }}
          >

            <h2 style={styles.taskTitle}>
              {item.title}
            </h2>

            <p style={styles.text}>
              ⏰ {item.startTime || "-"} - {item.endTime || "-"}
            </p>

            <p style={styles.text}>
              📅 {item.date || "-"}
            </p>

            <p style={styles.status}>
              Status:
              {" "}
              {item.completed
                ? "Completed ✅"
                : "Pending ⏳"}
            </p>

            <div style={styles.buttonRow}>

              <button
                style={styles.completeButton}
                onClick={() => completeTask(item._id)}
              >
                Complete
              </button>

              <button
                style={styles.deleteButton}
                onClick={() => deleteTask(item._id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

const styles = {

  container: {
    padding: "20px",
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  heading: {
    textAlign: "center",
    color: "white",
    marginBottom: "25px",
    fontSize: "40px"
  },

  statsContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap"
  },

  statBox: {
    flex: 1,
    minWidth: "150px",
    padding: "20px",
    textAlign: "center",
    borderRadius: "15px",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  form: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "18px",
    background: "linear-gradient(to right, #ff758c, #ff7eb3)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  taskContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    flex: "1 1 calc(33.33% - 20px)",
    minWidth: "250px",
    background: "linear-gradient(to right, #ffffff, #f9f9f9)",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    boxSizing: "border-box",
    transition: "0.3s"
  },

  taskTitle: {
    color: "#333"
  },

  text: {
    color: "#555",
    marginTop: "10px"
  },

  status: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#444"
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  },

  completeButton: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(to right, #56ab2f, #a8e063)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  deleteButton: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }

};

export default App;