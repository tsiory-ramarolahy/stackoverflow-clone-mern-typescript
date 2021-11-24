import { connect } from "mongoose";

connect('mongodb://localhost:27017/stackOverflow')
    .then(() => console.log('database connect'))
    .catch(e => console.log("connection to database connected: " + e));
