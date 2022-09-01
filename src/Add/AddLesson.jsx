import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { addLesson, uploadFile } from '../Services/Lessons';
import { useForm } from "react-hook-form";
import QuestionsOfLessons from "./QuestionsOfLessons";
import VideosOfLessons from "./VideosOfLessons";
import { useNavigate } from 'react-router';
import { lessonsCategories, lessonsTags } from "../Services/LookUps";


function AddLesson() {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();

    const [loder, setLoder] = useState(false)

    let y = 1;
    let z = 1;
    const kuch = (e) => {
        e.target.closest(".accessHeadsH4").classList.toggle('roty');
    }

    const deleteV = (item) => {
        let a = videoData.filter((x) => {
            return x.id !== item
        })
        setVideoData(a);
    }
    const deleteQ = (item) => {
        let a = questions.filter((x) => {
            return x.id !== item
        })
        setQuestions(a);
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
    }

    useEffect(() => {
        getLessonCategories()
        getLessonTags()
    }, [])

    // 
    const [videoData, setVideoData] = useState([])
    const [questions, setQuestions] = useState([])

    const [picture, setPicture] = useState(null)
    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0])
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit1 = async (fData) => {
        if ((picture === null)) {
            Swal.fire({
                title: 'Files are missing',
                icon: 'warning',
                showConfirmButton: true,
            })
        } else {
            setLoder(true)

            const data = {
                FilePath: "",
                LessonName: fData.LessonName,
                ScholarName: fData.ScholarName,
                LessonCategoryId: parseInt(fData.CategorizeLessons),
                TagId: parseInt(fData.tag),
                Link: fData.Link,
                NoteLink: fData.pdfLink,
                Description: fData.Description,
                AssessmentQuestions: questions,
                RelatedVideos: videoData
            }

            for (let file in data.RelatedVideos) {
                if (data.RelatedVideos[file].picture) {
                    const formData3 = new FormData();
                    formData3.append("", data.RelatedVideos[file].picture);
                    const imageResponse3 = await uploadFile(formData3);
                    data.RelatedVideos[file].FilePath = imageResponse3.data.data.filePath;
                    delete data.RelatedVideos[file].picture
                }
            }

            // picture
            const formData3 = new FormData();
            formData3.append("", picture);
            const imageResponse3 = await uploadFile(formData3);
            data.FilePath = imageResponse3.data.data.filePath;
            // pdf
            const response = await addLesson(data)
            if (response.data.code === 1) {
                Swal.fire({
                    title: 'Lesson Added!',
                    timer: 1000,
                    icon: 'success',
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    navigate('/lessons');
                }, 1400);
            }
            if (response.data.code === 0) {
                setLoder(false)
                const swalWithBootstrapButtons = Swal.mixin({
                })
                swalWithBootstrapButtons.fire({
                    title: response.data.message,
                    icon: 'error',
                })
            }
        }
    }

    return (
        <div className='dashboardContainer'>
            <Link className="editHeading arrowbefore" to="/lessons">
                <img src="/assets/images/edit/Icon ionic-ios-arrow-back.png" alt="" />
                <h2>Add Lessons</h2>
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
                                <input className='miftaahFieldsInput' type="text" name="uname" placeholder="Lesson Name" {...register("LessonName", { required: true })} />
                                {errors.LessonName && <span className='eror'>Lesson Name is required</span>}
                            </div>

                            <div className="miftaahFields setspecil">
                                <div className="addLessonF">
                                    <label className='lessonLabel' htmlFor="upass">Categorize Lessons</label>
                                </div>

                                <select className='miftaahFieldsInput stField' type="number" name="uname" {...register("CategorizeLessons")} >
                                    <option value="" selected>Select Category</option>
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
                                <input className='miftaahFieldsInput' type="text" name="upass" placeholder="Scholar Name" {...register("ScholarName", { required: true })} />
                                {errors.ScholarName && <span className='eror'>Scholar Name is required</span>}
                            </div>
                            <div className="miftaahFields">
                                <div className="addLessonF">
                                    <label className='lessonLabel' htmlFor="upass">Add Video Link</label>
                                </div>
                                <input className='miftaahFieldsInput' type="text" name="upass" placeholder="Add Video Links" {...register("Link", { required: true })} />
                                {errors.Link && <span className='eror'>Link is required</span>}
                            </div>
                            <div className="miftaahFields">
                                <div className="addLessonF">
                                    <label className='lessonLabel' htmlFor="upass">Upload Thumbnail</label>
                                </div>
                                <input id='file1' type="file" className='miftaahFieldsInput setPadMIftah' onChange={imagesPreview} />
                            </div>
                            <div className="miftaahFields mr16">
                                <div className="addLessonF">
                                    <label className='lessonLabel' >Add Pdf Link</label>
                                </div>
                                <input className='miftaahFieldsInput' type="text" name="upass" placeholder="Add Pdf link" {...register("pdfLink")} />
                            </div>
                        </div>
                        <div className="wdth31">
                            <div className="addLessonF">
                                <label className='lessonLabel' htmlFor="tname">Tags</label>
                            </div>
                            <select className='miftaahFieldsInput stField' type="text" name="tname" placeholder="Lesson Name" {...register("tag", { required: true })}>
                                <option value="" disabled selected>Select Tag</option>
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
                            <textarea {...register("Description", { required: true })} className='editFieldsInput' placeholder="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latinli tera ture from 45 BC, making it over 2000 years old, Contrary to popular belief." rows="5" />
                            {errors.Description && <span className='eror'>Description is required</span>}
                        </div>
                    </div>
                </div>

                {/* videos k lye form */}
                <VideosOfLessons setPicture={setPicture} vdata={videoData} setVData={setVideoData} />

                {/* video list */}
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
                            {videoData.map((x) => {
                                return <div className='videoList LessonvideoList'>
                                    <div className='accessHeads'>
                                        <h4 style={{ color: "white" }}>{y++}</h4>
                                    </div>
                                    <div className='accessHeads'>
                                        <h4 className='accessHeadsH4'>{x.Link}</h4>
                                    </div>
                                    <div className='accessHeads ml-10'>
                                        <img className="lThumbnail" src={x.FilePath} alt="" />
                                    </div>
                                    <div className='accessHeads'>
                                        {x.NoteLink ? <img className="lThumbnail setLPf" src='/assets/images/pdf.png' alt="" />
                                            : "No PDF"}
                                    </div>
                                    <div className='accessHeads videoDelBtn'>
                                        <img className="del-img" src="/assets/images/icons/action_delete_icon.svg" onClick={() => deleteV(x.id)} alt="" />
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>


                {/* questions k lye form */}

                <QuestionsOfLessons questions={questions} setQuestions={setQuestions} />

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
                            {questions.map((x) => {
                                return <div className='userAccess optiondescp qList'>
                                    <div className='accessHeads W5'>
                                        <h4 style={{ color: "white" }}>{z++}</h4>
                                    </div>
                                    <div className='accessHeads W85'>
                                        <h4 className='accessHeadsH4'>{x.Question} <img onClick={kuch} className='arrowDon' src="/assets/images/arrow-back.svg" alt="" />
                                            <div className='options-btn'>
                                                <Link to="" className={x.Answers === x.Choice1 ? 'op-btn correct' : 'op-btn'}>{x.Choice1}</Link>
                                                <Link to="" className={x.Answers === x.Choice2 ? 'op-btn correct' : 'op-btn'}>{x.Choice2}</Link>
                                                <Link to="" className={x.Answers === x.Choice3 ? 'op-btn correct' : 'op-btn'}>{x.Choice3}</Link>
                                                <Link to="" className={x.Answers === x.Choice4 ? 'op-btn correct' : 'op-btn'}>{x.Choice4}</Link>
                                            </div>
                                        </h4>
                                    </div>
                                    <div className='accessHeads ml-14 W6'>
                                        <img className="del-img" src="/assets/images/icons/action_delete_icon.svg" onClick={() => deleteQ(x.id)} alt="" />
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                </div>

                <div className="buttonSet mb-0">
                    <Link className="bttn HAbttn mr-15" to="/lessons">Cancel</Link>
                    {
                        (loder >= true) ?
                            <div className="relative">
                                <div className="loader alignLoader"></div>
                                <button className="bttn Abttn" type="button" disabled >Save</button>
                            </div>
                            :
                            <button className="bttn Abttn" type="submit" >Save</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default AddLesson