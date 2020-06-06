import * as Types from './../contants/ActionTypes';


export const actGetStudents = (students) => {
    return{
        type : Types.GET_STUDENTS,
        students
    }
}