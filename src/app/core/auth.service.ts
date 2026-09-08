import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserView} from './models/user-view.model';
import {UserResp} from './models/user-resp.model';
import {environment} from '../environements/environement';
import {AuthenticateReq} from './models/authenticate-req.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private userSessionKey = "User";

  private authenticatedUser = signal<UserView | null>(null);
  readonly user = this.authenticatedUser.asReadonly();
  readonly isAuthenticated = computed(() => this.authenticatedUser() != null);

  constructor() {
    try {
      const storedUser = sessionStorage.getItem(this.userSessionKey);
      if(storedUser != null)
        this.authenticatedUser.set(JSON.parse(storedUser) as UserView);
    }catch (e){
      if (e instanceof SyntaxError) {
        sessionStorage.removeItem(this.userSessionKey);
      }
    }
  }

  login(email: string, password: string) {
    const authenticateReq: AuthenticateReq = { email: email, password: password };
    return this.http.post<UserResp>(`${environment.apiUrl}/login`, authenticateReq).pipe(tap((value) => {
        if (value.success)
        {
          this.authenticatedUser.set(value.user);
          this.putUserInSession();
        }
        else
          throw new Error('Invalid email or password');
      }
      )
    );
  }

  logout(){
    this.authenticatedUser.set(null);
    sessionStorage.removeItem(this.userSessionKey);
  }

  putUserInSession(){
    const jsonUser = JSON.stringify(this.user());
    sessionStorage.setItem(this.userSessionKey, jsonUser);
  }

}
