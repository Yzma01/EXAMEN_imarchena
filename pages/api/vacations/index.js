import { apiHandler, vacationRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const vacations = await vacationRepo.getAll();
    return res.status(200).json(vacations);
}