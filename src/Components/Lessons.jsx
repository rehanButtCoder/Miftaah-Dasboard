import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import { deleteLesson, get } from '../Services/Lessons';
import Loader from './Loader';
import Swal from 'sweetalert2'

function Lessons() {
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    })
    const deleteLessonHandle = async (id) => {
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
                const resp = await deleteLesson(id);
                // console.log(resp)
                setLofr(false);
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

    const showMenu = (e) => {
        document.querySelectorAll(".actionContent").forEach((item) => {
            if (e.target.closest(".actionContent") === item) {
                item.classList.toggle("block")
            } else {
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
            name: 'Categorize Lessons',
            selector: row => row.lessonCategoryName,
            width: "170px",
        },
        {
            name: 'Lesson Name',
            selector: row => row.lessonName,
        },
        {
            name: 'Video Links',
            selector: row => row.link,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <div className='actionContent'>
                    <img onClick={showMenu} className='img1' src="/assets/images/More.png" alt="" />
                    <div className="dropdown">
                        <div className="dropdown-content">
                            <Link to={`/lessons/edit-lesson/${row.lessonId}`} >
                                <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
                            <Link onClick={() => deleteLessonHandle(row.lessonId)} to=''><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
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

    const [lessonData, setLessonData] = useState();

    const [lofr, setLofr] = useState(false);


    const getLessons = async (page) => {
        // debugger
        const resp = await get({
            pageNumber: page,
            pageSize: perPage,
            search: ""
        });
        // console.log(resp)
        setLessonData(resp.data.data.lessons)
        setTotalRows(resp.data.data.totalLessons)
        setLofr(true);
    }
    useEffect(() => {
        getLessons(1)
    }, [lofr])

    const handlePageChange = (page) => {
        getLessons(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        const response = await get({ pageNumber: page, pageSize: newPerPage });
        setLessonData(response.data.data.lessons);
        setPerPage(newPerPage);
    };

    // search
    const searchlesson = async (e) => {
        // debugger
        const resp = await get({
            pageNumber: 1,
            pageSize: 10,
            search: e
        });
        setLessonData(resp.data.data.lessons)
        setTotalRows(resp.data.data.totalLessons)
    }

    return (
        <div className='dashboardContainer'>
            <div className="dashboardHeading">
                <div><h2>Manage Lessons</h2></div>
                <Link to="/lessons/add-lesson" className='hBtn'>Add Lesson</Link>
            </div>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Lessons Lists</h2>
                        </div>
                        <div className="user-table-filter">
                            <img src="/assets/images/Filter Icon.png" alt="" />
                            <span className="filter">Filter</span>
                            <input type="text" placeholder='search' className='inputField' onChange={(e) => searchlesson(e.target.value)} />
                        </div>
                    </div>
                    <div className='user-table-body'>
                        {(lofr ? <DataTable columns={columns} data={lessonData}
                            pagination customStyles={customStyles}
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        /> : <Loader />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lessons;