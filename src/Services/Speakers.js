import BaseUrl from "../Components/BaseUrl";

export const get = async (search) => {
    try {
        // debugger
        const response = await BaseUrl.get(`/api/admin/speaker/GetSpeakers?search=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getSpeakersById = async (id) => {
    try {
        // debugger
        const response = await BaseUrl.get(`/api/admin/speaker/GetSpeaker/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const uploadSpeakerFile = async (body) => {
    try {
        // debugger
        const response = await BaseUrl.post("/api/admin/speaker/UploadSpeakerPicture", body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const saveSpeaker = async (body) => {
    try {
        // debugger
        const response = await BaseUrl.post("/api/admin/speaker/SaveSpeaker", body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getSingleSpeaker = async (id) => {
    try {
        // debugger
        const response = await BaseUrl.get(`/api/admin/speaker/GetSpeaker/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const updateSpeaker = async (body) => {
    try {
        // debugger
        const response = await BaseUrl.put("/api/admin/speaker/UpdateSpeaker", body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const deleteSpeaker = async (id) => {
    try {
        // debugger
        const response = await BaseUrl.patch(`/api/admin/speaker/DeleteSpeaker?speakerId=${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}
