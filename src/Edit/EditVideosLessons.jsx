import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import uuid from 'react-uuid'
import { uploadFile } from '../Services/Lessons';
import { saveRelatedVideo } from '../Services/RelatedVideos';

const EditVideosLessons = ({ vdata, setVData, setId }) => {
    const[loder , setLoder] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [imgData, setImgData] = useState()
    const [picture, setPicture] = useState(null)
    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
            setPicture(e.target.files[0])
        }
    }

    const onSubmit = async (fdata) => {
        setLoder(true)
        let v = [...vdata];
        const data = {
            LessonId: parseInt(setId),
            Link: fdata.videoUrl,
            FilePath: "",
            // picture: picture,
            NoteLink: fdata.pdfUrl
        }
        // generate img link
        if (picture !== null) {
            const formData = new FormData();
            formData.append("", picture);
            const imageResponse = await uploadFile(formData);
            data.FilePath = imageResponse.data.data.filePath;
        }

        const resp = await saveRelatedVideo(data)
        v.push({
            LessonId: parseInt(setId),
            Link: resp.data.data.link,
            FilePath: resp.data.data.filePath,
            NoteLink: resp.data.data.noteLink
        })
        setVData(v);
        setImgData('')
        document.querySelector('.form_input_videos').reset()
        setLoder(false)
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
                            <input type="text" className='editFieldsInput setPdfff'
                                placeholder='Add Pdf link'  {...register("pdfUrl")} />
                        </div>
                    </div>
                    <div className="buttonSet mb-0">
                        {
                            (loder === true) ?
                                <div className="relative">
                                    <div className="loader alignLoader"></div>
                                    <button className="bttn Abttn" >Add</button>
                                </div>
                                :
                                <button className="bttn Abttn" onClick={handleSubmit(onSubmit)}>Add</button>
                        }

                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditVideosLessons