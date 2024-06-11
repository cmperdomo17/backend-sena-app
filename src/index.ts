import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config'
import { isAdmin, isTeacher, isUser } from './midleware';
import { DB_PORT } from './config';
import programsRoutes from './routes/programsRoutes';
import ambientsRoutes from './routes/ambientsRoutes';
import teachersRoutes from './routes/teachersRoutes';
import periodsRoutes from './routes/periodsRoutes';
import competenceRoutes from './routes/competenceRoutes';
import userRoutes from './routes/userRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import userTeacherRoutes from './routes/userTeacherRoutes';

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://frontend-sena-app.vercel.app';

class Server{

    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', DB_PORT);
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: FRONTEND_URL,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type, X-Auth-Token, Origin, Authorization',
            credentials: true,
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }   

    routes(): void {
        this.app.use('/api/programs',isAdmin,programsRoutes);
        this.app.use('/api/ambients',isAdmin,ambientsRoutes);
        this.app.use('/api/teachers',isAdmin,teachersRoutes);
        this.app.use('/api/periods',isAdmin,periodsRoutes);
        this.app.use('/api/competencies',isAdmin,competenceRoutes);
        this.app.use('/api/schedules',isAdmin,scheduleRoutes);
        this.app.use('/login',isUser, userRoutes);
        this.app.use('/api/userTeacher',isTeacher,userTeacherRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port', DB_PORT)
        });
    }
}

const server = new Server();
server.start();