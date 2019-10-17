import React, { Component } from 'react'
import IAdvertisers from '../interfaces/IAdvertisers'
import IAdvertiserRow from '../interfaces/IAdvertiserRow'
import Spinner from 'react-spinner-material';
import AdvertiserService from '../services/AdvertiserService';

interface IAdvertisersState {
    isLoading: boolean,
    hasError: boolean,
    advertisers: IAdvertisers
}

export class Advertisers extends Component<{}, IAdvertisersState> {
    
    private AdvertiserService: AdvertiserService;
    private dafaultErrorMessage: string = "Could not load data "
    private errorMessage: string = ""

    constructor() {
        super({})
        this.state = {
            isLoading: true,
            hasError: false,
            advertisers: { advertiserRows: [] }
        }

        this.AdvertiserService = new AdvertiserService({});
    }

    componentDidMount() {
        this.startLoading();
    }

    private startLoading() {
        this.setState({
            isLoading: true,
            hasError: false,
            advertisers: { advertiserRows: [] }
        });

        this.AdvertiserService.getAdvertisers().subscribe(
            (data) => {
                if (data.response.statusCode === 200 || 
                    data.response.statusCode === 204) {
                    this.setState({
                        isLoading: false,
                        hasError: false,
                        advertisers: { advertiserRows: JSON.parse(data.body) }
                    });
                } else {
                    this.errorMessage = data.response.statusMessage
                    this.setState({
                        isLoading: false,
                        hasError: true,
                        advertisers: { advertiserRows: [] }
                    });    
                }
            },
            (err) => {
                this.errorMessage = err;
                this.setState({
                    isLoading: false,
                    hasError: true,
                    advertisers: { advertiserRows: [] }
                });
            }
        );
    }

    private formatDate(dateString: string){
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString([],options);
    }

    render() {
        const loading = this.state.isLoading;
        const error = this.state.hasError;
        let spinner;
        let errorMessage;

        if (loading === true) {
            spinner = <div className="row"><div className="col-2 offset-md-5"><Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} /></div></div>
        } else {
            spinner = <div className="row"><div className="col-2 offset-md-5"><Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={false} /></div></div>
        }

        if (error === true) {
            errorMessage = <tr key="errorMessage"><td>{this.dafaultErrorMessage} <i className='material-icons'>sentiment_very_dissatisfied</i> (Statuscode: {this.errorMessage})</td><td></td><td></td></tr>
        }

        let advertiserHtml = this.state.advertisers.advertiserRows.map((x: IAdvertiserRow) => {
            return <tr key={x.id}><td>{x.name}</td><td>{this.formatDate(x.createdAt)}</td><td>{x.campaignIds.length}</td></tr>
        });

        return (
            <div className="container-fluid text-left">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10 table-responsive">
                        <h2>Overview of advertisers</h2>
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr><th>Name</th><th>Creation date</th><th># of campaigns</th></tr>
                            </thead>
                            <tbody>
                                { advertiserHtml }
                                { errorMessage }
                            </tbody>
                        </table>
                    </div>
                </div>
                { spinner }
                
            </div>
        )
    }
}

export default Advertisers