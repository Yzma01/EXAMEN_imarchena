import { apiHandler, usersRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    const user = await usersRepo.create(req.body);
    return res.status(200).json({message: user === null? 'error': 'user created'});
}
