import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import uuid from 'react-uuid'

function VideosOfLessons({ vdata, setVData }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [imgData, setImgData] = useState()
    const [picture, setPicture] = useState()
    const imagesPreview = (e) => {
        // debugger
        if (e.target.files[0]) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
            setPicture(e.target.files[0])
        }
    }

    // PDF
    const [pdfData, setPdfData] = useState()

    const onSubmit = (data) => {
        const v = [...vdata];
        v.push({
            id: uuid(),
            Link: data.videoUrl,
            FilePath: imgData,
            picture: picture,
            NoteLink: data.pdfUrl,
            videoNumber: ""
            // NoteLinkDel: sendPdf
        })
        setVData(v);
        reset({ videoUrl: "" });
        reset({ NoteLink: "" });
        setImgData('')
        // setPdfData('')
        reset(v.NoteLink);
        document.querySelector('.form_input_videos').reset()
    }
    return (
        <form className='form_input_videos'>
            <div className="users-table">
                <div className="users-table-container">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Related Videos</h2>
                        </div>
                    </div>
                    <div className='lessonSec1'>
                        <div className="editLFields">
                            <div className="addLessonF">
                                <label className='lessonLabel' htmlFor="uname">Video 1</label>
                            </div>
                            <input className='editFieldsInput' type="text" name="uname" placeholder="www.lessonvideo.com/" {...register("videoUrl", { required: true })} />
                            {errors.videoUrl && <span className='eror'>videoUrl is required</span>}
                        </div>
                        <div className="editLFields lastone">
                            <div className="addLessonF">
                                <label className='lessonLabel' htmlFor="upass">Upload Thumbnail</label>
                            </div>
                            <input type="file" accept="image/*" className='editFieldsInput setUploadFiled' onChange={imagesPreview} />
                        </div>
                        <div className="editLFields setDpf">
                            <div className="addLessonF">
                                <label className='lessonLabel' htmlFor="upass">Upload Pdf</label>
                            </div>
                            <input type="text" className='editFieldsInput setPdfff' placeholder='Add Pdf link' {...register("pdfUrl")} />

                            {/* <input type="file" accept="application/pdf" className='editFieldsInput setUploadFiled' onChange={pdfHandler} /> */}
                        </div>
                    </div>
                    <div className="buttonSet mb-0">
                        <button className="bttn Abttn" onClick={handleSubmit(onSubmit)}>Add</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default VideosOfLessons