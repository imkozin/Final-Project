// import mongoose from 'mongoose';


// const start = async () => {
//     try {
//         await mongoose.connect(process.env.ATLAS_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to the MongoDB database');

//         app.listen(process.env.PORT || 3001, () => {
//             console.log(`Running on port ${process.env.PORT || 3001}`);
//         });
//     } catch (e) {
//         console.error('Error connecting to the database', e);
//     }
// }

// export default start;

// async function start() {
//     try {
//         await mongoose.connect(
//             `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.pbuqiqy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
//         )

//         app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
//     } catch (error) {
//         console.log(error)
//     }
// }
// start()