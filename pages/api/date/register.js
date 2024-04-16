import { apiHandler, dateRepo } from "helpers/api";

export default apiHandler({
    post: register
});

async function register(req, res){
    await dateRepo.create(req.body);
    return res.status(200).json({})
}