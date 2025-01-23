import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './user.router.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB:', error));

app.use('/api/users', userRouter);

app.listen(PORT, function () {
    console.log('Serveur lancé sur le port 5000');
})

// Execice 1:
// 1. Créer un schema pour l'utilisateur: 
// - email: string, required et unique
// - password: string, required
// - avatarURL: string

// 2. Créer le model a partir du schema

// 3. Créer un repository avec les methode:
// - findByEmail: Récupere l'utilisateur avec son email
// - create: Créer un utilisateur

// 4. Créer un routeur pour les utilisateur:
// - un controller sur la methode POST:
// - Verifier que l'email et le mot de passe sont dans le corps de la requete et qui ne soit pas vide
// - Récuperer l'utilisateur avec son email, si il existe retourner un erreur avec status 401
// - Hasher le mot de passer avec bcrypt
// - Enregistrer l'utilisateur dans la backend
