const http=require('http');
const app=require('./app');
const server=http.createServer(app);
const port=process.env.PORT||3000;
server.listen(port,()=>{

    console.log(`server is running on port ${port}`);
});
// const app = require('./app');
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
