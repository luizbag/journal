import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

  constructor() { }

  getUser(): Observable<User> {
  	return of({ id: 1,
  		email: 'luizbag@gmail.com',
  		password: '1234',
  		name: 'Luiz Gavioli'
  		});
  }

}
