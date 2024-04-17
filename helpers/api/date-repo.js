import getConfig from 'next/config';
import { db } from 'helpers/api';

const { serverRunTimeConfig } = getConfig();
const ScheduleDate = db.ScheduleDate;

export const dateRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ScheduleDate.find();
}

async function getById(id) {
    return await ScheduleDate.find(id)
}

async function create(params) {
    const date = params.date;
    const objDate = new Date(date);

    //buscar si ya existe una reunión para esa fecha, hora y persona
    if (await ScheduleDate.findOne({
        date: objDate,
        userId: params.userId,
        hour: params.hour
    }) !== null
    ) {
        throw `this user already have a date for ${params.date} ${params.hour}${params.hour > 11 ? 'pm' : 'am'}`
    }

    if (await ScheduleDate.findOne({
        date: objDate,
        hour: params.hour
    }) !== null
    ) {
        throw `this date and hour is already use for another person`
    }

    params.date = objDate;
    const scheduleDate = new ScheduleDate(params);

    await scheduleDate.save();

}

async function update(id, params) {
    let date = await ScheduleDate.findOne({_id: params.id});
    console.log(date);
    
    if (!date) {
        throw `date not found for userID ${id}`
    }
    
    if (await ScheduleDate.findOne({
        hour: params.hour,
        date: params.date
    })) {
        throw `this date and hour has already taken`
    }
    if (date.state !== "pendiente"){
        throw `this date is already ${date.state} please schedule another date`
    }

    Object.assign(date, params);
    
    console.log(date);
    await date.save();
}

async function _delete(id, params) {
    await ScheduleDate.findOneAndDelete({userId: id, _id: params.id});
}