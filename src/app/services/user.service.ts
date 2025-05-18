import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/i-user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userCollection: IUser[] = [
        { id: '1', email: 'admin@admin.com', password: "111111", role: 'admin', sex: 'femenino' },
        { id: '2', email: 'invitado@invitado.com', password: "222222", role: 'invitado', sex: 'femenino' },
        { id: '3', email: 'usuario@usuario.com', password: "333333", role: 'usuario', sex: 'masculino' },
        { id: '4', email: 'anonimo@anonimo.com', password: "444444", role: 'usuario', sex: 'masculino' },
        { id: '5', email: 'tester@tester.com', password: "555555", role: 'tester', sex: 'femenino' }
    ]
    protected user: IUser | null = null;

    constructor(){
        console.log('User service initialized');
    }

    ngOnInit() {
        console.log('User service onInit');
    }
    getUser(){
        return this.user;
    }
    login(email: string, password: string): IUser {
        const user = this.userCollection.find(user => user.email === email && user.password === password);
        if (user) {
            this.user = user;
            return user;
        } else {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }
    }
};
