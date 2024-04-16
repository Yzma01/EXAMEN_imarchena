import { apiHandler, dateRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const scheduleDates = await dateRepo.getAll();
    return res.status(200).json(scheduleDates);
}