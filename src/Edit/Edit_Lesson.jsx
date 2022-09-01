import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { addLesson, getLessonById, updateLesson, uploadFile } from '../Services/Lessons';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router';
import Loader from "../Components/Loader";
import EditQuestionsLessonss from "./EditQuestionsLessonss";
import EditVideosLessons from "./EditVideosLessons";
import { lessonsCategories, lessonsTags } from "../Services/LookUps";
import { deleteRelatedVideo, getRelatedVideo } from "../Services/RelatedVideos";

function Edit_lesson() {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();

    const [loder, setLoder] = useState(false)
    const [mloder, setMLoder] = useState(true)

    let y = 1;
    let z = 1;
    const kuch = (e) => {
        e.target.closest(".accessHeadsH4").classList.toggle('roty');
    }
    // video delete
    // videoVal
    const deleteV = async (item) => {
        const resp = await deleteRelatedVideo(item)
        let a = videoVal.filter((x) => {
            return x.relatedVideoId !== item
        })
        setVideoVal(a);
    }
    // question delete
    const deleteQ = (item, itemQuestion) => {
        let a = accessmentVal.filter((x) => {
            return x.assessmentQuestionId !== itemQuestion || x.id !== item
        })
        setAccessmentVal(a);
    }
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState()

    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
        }
    }

    const [viewPdf, setViewPdf] = useState()

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit1 = async (fData) => {
        setLoder(true)
        const data = {
            lessonId: id,
            filePath: fData.filePath,
            lessonCategoryId: parseInt(fData.lessonCategoryId),
            tagId: parseInt(fData.tagId),
            lessonName: fData.lessonName,
            scholarName: fData.scholarName,
            link: fData.link,
            Notelink: fData.noteLink,
            description: fData.description,
            assessmentQuestions: accessmentVal,
        }
        // image

        if (picture !== null) {
            const formData3 = new FormData();
            formData3.append("", picture);
            const imageResponse3 = await uploadFile(formData3);
            data.filePath = imageResponse3.data.data.filePath;
        }
        const resp = await updateLesson(data)

        if (resp.data.code === 1) {
            Swal.fire({
                title: 'Lesson Updated!',
                timer: 1000,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate('/lessons');
            }, 1400);
        } else {
            setLoder(false)
            const swalWithBootstrapButtons = Swal.mixin({
            })
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }

    const [accessmentVal, setAccessmentVal] = useState([])
    let { id } = useParams();

    const getLesson = async () => {
        const resp = await getLessonById(id)

        setViewPdf(resp.data.data.noteLink)
        setImgData(resp.data.data.filePath)
        // setVideoVal(resp.data.data.relatedVideos)
        setAccessmentVal(resp.data.data.assessmentQuestions)
        if (resp.data.code === 1) {
            setMLoder(false)
        }
        reset(resp.data.data)
    }

    // get RelatedVideos
    const [videoVal, setVideoVal] = useState([])
    const getReLatedVideos = async () => {
        const resp = await getRelatedVideo(id);
        if (resp.data.code === 1) {
            setVideoVal(resp.data.data)
        } else {
            return false
        }
    }
    // geting values for lesson categories and tags
    const [lessonCategoriesVal, setLessonCategoriesVal] = useState([]);
    const getLessonCategories = async () => {
        const resp = await lessonsCategories();
        setLessonCategoriesVal(resp.data.data);
    }
    //   
    const [lessonTagsVal, setLessonTagsVal] = useState([]);
    const getLessonTags = async () => {
        const resp = await lessonsTags();
        setLessonTagsVal(resp.data.data);
        // console.log(resp.data.data)
    }

    useEffect(() => {
        getLessonTags()
    }, [])
    useEffect(() => {
        getLessonCategories()
        getReLatedVideos()
    }, [])
    useEffect(() => {
        setTimeout(() => {
            getLesson()
        }, 500);
    }, [])

    return (

        <div className='dashboardContainer'>
            {
                (mloder ?
                    <Loader />
                    :
                    <>
                        <Link className="editHeading arrowbefore" to="/lessons">
                            <img src="/assets/images/edit/Icon ionic-ios-arrow-back.png" alt="" />
                            <h2>Edit Lesson</h2>
                        </Link>
                        <form onSubmit={handleSubmit(onSubmit1)}>
                            <div className="users-table">
                                <div className="editContainer">
                                    <div className="user-table-head">
                                        <div className="userHeading">
                                            <h2>Lesson Details</h2>
                                        </div>
                                    </div>
                                    <div className='lessonSec1'>
                                        <div className="miftaahFields">
                                            <div className="addLessonF">
                                                <label className='lessonLabel' htmlFor="uname">Lesson Name</label>
                                            </div>
                                            <input className='miftaahFieldsInput' type="text" name="uname" placeholder="Lesson Name" {...register("lessonName")} />
                                        </div>
                                        <div className="miftaahFields">
                                            <div className="addLessonF">
                                                <label className='lessonLabel' htmlFor="upass">Categorize Lessons</label>
                                            </div>
                                            <select className='miftaahFieldsInput stField' type="number" name="uname" {...register("lessonCategoryId")} >
                                                <option value="">Select Category</option>
                                                {
                                                    lessonCategoriesVal?.map((x) => {
                                                        return (
                                                            <option value={x.lessonCategoryId}>{x.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="miftaahFields mr16">
                                            <div className="addLessonF">
                                                <label className='lessonLabel' htmlFor="upass">Scholar Name</label>
                                            </div>
                                            <input className='miftaahFieldsInput' type="text" name="upass" placeholder="Scholar Name" {...register("scholarName", { required: true })} />
                                        </div>
                                        <div className="miftaahFields">
                                            <div className="addLessonF">
                                                <label className='lessonLabel' htmlFor="upass">Add Video Link</label>
                                            </div>
                                            <input className='miftaahFieldsInput' type="text" name="upass" placeholder="Add Video Links" {...register("link", { required: true })} />
                                        </div>
                                        <div className="miftaahFields">
                                            <div className="addLessonF">
                                                <label className='lessonLabel' htmlFor="uplOad" >Upload Thumbnail</label>
                                            </div>
                                            <input hidden type="file" className='miftaahFieldsInput setPadMIftah' onChange={imagesPreview} id="showUpload" />
                                            <div className="supposeFile">
                                                <label for="showUpload">
                                                    <div className="sFileLeft">Upload Thumbnail</div>
                                                    <div className="sFileRight">{imgData}</div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="miftaahFields mr16">
                                            <div className="addLessonF">
                                                <label className='lessonLabel' >Add Pdf Link</label>
                                            </div>
                                            <input type="text" className='miftaahFieldsInput' placeholder='Add Pdf link' {...register('noteLink')} />
                                        </div>
                                    </div>
                                    <div className="wdth31">
                                        <div className="addLessonF">
                                            <label className='lessonLabel' htmlFor="tname">Tags</label>
                                        </div>
                                        <select className='miftaahFieldsInput stField' type="text" name="tname" placeholder="Lesson Name" {...register("tagId", { required: true })}>
                                            {/* <option value="" selected>Select Tag</option> */}
                                            {
                                                lessonTagsVal?.map((x) => {
                                                    return (
                                                        <option value={x.tagId}>{x.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {errors.tag && <span className='eror'>Tag is required</span>}
                                    </div>
                                    <div className="mr-26">
                                        <div className="login-l">
                                            <label className='lessonLabel' htmlFor="descp">Description</label>
                                        </div>
                                        <textarea {...register("description", { required: true })} className='editFieldsInput' placeholder="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latinli tera ture from 45 BC, making it over 2000 years old, Contrary to popular belief." rows="5" />
                                    </div>
                                </div>
                            </div>
                            {/* video val */}
                            <EditVideosLessons vdata={videoVal} setVData={setVideoVal} setId={id} />
                            {/* <EditVideosLessons setId={id}/> */}

                            <div className="users-table">
                                <div className="users-table-container">
                                    <div className="user-table-head">
                                        <div className="userHeading">
                                            <h2>Related Videos List</h2>
                                        </div>
                                    </div>
                                    <div className='user-table-body'>
                                        <div className='videoList'>
                                            <div className='accessHead'>
                                                <h4>ID</h4>
                                            </div>
                                            <div className='accessHead'>
                                                <h4>Video Links</h4>
                                            </div>
                                            <div className='accessHead'>
                                                <h4>Thumbnail</h4>
                                            </div>
                                            <div className='accessHead'>
                                                <h4>Pdf</h4>
                                            </div>
                                            <div className='accessHead'>
                                                <h4 className="abs">Delete</h4>
                                            </div>
                                        </div>
                                        {videoVal?.map((x) => {
                                            // debugger
                                            return <div className='videoList LessonvideoList'>
                                                <div className='accessHeads'>
                                                    <h4 style={{ color: "white" }}>{y++}</h4>
                                                </div>
                                                <div className='accessHeads'>
                                                    <h4 className='accessHeadsH4'>{x.Link}{x.link}</h4>
                                                </div>
                                                <div className='accessHeads ml-10'>
                                                    {(x.filePath ? <img className="lThumbnail" src={x.filePath} alt="" /> : <img className="lThumbnail" src={x.FilePath} alt="" />)
                                                    }
                                                </div>
                                                <div className='accessHeads'>
                                                    {x.NoteLink || x.noteLink ? <img className="lThumbnail setLPf" src='/assets/images/pdf.png' alt="" />
                                                        : "No PDF"}
                                                </div>
                                                <div className='accessHeads videoDelBtn'>
                                                    <img className="del-img" src="/assets/images/icons/action_delete_icon.svg" onClick={() => deleteV(x.relatedVideoId)} alt="" />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* questions k lye form */}

                            <EditQuestionsLessonss questions={accessmentVal} setQuestions={setAccessmentVal} setId={id} />
                            {/* } */}

                            <div className="users-table">
                                <div className="users-table-container">
                                    <div className="user-table-head">
                                        <div className="userHeading">
                                            <h2>Assessment Question List</h2>
                                        </div>
                                    </div>
                                    <div className='user-table-body'>
                                        <div className='userAccess qList'>
                                            <div className='accessHead W5'>
                                                <h4>ID</h4>
                                            </div>
                                            <div className='accessHead W90'>
                                                <h4>Assessment Question</h4>
                                            </div>
                                            <div className='accessHead W5'>
                                                <h4>Action</h4>
                                            </div>
                                        </div>
                                        {accessmentVal.map((x) => {
                                            return <div className='userAccess optiondescp qList'>
                                                <div className='accessHeads W5'>
                                                    <h4 style={{ color: "white" }}>{z++}</h4>
                                                </div>
                                                <div className='accessHeads W85'>
                                                    <h4 className='accessHeadsH4'>{x.question}{x.Question} <img onClick={kuch} className='arrowDon' src="/assets/images/arrow-back.svg" alt="" />
                                                        <div className='options-btn'>
                                                            <Link to="" className='op-btn'>{x.choice1}{x.Choice1}</Link>
                                                            <Link to="" className='op-btn'>{x.choice2}{x.Choice2}</Link>
                                                            <Link to="" className='op-btn'>{x.choice3}{x.Choice3}</Link>
                                                            <Link to="" className='op-btn'>{x.choice4}{x.Choice4}</Link>
                                                        </div>
                                                    </h4>
                                                </div>
                                                <div className='accessHeads ml-14 W6'>
                                                    <img className="del-img" src="/assets/images/icons/action_delete_icon.svg" onClick={() => deleteQ(x.id, x.assessmentQuestionId)} alt="" />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="buttonSet mb-0">
                                <Link className="bttn HAbttn mr-15" to="/lessons">Cancel</Link>
                                {
                                    (loder >= true) ? <div className="relative">
                                        <div className="loader alignLoader"></div>
                                        <button className="bttn Abttn" type="button" disabled >Update</button>
                                    </div>
                                        :
                                        <button className="bttn Abttn" type="submit" >Update</button>
                                }
                            </div>
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default Edit_lesson