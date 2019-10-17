import React, { Component } from "react";
import IAdvertisers from "../interfaces/IAdvertisers";
import IAdvertiserRow from "../interfaces/IAdvertiserRow";
import AdvertiserService from "../services/AdvertiserService";

interface IAdvertisersState {
  isLoading: boolean;
  hasError: boolean;
  advertisers: IAdvertisers;
}

export class Advertisers extends Component<{}, IAdvertisersState> {
  private AdvertiserService: AdvertiserService;
  private dafaultErrorMessage: string = "Could not load advertisers";
  private dafaultLoadingMessage: string = "Loading...";

  constructor() {
    super({});
    this.state = {
      isLoading: true,
      hasError: false,
      advertisers: { advertiserRows: [] }
    };

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
      data => {
        if (
          data.response.statusCode === 200 ||
          data.response.statusCode === 204
        ) {
          this.setState({
            isLoading: false,
            hasError: false,
            advertisers: { advertiserRows: JSON.parse(data.body) }
          });
        } else {
          this.setState({
            isLoading: false,
            hasError: true,
            advertisers: { advertiserRows: [] }
          });
        }
      },
      err => {
        this.setState({
          isLoading: false,
          hasError: true,
          advertisers: { advertiserRows: [] }
        });
      }
    );
  }

  private formatDate(dateString: string) {
    var options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString([], options);
  }

  render() {
    const loading = this.state.isLoading;
    const error = this.state.hasError;
    let loadingMessage;
    let errorMessage;

    if (loading === true) {
      loadingMessage = (
        <tr key="loadingMessage">
          <td>{this.dafaultLoadingMessage}</td>
          <td></td>
          <td></td>
        </tr>
      );
    } else {
      loadingMessage = "";
    }

    if (error === true) {
      errorMessage = (
        <tr key="errorMessage">
          <td>
            {this.dafaultErrorMessage}{" "}
            <i className="material-icons">sentiment_very_dissatisfied</i>{" "}
          </td>
          <td></td>
          <td></td>
        </tr>
      );
    } else {
      errorMessage = "";
    }

    let advertiserHtml = this.state.advertisers.advertiserRows.map(
      (x: IAdvertiserRow) => {
        return (
          <tr key={x.id}>
            <td style={{ borderTop: "solid 1px #666666" }}>{x.name}</td>
            <td style={{ borderTop: "solid 1px #666666" }}>
              {this.formatDate(x.createdAt)}
            </td>
            <td style={{ paddingLeft: "55px", borderTop: "solid 1px #666666" }}>
              {x.campaignIds.length}
            </td>
          </tr>
        );
      }
    );

    const completeOverview = {
      color: "#999999",
      fontSize: "14px",
      marginTop: "24px"
    };

    const blockCSS = {
      fontFamily: "Roboto script=all rev=1",
      background: "#222222",
      color: "#bfbfbf",
      border: "solid 1px #666666",
      paddingLeft: "20px",
      paddingRight: "20px"
    };

    const tableCSS = {
      marginTop: "24px",
      marginBottom: "35px",
      border: "solid 1px #666666",
      color: "#bfbfbf"
    };

    return (
      <div style={completeOverview}>
        <div className="container-fluid text-left">
          <div className="row">
            <div className="col-1">
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10 table-responsive" style={blockCSS}>
              <h2 style={{ marginTop: "30px" }}>Overview of Advertisers</h2>
              <hr style={blockCSS} />
              <table className="table" style={tableCSS}>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "30%",
                        borderTop: "solid 1px #666666",
                        borderBottom: "solid 1px #666666"
                      }}
                    >
                      ADVERTUSER
                    </th>
                    <th
                      style={{
                        width: "20%",
                        borderTop: "solid 1px #666666",
                        borderBottom: "solid 1px #666666"
                      }}
                    >
                      CREATION DATE
                    </th>
                    <th
                      style={{
                        width: "50%",
                        borderTop: "solid 1px #666666",
                        borderBottom: "solid 1px #666666"
                      }}
                    >
                      # CAMPAIGNS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {advertiserHtml}
                  {loadingMessage}
                  {errorMessage}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Advertisers;
