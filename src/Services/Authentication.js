import BaseUrl from "../Components/BaseUrl";

export const login = async (body)=>{
    try{
        // debugger
        const response = await BaseUrl.post("/api/admin/account/Login", body);
        return response;
    }catch(err){
        return err.response
    }
}