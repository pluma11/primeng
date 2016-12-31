import {Injectable} from '@angular/core';
import {Http, Response,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Page} from "../domain/Page";
import {Usuario} from "../domain/Usuario";
import {Filtro} from "../domain/Filtro";



@Injectable()
export class UsuarioService {


    private http:Http;
    private urlBase:string='http://localhost:8080/api/usuario';
    private headers:Headers = new Headers({ 'Content-Type': 'application/json' });


    constructor( http:Http) {
        this.http = http;
        console.log("Api Injected");
    }

    getUsers(page:number,size:number,sortField:string,sortOrder:number,filters:Filtro[]):Promise<Page<Usuario>> {
        var params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('size', size.toString());
        if(sortField){
           sortField=sortField+((sortOrder==1)?',asc':',desc');
        params.set('sort', sortField);
        }
        if(filters && filters.length>0){
            filters.forEach((filtro:Filtro) =>{
                if(filtro.value != ''){
                params.set(filtro.key, filtro.value);
                }
            })
        }

        let options = new RequestOptions({ search: params });

        return this.http.get(`${this.urlBase}/findAll`,options)
            .map((response) =>{return response.json()})
            .catch(this.handleError)
            .toPromise();
    }

    getUser(id:number):Promise<Usuario> {
        return this.http.get(`${this.urlBase}/${id}`)
            .map((response) => {return response.json()})
            .catch(this.handleError)
            .toPromise();
    }

    deleteUser(id:number):Promise<Usuario> {
        return this.http.delete(`${this.urlBase}/delete/${id}`)
            .map((response) => {return response.json()})
            .catch(this.handleError)
            .toPromise();
    }

    guardar(usuario:Usuario):Promise<Usuario> {
        let body = JSON.stringify(usuario);
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(`${this.urlBase}/save`,body,options)
            .map((response) => {return response.json()})
            .catch(this.handleError)
            .toPromise();
    }

    update(usuario:Usuario):Promise<Usuario> {
        let body = JSON.stringify(usuario);
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(`${this.urlBase}/update`,body,options)
            .map((response) => {return response.json()})
            .catch(this.handleError)
            .toPromise();
    }


    private handleError (error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }
}