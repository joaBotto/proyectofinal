const server = require('./src/app');
const connectDb = require('./src/db')
const PORT = 3001;


const startServer = async () => {
    try {
      await connectDb();
      console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
      console.error('Error al conectar a MongoDB Atlas:', error);
    }
  
    server.listen(PORT, () => {
      console.log(`Listening at ${PORT}`);
    });
  };
  
  startServer();