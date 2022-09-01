import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import uuid from 'react-uuid'

function QuestionsOfLessons({ questions, setQuestions }) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // debugger
        let q = [...questions]
        q.push({
            id: uuid(),
            Question: data.Question,
            Choice1: data.Choice1,
            Choice2: data.Choice2,
            Choice3: data.Choice3,
            Choice4: data.Choice4,
            Answers: data.Answers
        })

        setQuestions(q)
        reset({ Question: "" });
        reset({ Choice1: "" });
        reset({ Choice2: "" });
        reset({ Choice3: "" });
        reset({ Choice4: "" });
        reset({ Answers: "" });

        document.querySelector('.form_input').reset()
    }

    return (
        <div>

            <form className='form_input'>
                <div className="users-table">
                    <div className="users-table-container">
                        <div className="user-table-head">
                            <div className="userHeading">
                                <h2>Assessment</h2>
                            </div>
                        </div>
                        <div className="mr-26">
                            <div className="login-l">
                                <label className='lessonLabel' >Assessment Question</label>
                            </div>
                            <input {...register("Question", { required: true })} className='editFieldsInput' placeholder="Categorize Lessons" />
                            {errors.Question && <span className='eror'>Category is required</span>}
                        </div>
                        <div className='lessonSec1'>
                            <div className="editLFields choce">
                                <div className="addLessonF">
                                    <label className='lessonLabel' >Choice 1</label>
                                </div>
                                <input {...register("Choice1", { required: true })} className='editFieldsInput' type="text" placeholder="Choice" />
                                {errors.Choice1 && <span className='eror'>Choice1 field is required</span>}
                            </div>
                            <div className="editLFields choce">
                                <div className="addLessonF">
                                    <label className='lessonLabel' >Choice 2</label>
                                </div>
                                <input {...register("Choice2", { required: true })} className='editFieldsInput' type="text" placeholder="Choice" />
                                {errors.Choice2 && <span className='eror'>Choice2 field is required</span>}
                            </div>
                            <div className="editLFields choce">
                                <div className="addLessonF">
                                    <label className='lessonLabel' >Choice 3</label>
                                </div>
                                <input {...register("Choice3")} className='editFieldsInput' type="text" placeholder="Choice" />
                                {/* {errors.Choice3 && <span className='eror'>videoUrl is required</span>} */}
                            </div>
                            <div className="editLFields mr-26 choce">
                                <div className="addLessonF">
                                    <label className='lessonLabel'>Choice 4</label>
                                </div>
                                <input {...register("Choice4")} className='editFieldsInput' type="text" placeholder="Choice" />
                                {/* {errors.Choice4 && <span className='eror'>videoUrl is required</span>} */}
                            </div>
                            <div className="editLFields mr-26 choce">
                                <div className="addLessonF">
                                    <label className='lessonLabel'>Answer</label>
                                </div>
                                <input {...register("Answers", { required: true })} className='editFieldsInput' type="text" placeholder="Answer" />
                                {errors.Answers && <span className='eror'>Answer field is required</span>}
                            </div>
                        </div>
                        <div className="buttonSet mb-0">
                            <button className="bttn Abttn" onClick={handleSubmit(onSubmit)}>Add</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default QuestionsOfLessons