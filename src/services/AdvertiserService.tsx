import { Component } from "react";
import {RxHR, RxHttpRequestResponse} from "@akanass/rx-http-request";
import { Observable } from "rxjs";

export class AdvertiserService extends Component {

    getAdvertisers(): Observable<RxHttpRequestResponse<string>> {
        return RxHR.get<string>('https://5b87a97d35589600143c1424.mockapi.io/api/v1/advertiserssss');
    }

    getAdvertiserStatistics(): Observable<RxHttpRequestResponse<string>> {
        return RxHR.get<string>('https://5b87a97d35589600143c1424.mockapi.io/api/v1/advertiser-statistics');
    }

}

export default AdvertiserService