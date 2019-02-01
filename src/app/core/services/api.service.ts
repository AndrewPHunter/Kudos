import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
  private url: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  /**
   * @description Performs get request for specificied resource
   * @param resource uri of resource to fetch
   */
  public get<T>(resourceUri: string): Observable<T[] | T> {
    return this.httpClient.get<T[] | T>(`${this.url}/${resourceUri}`);
  }

  /**
   * @description performs post request to create resource
   * @param resourceUri uri of resource to create
   * @param resource resource to create
   */
  public create<T>(resourceUri: string, resource: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${resourceUri}`, resource);
  }
}
