import BaseUrl from "../Components/BaseUrl";

export const lessonsCategories = async () => {
    try {
        // debugger
        const response = await BaseUrl.get(`/api/admin/lookup/GetLessonCategories`);
        return response;
    } catch (err) {
        return err.response
    }
}
export const lessonsTags = async () => {
    try {
        // debugger
        const response = await BaseUrl.get(`/api/admin/lookup/GetTags`);
        return response;
    } catch (err) {
        return err.response
    }
}