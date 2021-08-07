import axios from 'axios';
import {Api} from './Api'

export class ApiHelper{
    private static apiHelper: ApiHelper
    
    public static getInstance(){
        if(!this.apiHelper){
            this.apiHelper = new ApiHelper();
        }
        return this.apiHelper;
    }

    private async getRequest(api: string, params={}){
        let res = await axios.get(api, params)
        return res;
    }

    public getStudentList(){
        return this.getRequest(Api.student)
    }
}