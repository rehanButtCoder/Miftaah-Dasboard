import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { saveSpeaker, uploadSpeakerFile } from '../Services/Speakers';
import { useNavigate } from 'react-router';

function AddSpeaker() {
    const Swal = require('sweetalert2')
    const navigate = useNavigate();

    const { register, handleSubmit,  formState: { errors } } = useForm();

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

    // loading butoon effct

    const [loder, setLoder] = useState(false)

    const onSubmit = async (fData) => {
        debugger
        if (picture === null) {
            Swal.fire({
                title: 'Image is missing',
                icon: 'warning',
                showConfirmButton: true,
            })
        } else {
            setLoder(true)
            const data = {
                ImagePath: '',
                Name: fData.Name,
                Occupation: fData.Occupation,
                Description: fData.Description
            }

            const formData3 = new FormData();
            formData3.append("", picture);
            const imageResponse3 = await uploadSpeakerFile(formData3);
            data.ImagePath = imageResponse3.data.data.filePath;

            const resp = await saveSpeaker(data);
            if (resp.data.code === 1) {
                Swal.fire({
                    title: 'Speaker Added!',
                    timer: 1500,
                    icon: 'success',
                    showConfirmButton: false,
                })

                setTimeout(() => {
                    navigate('/speakers');
                }, 2000);
            }
            // else {
            //     const swalWithBootstrapButtons = Swal.mixin({
            //     })
            //     swalWithBootstrapButtons.fire({
            //         title: resp.data.message,
            //         icon: 'error',
            //     })
            // }
        }
    }


    return (
        <div className='dashboardContainer'>
            <Link className="editHeading arrowbefore" to="/speakers">
                <img src="/assets/images/edit/Icon ionic-ios-arrow-back.png" alt="" />
                <h2>Add Speaker</h2>
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
                                        <input className='editFieldsInput' type="text" name="uname" placeholder="Shaykh Noman Moola"  {...register("Name", { required: true })} />
                                        {errors.Name && <span className='eror'>This field is required</span>}
                                    </div>
                                    <div className="editFields">
                                        <div className="login-l clr">
                                            <label htmlFor="upass">Occupation</label>
                                        </div>
                                        <input className='editFieldsInput' type="text" name="upass" placeholder="Professor" {...register("Occupation", { required: true })} />
                                        {errors.Occupation && <span className='eror'>This field is required</span>}
                                    </div>
                                </div>

                                <div className="mt-20">
                                    <div className="login-l">
                                        <label htmlFor="descp">Description</label>
                                    </div>
                                    <textarea className='editFieldsInput' name="descp" id="" rows="5" placeholder="Enter"  {...register("Description", { required: true })} />
                                    {errors.Description && <span className='eror'>This field is required</span>}
                                </div>
                            </form>
                        </div>
                        <div className='imgUpload'>
                            {imgData ? <img className='sizeSet uploadedSizeSet' src={imgData} alt='' /> : <img src="/assets/images/edit/Group 21506.png" alt="" />}

                            <div className='hiddenField'>
                                <img className='lign' id="blah" src="/assets/images/edit/upload_picture_btn.png" alt="" />
                                <input onChange={imagesPreview} className='hide' id="files" accept="image/*" type="file" />
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
                            <Link to="" className="bttn Ubttn" >Save</Link>
                        </div>
                        :
                        <Link to="" className="bttn Ubttn" onClick={handleSubmit(onSubmit)} >Save</Link>
                }
            </div>
        </div >
    )
}

export default AddSpeaker;