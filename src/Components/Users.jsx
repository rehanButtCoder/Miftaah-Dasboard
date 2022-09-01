import React from 'react'
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";

function Users() {
  const showMenu = (e) => {
    document.querySelectorAll(".actionContent").forEach((item) => {
      if (e.target.closest(".actionContent") === item) {
        item.classList.toggle("block")
      } else {
        item.classList.remove("block")
      }
    })
  }
  const data = [
    {
      id: 1,
      userName: 'Francesca Metts',
      email: 'example@example.com',
    },
    {
      id: 2,
      userName: 'Francesca Metts',
      email: 'example@example.com',
    },
    {
      id: 3,
      userName: 'Francesca Metts',
      email: 'example@example.com',
    },
    {
      id: 4,
      userName: 'Francesca Metts',
      email: 'example@example.com',
    },
    {
      id: 5,
      userName: 'Francesca Metts',
      email: 'example@example.com',
    },
  ]

  const columns = [
    {
      name: 'User ID',
      selector: row => row.id,
      sortable: true,
      width: "103px",
    },
    {
      name: 'Photo',
      button: true,
      cell: (row) => (
        <div>
          <div className='user-item flexing'>
            <img className='userImg' src="/assets/images/user id image.png" alt="" />
            <span>{row.fullName}</span>
          </div>
        </div>
      ),
      width: "120px",
    },
    {
      name: 'User Name',
      selector: row => row.userName,
      sortable: true,
      width: "150px",
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      // paddingLeft : "40px"
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className='actionContent'>
          <img onClick={showMenu} className='img1' src="/assets/images/More.png" alt="" />
          <div className="dropdown">
            <div className="dropdown-content">
              <Link to=''>Edit</Link>
              <Link to=''>Delete</Link>
              <Link to=''>View</Link>
            </div>
          </div>
        </div>
      )
    }
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#464646',
        backgroundColor: '#82171A26'
      },
    },
    cells: {
      style: {
        color: '#7B7B7B',
        fontSize: '14px',
        fontWeight: '400',
        backgroundColor: '#fff'
      },
    },
    headRow: {
      style: {
        borderRadius: '8px',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '400',
        border: 'none !important'
      },
    },
  };
  return (
    <div className='dashboardContainer'>
      <div className="dashboardHeading">
        <div><h2>Manage Users</h2></div>
        <Link to="/users/add-user" className='hBtn'>Add User</Link>
      </div>
      <div className="users-table">
        <div className="users-table-container">
          <div className="user-table-head">
            <div className="userHeading">
              <h2>Users Lists</h2>
            </div>
            <div className="user-table-filter">
              <img src="/assets/images/Filter Icon.png" alt="" />
              <span className="filter">Filter</span>
            </div>
          </div>
          <div className='user-table-body'>
            <DataTable columns={columns} data={data} pagination customStyles={customStyles} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Users;