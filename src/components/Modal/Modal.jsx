import React, { useState } from "react";
import "./Modal.css"
import { getDatabase, ref,update, get, child } from "firebase/database";
import { auth } from "../../firebase/firebase";
import uuid from 'react-uuid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Modal = () => {
    const email = JSON.parse(localStorage.getItem("token")).email;

  const [showModal, setShowModal] = useState(false);
  let initObj = {
    createdby: email,
    name: '',
    category: '',
    amount: 0,
    dateofexp: new Date(),
    updatedat: '',
    action: "action",
    imgUrl:
        "https://random.imagecdn.app/500/150"
  }
  const [state, setState] = useState(initObj);
  const onChangeUpdatedAt = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    setState({ ...state, updatedat: today });
    setShowModal(true);
  };

  const onChangeName = (e) => {
    setState({ ...state, name: e.target.value });
  };
  const onChangeCategory = (e) => {
    setState({ ...state, category: e.target.value });
  };
  const onChangeAmount = (e) => {
    setState({ ...state, amount: e.target.value });
  };
  
  const handleDateChange = (e) => {
    // console.log(e);
    setState({ ...state, dateofexp: e });
  };

  const updateData = () => {
    const db = getDatabase();
    const dbRef = ref(db);
    const updates = {};
        updates['/expenses/' + uuid()] = state;
        return update(ref(db), updates);
  }

  const handleSubmit = async() => {
    console.log(state);
    await updateData();
    window.location.reload();
  }
  
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={onChangeUpdatedAt}
      >
        ADD Entry
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="modalcss relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Add Expense</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Name
                    </label>
                    <input onChange = {onChangeName} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Category
                    </label>
                    <input onChange = {onChangeCategory} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Date of Expense
                    </label>
                    <DatePicker selected={state.dateofexp} onChange={handleDateChange} />
                    <label className="block text-black text-sm font-bold mb-1">
                      Amount
                    </label>

                    <input onChange = {onChangeAmount} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;