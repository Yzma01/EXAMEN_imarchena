import { apiHandler, dateRepo } from "helpers/api";

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res){
    const date = await dateRepo.getById(req.query.userId);

    if(!date){
        throw "date not found"
    }

    return res.status(200).json(date);
}

async function update(req, res){
    await dateRepo.update(req.query.id, req.body);
    return res.status(200).json({})
}

async function _delete(req, res){
    await dateRepo.delete(req.query.id);
    return res.status(200).json({})
}