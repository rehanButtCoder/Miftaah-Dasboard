import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { deleteSpeaker, get } from '../Services/Speakers';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Swal from 'sweetalert2'

function Speakers() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    }
  })


  const showMenu = (e) => {
    document.querySelectorAll(".actionContent").forEach((item) => {
      if (e.target.closest(".actionContent") === item) {
        item.classList.toggle("block")
      } else {
        item.classList.remove("block")
      }
    })
  }

  const abc = (e) => {
    document.querySelectorAll(".actionContent").forEach((item) => {
      if (e.target.closest(".actionContent") === item) {
        item.classList.remove("block")
      }
    })
  }

  const columns = [
    {
      name: 'User ID',
      cell: (row, index) => index + 1,
      width: "103px",
    },
    {
      name: 'Photo',
      button: true,
      cell: (row) => (
        <div>
          <div className='user-item flexing'>
            <img className='userImg' src={row.imagePath} alt="" />
          </div>
        </div>
      ),
      width: "120px",
      paddingRight: "30px"
    },
    {
      name: 'Speakers Name',
      selector: row => row.name,
    },
    {
      name: 'Action',
      button: true,
      cell: (row) => (
        <div className='actionContent'>
          <img onClick={showMenu} className='img1' src="/assets/images/More.png" alt="" />
          <div className="dropdown">
            <div onClick={abc} className="dropdown-content">
              <Link to={`/speakers/edit-speaker/${row.speakerId}`}><img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
              <Link to='' onClick={() => deleteSpeakerHandle(row.speakerId)} ><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
              <Link to={`/speakers/view-speaker/${row.speakerId}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View</Link>
            </div>
          </div>
        </div>
      )
    }
  ];

  const deleteSpeakerHandle = async (id) => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteSpeaker(id);
        console.log(resp)
        setLoafer(false);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

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

  const [speakersData, setSpeakersData] = useState([]);

  const getSpeakers = async () => {
    const resp = await get("");
    setSpeakersData(resp.data.data);
    setLoafer(true);
  }

  const [loafer, setLoafer] = useState(false)

  useEffect(() => {
    getSpeakers()
  }, [loafer])

  // search

  const searchFunc = async(e) => {
    const resp = await get(e);
    setSpeakersData(resp.data.data);
  }

  return (
    <div className='dashboardContainer'>
      <div className="dashboardHeading">
        <div><h2>Manage Speakers</h2></div>
        <Link to="/speakers/add-speaker" className='hBtn'>Add Speaker</Link>
      </div>
      <div className="users-table">
        <div className="users-table-container">
          <div className="user-table-head">
            <div className="userHeading">
              <h2>Speakers Lists</h2>
            </div>
            <div className="user-table-filter">
              <img src="/assets/images/Filter Icon.png" alt="" />
              <span className="filter">Filter</span>
              <input type="text" placeholder='Search' className='inputField' onChange={(e) => searchFunc(e.target.value)} />
            </div>
          </div>
          <div className='user-table-body'>
            {(loafer ? <DataTable columns={columns} data={speakersData} pagination customStyles={customStyles} /> : <Loader />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Speakers;