import getConfig from 'next/config';
import { db } from 'helpers/api';

const { serverRunTimeConfig } = getConfig();
const User = db.User;
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
    return await ScheduleDate.findById(id)
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
    const date = await ScheduleDate.findOne({ userId: id });

    if (!date) {
        throw `date not found for userID ${id}`
    }

    if (date.username !== params.username && await ScheduleDate.findOne({
        hour: params.hour,
        date: params.date
    })) {
        throw `this date and hour has already taken`
    }

    Object.assign(date, params);

    await date.save();
}

async function _delete(id) {
    await ScheduleDate.findOneAndRemove(id);
}