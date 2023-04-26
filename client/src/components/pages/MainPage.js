import React, { useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import "./MainPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainPage() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const { userId, createdAt } = useContext(AuthContext);
  const [editTodo, setEditTodo] = useState(null);
  const [summa, setSumma] = useState("");
  const [show, setShow] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");



  ////////////////// SEARCH FUNCTION ///////
  const filteredTodos = todos.filter((todo) =>
  todo.text.toUpperCase().includes(searchTerm.toUpperCase())
);
/////////////////////
  //////////// Balans //////////////
  function calculateTotal() {
    const total = todos.reduce((acc, todo) => {
      return acc + parseInt(todo.summa);
    }, 0);

    return total;
  }
  //////////////////////////

  ////////////////////////// GET TODO FUNCTION ///////////
  const getTodo = useCallback(async () => {
    try {
      await axios
        .get("/api/todo", {
          headers: {
            "Content-Type": "application/json",
          },
          params: { userId },
        })
        .then((response) => setTodos(response.data));
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  ///////////////////////////////////////////
  ///////////////////////////  CREATETODO FUNCTION ////////////
  const createTodo = useCallback(async () => {
    if (!text || !summa) return null;
    try {
      await axios
        .post(
          "/api/todo/add",
          { text, userId, summa, createdAt, textareaValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setTodos([...todos], response.data);
          setText("");
          setTextareaValue("");
          setEditTodo(null);
          setSumma("");
          getTodo();
          setShow(false);
          toast.success("Muvaffaqiyatli qo'shildi");
          console.log(todos);
        });
    } catch (error) {
      console.log(error);
    }
  }, [text, summa, userId, todos, getTodo, createdAt, textareaValue]);
  /////////////////////////////////////////

  ///////////////////////// DELETE ////////////

  const removeTodos = useCallback(
    async (id) => {
      try {
        const todo = todos.find((todo) => todo._id === id);
        const lastName = todo.text.toUpperCase();
        const confirmed = window.confirm(`${lastName} ni o'chirmoqchimisiz?`);
        if (confirmed) {
          await axios.delete(`/api/todo/delete/${id}`);
          getTodo();
          toast.success("Muvaffaqiyatli oʻchirildi");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todos]
  );
  /////////////////////////////////////////////////////////////////////

  /////////////// EDIT ////////////////////////////
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `/api/todo/update/${id}`,
        { summa: editTodo.summa, textareaValue: editTodo.textareaValue, createdAt: editTodo.createdAt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEditTodo(null);
      getTodo();

      toast.success("Muvaffaqiyatli tahrirlandi");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////////////////////////////

  /////////////////// SHOW BUTTON /////////
  const showHandler = () => {
    setShow((prev) => (prev = !prev));
  };
  ////////////////////////////////////////

  const newDate = new Date().toLocaleTimeString()


  console.log(newDate);
  return (
    <div className="wrapper">
      <div className="main-page">
        {show ? (
          <>
            <h4 style={{ textAlign: "center" }}>Ro'yxatga qo'shish</h4>
            <form
              className="form form-login"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="row">
                <div className="input-field col s12 m6 offset-m3">
                  <input
                    type="text"
                    id="text"
                    name="input"
                    value={text}
                    className="validate"
                    onChange={(e) => setText(e.target.value)}
                  />
                  <label htmlFor="input">Ismi:</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 offset-m3">
                  <input
                    type="number"
                    id="newInput"
                    name="newInput"
                    value={summa}
                    className="validate"
                    onChange={(e) => setSumma(e.target.value)}
                  />
                  <label htmlFor="newInput">Summa:</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m6 offset-m3">
                  <input
                    type="text"
                    name="desc"
                    className="validate"
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                  <label htmlFor="desc">Mahsulot:</label>
                </div>
              </div>
              <div className="row">
                <div className="col s6 offset-s6 col m6 offset-m3">
                  <button
                    className="waves-effect waves-light blue btn-small"
                    onClick={createTodo}
                  >
                    Qo'shish
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
           
            <ToastContainer />

            <div className="todos">
             
               <div className="fixed-block">
               <div className="box"></div>
               <div className="title">
                <h4 style={{ color: "black" }}>
                Umumiy summa:
                <span style={{ color: "red" }}>
                  {" "}
                  {calculateTotal().toLocaleString("en-US")}{" "}
                </span>
                so'm
              </h4>
              </div>
              <div className="position">
                <button
                  className="btn-floating  waves-effect waves-light blue"
                  onClick={showHandler}
                >
                  <i className="material-icons">add</i>
                </button>
              
            </div>
               </div>
                <div className="row">
                  <div className="input-field inputField col s6 m4 offset-m8">
                  <input
                 type="text"
                 id="search"
                 value={searchTerm}
                 onChange={event => setSearchTerm(event.target.value)}
               />
               <label htmlFor="search">Izlash</label>
                  </div>
                </div>
              
           
              
                
              <table className="highlight">
                <thead>
                  <tr>
                    <th>N</th>
                    <th>Ismi</th>
                    <th>Summa</th>
                    <th>Mahsulot</th>
                    <th>Sana</th>
                    <th>Vaqti</th>
                    <th>Tahrirlash</th>
                    <th>O'chirish</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((todo, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{todo.text.toUpperCase()}</td>
                        <td>
                          {editTodo && editTodo._id === todo._id ? (
                            <input
                              type="number"
                              value={editTodo.summa}
                              onChange={(e) =>
                                setEditTodo({
                                  ...editTodo,
                                  summa: e.target.value,
                                })
                              }
                            />
                          ) : (
                            `${todo.summa.toLocaleString("en-US")} so'm`
                          )}
                        </td>
                        <td className="description">
                          {editTodo && editTodo._id === todo._id ? (
                            <input
                              type="text"
                              value={editTodo.textareaValue}
                              onChange={(e) =>
                                setEditTodo({
                                  ...editTodo,
                                  textareaValue: e.target.value,
                                })
                              }
                            />
                          ) : (
                            todo.textareaValue
                          )}
                        </td>
                        <td> {todo.createdAt.slice(0, 10)}</td>
                        <td>
                        {editTodo && editTodo._id === todo._id ? 
                            
                           newDate
                            
                           :  todo.createdAt.slice(11, 20)
                            
                          }

                        </td>

                        <td>
                          {editTodo && editTodo._id === todo._id ? (
                            <button
                              className="waves-effect waves-light green btn-small"
                              onClick={() => saveEdit(todo._id)}
                            >
                              Saqlash
                            </button>
                          ) : (
                            <button
                              className="waves-effect waves-light orange btn-small"
                              onClick={() => setEditTodo(todo)}
                            >
                              Tahrirlash
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            className="waves-effect waves-light red btn-small"
                            onClick={() => removeTodos(todo._id)}
                          >
                            O'chirish
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainPage;
