import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL;

const connect = async (tentativa = 1) => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Conectado')
    } catch (e) {
        console.log('Não consegui conectar no banco')
        setTimeout(() => connect(tentativa + 1), 3000 ** tentativa);
    }
}

connect();
