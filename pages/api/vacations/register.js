import { apiHandler, vacationRepo } from "helpers/api";

export default apiHandler({
    post: register
});

async function register(req, res){

    const vac = await vacationRepo.create(req.body);
    return res.status(200).json({})
}