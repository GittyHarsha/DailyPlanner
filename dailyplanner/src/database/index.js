//opening the database

const request = window.indexedDB.open("dailyplanner", 0);
// request is of type IDBOpenDBRequest

// object to interact with indexedDB
let db;

//event handlers
//what is request object?
//what are event handlers?
//what is target of a event ?

request.onerror = (event) => {
    //TODO
};

request.onsuccess = (event) => {
    console.log("database opened successfully");
    db=event.target.result;
};

request.onupgradeneeded = (event) => { 
    console.log("database upgrade needed");
    const db= event.target.result;

    //creating object stoers

};


//error events bubble up to the db object
//single error handler

db.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
}




















/* 
schema:

objects:
1. habit tracker object
2. highlights
3. priority
4. meetings

1.  array of habits
    each habit is an array of months
    each month is an array of booleans
    0 maps to january 
    1 maps to february

    habit: [
        [],
        [],

    ]


    tasks:
    array of texts  
*/