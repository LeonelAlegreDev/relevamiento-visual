import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userCollection;

    constructor(){
        console.log('User service initialized');
    }

    ngOnInit() {
        console.log('User service onInit');
    }
    getUsers(){
        console.log('Getting users...');
    }
};
