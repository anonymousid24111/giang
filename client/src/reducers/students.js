var initialState = [
    {
        id : 1,
        name : "Nong Thi Duong",
        email : "nongduong4279@gmail.com",
        address : "Ha Noi"
    },
    {
        id : 2,
        name : "Nong Duong",
        email : "nongduong@gmail.com",
        address : "Ha Noi"
    }
   
];

const students = ( state = initialState, action) => {
    switch (action.type) {

    
        default:
            return [...state]
    }
}

export default students;