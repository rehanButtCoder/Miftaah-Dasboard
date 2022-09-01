import BaseUrl from "../Components/BaseUrl";

export const getRelatedVideo = async (id) => {
    try {
        // debugger
        const response = await BaseUrl.get(`/api/admin/lesson/GetRelatedVideosByLessonId/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const saveRelatedVideo = async (body) => {
    try {
        // debugger
        const response = await BaseUrl.post("/api/admin/lesson/SaveRelatedVideo", body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const deleteRelatedVideo = async (id) => {
    try {
        // debugger
        const response = await BaseUrl.patch(`/api/admin/lesson/DeleteRelatedVideo?relatedVideoId=${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}