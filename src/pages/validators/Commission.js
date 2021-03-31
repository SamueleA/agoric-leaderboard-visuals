import React, {useState, useEffect} from "react";
import ChartComponent, {Bar, Line, Pie, Polar, Radar} from "react-chartjs-2";
import axios from "axios";

const Commission = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let commission = [];
        let moniker = [];
        let combinedArray = []
        let newCombinedArray = []


        axios
            .get("http://139.59.67.100:1317/cosmos/staking/v1beta1/validators")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.validators) {
                    combinedArray.push(
                        {
                            commission: (dataObj.commission.commission_rates.rate),
                            moniker: (dataObj.description.moniker)
                        }
                    )
                    //sorting in ascending order
                    // combinedArray.sort((a, b) => (a.commission > b.commission) ? 1 : -1)
                    // newCombinedArray = combinedArray.slice(0, 10)
                }

                combinedArray = combinedArray.sort(function (a, b) {
                    return a.commission - b.commission})
                newCombinedArray = combinedArray.slice(0, 10)

                for (const dataObj of newCombinedArray) {
                    commission.push((dataObj.commission));
                    moniker.push((dataObj.moniker));
                }
                console.log("combined array:", newCombinedArray)
                setChartData({

                    labels: moniker,
                    datasets: [
                        {
                            label: "Amount of uagstake",
                            data: commission,
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(0, 255, 0)', 'rgb(204, 153, 255)', 'hsl(210, 100%, 65%)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 255)', 'rgb(90, 129, 255)', 'rgb(92, 214, 214)', 'rgb(255, 184, 77)'],

                            borderWidth: 4,
                        }
                    ]
                });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(commission, moniker);
    };

    useEffect(() => {
        chart();
    }, []);
    return (
        <div className="App">
            <div>
                <Polar
                    data={chartData}
                    options={{
                        responsive: true,
                        title: {text: "Top 10 Validators by Least Commission Cut", fontSize: 25, display: true},
                        // scales: {
                        //     yAxes: [
                        //         {
                        //             ticks: {
                        //                 autoSkip: true,
                        //                 maxTicksLimit: 10,
                        //                 beginAtZero: true
                        //             },
                        //             gridLines: {
                        //                 display: true
                        //             }
                        //         }
                        //     ],
                        //     xAxes: [
                        //         {
                        //             ticks: {
                        //                 autoSkip: true,
                        //                 tickLength: 30,
                        //                 maxTicksLimit: 10,
                        //                 beginAtZero: true
                        //             },
                        //             gridLines: {
                        //                 display: true
                        //             }
                        //         },
                        //
                        //     ]
                        // },
                        layout: {
                            padding: {
                                left: 300,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Commission;
