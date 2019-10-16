import React, { Component } from 'react'
import AdvertisersModel from '../interfaces/AdvertisersModel.interface'
import AdvertiserRow from '../interfaces/AdvertiserRow.interface'

export class Advertisers extends Component<AdvertisersModel> {
    render() {
        return (
        <table>
            <thead>
                <tr><th>Name</th><th>Creation date</th><th># of campaigns</th></tr>
            </thead>
            <tbody>
                { this.props.advertiserRows.map((x: AdvertiserRow) => <tr key={x.id}><td>{x.name}</td><td>{x.numberCampaigns}</td><td>{x.createdAt}</td></tr>) }
            </tbody>
        </table>
        )
    }
}

export default Advertisers