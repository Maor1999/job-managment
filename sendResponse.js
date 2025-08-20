const sendResponse = ({res,statusCode,message,data=null}) =>{
    const status = statusCode < 400 ? "success" : "error";

    res.status(statusCode).json({
        status,
        message,
        data
    });
};
export default sendResponse