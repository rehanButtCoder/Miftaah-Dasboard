import BaseUrl from "../Components/BaseUrl";

export const get = async (body)=>{
    try{
        // debugger
        // /api/admin/lesson/GetLessons?PageNumber=1&PageSize=10&search=
        const response = await BaseUrl.get(`/api/admin/lesson/GetLessons?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}&search=${body.search}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const uploadFile = async (body)=>{
    try{
        // debugger
        const response = await BaseUrl.post("/api/admin/lesson/UploadLessonFile" , body);
        return response;
    }catch(err){
        return err.response
    }
}

export const addLesson = async (body)=>{
    try{
        // debugger
        const response = await BaseUrl.post("/api/admin/lesson/SaveLesson" , body);
        return response;
    }catch(err){
        return err.response
    }
}

export const getLessonById = async (id)=>{
    try{
        // debugger
        const response = await BaseUrl.get(`/api/admin/lesson/GetLesson/${id}`);
        return response;
    }catch(err){
        return err.response
    }
}

export const updateLesson = async (body)=>{
    try{
        // debugger
        const response = await BaseUrl.put(`/api/admin/lesson/UpdateLesson` , body);
        return response;
    }catch(err){
        return err.response
    }
}

export const deleteLesson = async (id)=>{
    try{
        // debugger
        const response = await BaseUrl.patch(`/api/admin/lesson/DeleteLesson?lessonId=${id}`);
        return response;
    }catch(err){
        return err.response
    }
}
