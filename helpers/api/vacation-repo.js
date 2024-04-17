import getConfig from "next/config";
import { db } from "./db";

const { serverRunTimeConfig } = getConfig();
const Vacation = db.Vacation;
const ScheduleDate = db.ScheduleDate;

export const vacationRepo = {
    getAll,
    getById,
    create, 
    // update,
    // delete: _delete
};

async function getAll(){
    return await Vacation.find();
}

async function getById(id){
    return await Vacation.find(id)
}

async function create(params){
    const objStartDate = new Date(params.startDate)
    const objEndingDate = new Date(params.endingDate)

    if(objEndingDate < objStartDate){
        throw `endig date can't be lower than start date`
    }

    if (await ScheduleDate.find({
        date:{
            $gte: objStartDate,
            $lte: objEndingDate
        }
    }) !== null){
        throw `can't schedule a vacations from ${params.startDate} to ${params.endingDate} because there are scheduled dates`
    }
}