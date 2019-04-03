import {environment} from '../../environments/environment';

export class Constants {
  /*public static API_ENDPOINT='http://127.0.0.1:3000';
  public static USER='pfcti';
  public static PASSWORD=123;*/
  public static API_ENDPOINT=environment.API_ENDPOINT;
  public static USER=environment.USER;
  public static PASSWORD=environment.PASSWORD;
}