import React, {useMemo} from 'react';
import Signup from '../Login/Signup';
import Table, {SelectColumnFilter, StatusPill, AvatarCell, formatDate} from '../../components/Table/Table'
import getData from '../../resources/dummy'
import Modal from "../../components/Modal/Modal";
import "./Expenses.css"



function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}


function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}
export default function Expenses() {
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
    const data = useMemo(() => getData(), []);
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
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}