import React, {useMemo, useState, useEffect} from 'react';
import Signup from '../Login/Signup';
import Table, {SelectColumnFilter, StatusPill, AvatarCell, formatDate} from '../../components/Table/Table'
import getData from '../../resources/dummy'
import Modal from "../../components/Modal/Modal";
import "./Expenses.css"
import { getDatabase, ref,update, get, child } from "firebase/database";
import { auth } from "../../firebase/firebase";


function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}


function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}
let x = [];

export default function Expenses() {
    const [data, setData] = useState(null);
    const token = getToken();
    const columns = useMemo(
      () => [
        {
          Header: "Name",
          accessor: "name",
          Cell: AvatarCell,
          imgAccessor: "imgUrl",
          emailAccessor: "email",

        },
        {
          Header: "Category",
          accessor: "category",
          Filter: SelectColumnFilter,
          filter: 'includes',
        },
        {
          Header: "Date of Expense",
          accessor: "dateofexp",
          Filter: SelectColumnFilter,
          filter: (rows, id, filterValue) =>
              rows.filter((row) => {
                console.log(filterValue.startDate)
                return row.values.dateofexp >= filterValue.startDate && row.values.dateofexp <= filterValue.endDate
              })
        },
        {
          Header: "Amount",
          accessor: "amount",
          Filter: SelectColumnFilter,
          filter: 'includes',
        },
        {
          Header: "Updated At",
          accessor: "updatedat",
          Filter: SelectColumnFilter,
          filter: 'includes',
        },
        {
          Header: "Created By",
          accessor: "createdby",
          Filter: SelectColumnFilter,
          filter: 'includes',
        },
        {
          Header: "Actions",
          accessor: "action",
        },
      ],
      []
    );
    // console.log(getdata());
    console.log(getData());
    // const data = useMemo(() => getData(), []);
   

    
    useEffect(() =>{
      async function getdata() {
        const db = getDatabase();
        const dbRef = ref(db);
        await get(child(dbRef, `expenses/`)).then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const datax = Object.values(snapshot.val());
            console.log(datax);
            // x = datax;
            setData(datax);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
      
      if(!data){
        getdata();
      }
      
    })
    // console.log("x", x);
    if(!token) {
      return <Signup setToken={setToken} />
  }

    
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="modal flex flex-col items-center justify-center">
        <Modal />
      </div>
        <div className="mt-4">
          {
            data ? <Table columns={columns} data={data} /> : <div>Hello</div>
          }
        </div>
      </main>
    </div>
  );
}