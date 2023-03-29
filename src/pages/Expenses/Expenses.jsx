import React from 'react';
import Signup from '../Login/Signup';
// import Table from '../../components/Table/Table'
import getData from '../../resources/dummy'


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
    if(!token) {
        return <Signup setToken={setToken} />
    }

    const columns = React.useMemo(
      () => [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Role",
          accessor: "role",
        },
      ],
      []
    );

    const data = React.useMemo(() => getData(), []);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
        </div>
        <div className="mt-4">
          {/* <Table columns={columns} data={data} /> */}
        </div>
      </main>
    </div>
  );
}