import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { getSingleSpeaker } from '../Services/Speakers'

function ViewSpeaker() {

    const [values , setValues] = useState({})

    let { id } = useParams();
    
    const getSpeaker = async() =>{
        const resp = await getSingleSpeaker(id);
        // console.log(resp.data.data)
        setValues(resp.data.data)
    }

    useEffect(() => {
        getSpeaker();
    }, [])
    
    return (

        <div className='dashboardContainer'>
            <Link className="editHeading arrowbefore" to="/speakers">
                <img src="/assets/images/edit/Icon ionic-ios-arrow-back.png" alt="" />
                <h2>View Speaker</h2>
            </Link>
            <div className="users-table p-40">
                <div className='speakerContainer'>
                    <div className='speakerWithimg'>
                        <img className='viewSpeakerImg' src={values.imagePath} alt="" />
                        <div className='speakerContnt'>
                            <h3 className='speakerH3'>Name</h3>
                            <h4 className='speakerH4'>{values.name}</h4>
                        </div>
                    </div>
                    <div className='speakerOnly'>
                        <div className='speakerContnt'>
                            <h3 className='speakerH3'>Occupation</h3>
                            <h4 className='speakerH4'>{values.occupation}</h4>
                        </div>
                    </div>
                </div>

                <div className='speakerDescp'>
                    <h3 className='speakerH3'>Description</h3>
                    <h4 className='speakerH4'>{values.description}</h4>
                </div>
            </div>
        </div>
    )
}

export default ViewSpeaker