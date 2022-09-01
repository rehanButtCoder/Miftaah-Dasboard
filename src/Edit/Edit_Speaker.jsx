import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { getSingleSpeaker, updateSpeaker, uploadSpeakerFile } from '../Services/Speakers';
import { useNavigate } from 'react-router';

function Edit_Speaker() {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();

    const [respValues, setRespValues] = useState([])
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState()


    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            //   console.log("picture: ", e.target.files)
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgData(reader.result)
                //   console.log(reader.result)
            })
        }
    }

    const [loder, setLoder] = useState(false)


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const onSubmit = async (fData) => {

        setLoder(true)
        const data = {
            SpeakerId: id,
            ImagePath: '',
            Name: fData.name,
            Occupation: fData.occupation,
            Description: fData.description
        }


        if (picture !== null) {
            const formData3 = new FormData();
            formData3.append("", picture);
            const imageResponse3 = await uploadSpeakerFile(formData3);
            data.ImagePath = imageResponse3.data.data.filePath;
        }

        const resp = await updateSpeaker(data);
        if (resp.data.code === 1) {
            Swal.fire({
                title: 'Speaker Updated!',
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate('/speakers');
            }, 2000);
        }
    }

    let { id } = useParams();
    const getSpeakerById = async () => {
        // debugger
        const resp = await getSingleSpeaker(id)
        setRespValues(resp.data.data)
        reset(resp.data.data)
    }
    useEffect(() => {
        getSpeakerById()
    }, [])

    return (
        <div className='dashboardContainer'>
            <Link className="editHeading arrowbefore" to="/speakers">
                <img src="/assets/images/edit/Icon ionic-ios-arrow-back.png" alt="" />
                <h2>Edit Speakers</h2>
            </Link>
            <div className="users-table mb-45">
                <div className="editContainer">
                    <div className="user-table-head">
                        <div className="userHeading">
                            <h2>Speakers Details</h2>
                        </div>
                    </div>
                    <div className='half'>
                        <div className='edit-body'>
                            <form>
                                <div className="editFields-container">
                                    <div className="editFields">
                                        <div className="login-l clr">
                                            <label htmlFor="uname">Name</label>
                                        </div>
                                        <input className='editFieldsInput' type="text" name="uname" placeholder="Shaykh Noman Moola" {...register("name")} />
                                    </div>
                                    <div className="editFields">
                                        <div className="login-l clr">
                                            <label htmlFor="upass">Occupation</label>
                                        </div>
                                        <input className='editFieldsInput' type="text" name="upass" placeholder="Professor" {...register("occupation")} />
                                    </div>
                                </div>

                                <div className="mt-20">
                                    <div className="login-l">
                                        <label htmlFor="descp">Description</label>
                                    </div>
                                    <textarea className='editFieldsInput' name="descp" id="" rows="5" placeholder="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old." {...register("description")} />
                                </div>
                            </form>
                        </div>
                        <div className='imgUpload'>
                            {imgData ? <img className='sizeSet uploadedSizeSet' src={imgData} alt='' /> : <img src={respValues.imagePath} className='sizeSet uploadedSizeSet' alt="" />}
                            <div className='hiddenField'>
                                <img className='lign' src="/assets/images/edit/upload_picture_btn.png" alt="" />
                                <input onChange={imagesPreview} className='hide' accept="image/*" id="v" type="file" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className="buttonSet">
                <Link to="/speakers" className="bttn">Cancel</Link>
                {
                    (loder >= true) ?
                        <div className="relative">
                            <div className="loader setpeakerbtnlod"></div>
                            <Link to="" className="bttn Ubttn" >Update</Link>
                        </div>
                        :
                        <Link to="" className="bttn Ubttn" onClick={handleSubmit(onSubmit)} >Update</Link>
                }
            </div>
        </div >
    )
}

export default Edit_Speaker;