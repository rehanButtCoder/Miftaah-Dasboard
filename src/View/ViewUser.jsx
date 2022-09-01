import React from 'react'

function ViewUser() {
    return (

        <div className='dashboardContainer'>
            <div className="editHeading arrowbefore" to="/manage-lesson">
                <img src="/assets/images/edit/Icon ionic-ios-arrow-back.png" alt="" />
                <h2>View User</h2>
            </div>
            <div className="users-table p-40">
                <div className='speakerContainer'>
                    <div className='speakerWithimg'>
                        <img src="/assets/images/user id imageL.png" alt="" />
                        <div className='speakerContnt'>
                            <h3 className='speakerH3'>Name</h3>
                            <h4 className='speakerH4'>Shaykh Noman Moola</h4>
                        </div>
                    </div>
                    <div className='speakerOnly'>
                        {/* <img src="/assets/images/user id imageL.png" alt="" /> */}
                        <div className='speakerContnt'>
                            <h3 className='speakerH3'>Email</h3>
                            <h4 className='speakerH4'>example@example.com</h4>
                        </div>
                    </div>
                </div>

                <div className='speakerDescp'>
                    {/* <h3 className='speakerH3'>Description</h3>
                    <h4 className='speakerH4'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latinliterature from 45 BC, making it over 2000 years old.</h4> */}
                </div>
            </div>
        </div>
    )
}

export default ViewUser