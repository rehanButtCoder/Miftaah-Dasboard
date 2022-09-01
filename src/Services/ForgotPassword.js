import BaseUrl from "../Components/BaseUrl";

export const forgotPass = async (body) => {
    try {
        // debugger
        const response = await BaseUrl.post("/api/admin/account/ForgotPassword", body);
        return response;
    } catch (err) {
        return err.response
    }
}