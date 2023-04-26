import React,{useCallback} from "react";
import './Modal.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Modal({todos,getTodo}) {
  
  const removeTodos = useCallback(
    async (id) => {
      try {
        //const todo = todos.find((todo) => todo._id );
        //  const lastName = todo.text.toUpperCase();
       
          await axios
            .delete(
              `/api/todo/delete/${id}`,
              { id },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(() => getTodo());
          toast.success("Muvaffaqiyatli oʻchirildi");
            
      } catch (error) {
        console.log(error);
      }
     
    },
    [getTodo]
  );
  return (
    <>
    <ToastContainer/>
    <div className="modal">
    <div className="modal-content">
      <span className="close">&times;</span>
      <h2>Modal Title</h2>
      <p>Modal content goes here.</p>
      <button className="ok-button"
      onClick={(todo) => removeTodos(todo._id)}
      >OK</button>
    </div>
  </div>
  </>
  );
}

export default Modal;
