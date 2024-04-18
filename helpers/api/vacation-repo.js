import getConfig from "next/config";
import { db } from "./db";

const { serverRunTimeConfig } = getConfig();
const Vacation = db.Vacation;
const ScheduleDate = db.ScheduleDate;

export const vacationRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(){
    return await Vacation.find();
}

async function getById(id){
    return await Vacation.find({userId: id});
}

async function create(params){
    const objStartDate = new Date(params.startDate)
    const objEndingDate = new Date(params.endingDate)

    if(objEndingDate < objStartDate){
        throw `endig date can't be lower than start date`
    }
    if(await Vacation.findOne({
        userId: params.userId,
        startDate: objStartDate,
        endingDate: objEndingDate
    }) !== null){
        throw `this user already hava vacations from ${params.startDate} to ${params.endingDate}`
    }
    const dates = await ScheduleDate.find({
        date:{
            $gte: objStartDate,
            $lte: objEndingDate
        }
    })
    const pendingVacatiosn = await Vacation.find({
        userId: params.userId,
        state: "pendiente"
    });

    if (dates.length > 0 || pendingVacatiosn.length > 0){
        throw `can't schedule a vacations from ${params.startDate} to ${params.endingDate} because there are ${dates.length > 0?'scheduled dates': 'pending vacations'}`
    }
    params.startDate = objStartDate;
    params.endingDate = objEndingDate;

    const vacation = new Vacation(params);

    await vacation.save();
}

async function update(id, params){
    const objStartDate = new Date(params.startDate)
    const objEndingDate = new Date(params.endingDate)
    const vac = await Vacation.findOne({_id: params.id});
    console.log(vac);

    if(!vac){
        throw `there are no registered vacation for user ${id} with vacation id ${params.id}`
    }
    if(objEndingDate < objStartDate){
        throw `endig date can't be lower than start date`
    }
    if(await Vacation.findOne({
        userId: params.userId,
        startDate: objStartDate,
        endingDate: objEndingDate
    }) !== null){
        throw `this user already hava vacations from ${params.startDate} to ${params.endingDate}`
    }
    const dates = await ScheduleDate.find({
        date:{
            $gte: objStartDate,
            $lte: objEndingDate
        }
    })
    const pendingVacatiosn = await Vacation.find({
        userId: params.userId,
        state: "pendiente"
    });

    if (dates.length > 0 || pendingVacatiosn.length > 0){
        throw `can't schedule a vacations from ${params.startDate} to ${params.endingDate} because there are ${dates.length > 0?'scheduled dates': 'pending vacations'}`
    }

    Object.assign(vac, params);

    await vac.save();
}

async function _delete(id, params){
    await Vacation.findOneAndDelete({userId: id, _id: params.id})
}