import React, {useState, useEffect} from "react";
import ChartComponent, {Bar, Line, Pie, Polar, Radar} from "react-chartjs-2";
import axios from "axios";
import {FaChartPie} from "react-icons/all";

const NumberOfDelegations = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let value = [];
        let key = [];
        let combinedArray = []
        let newCombinedArray = []
        let axiosRequest = []
        let mp = {}

        axios
            .get("http://139.59.67.100:1317/cosmos/staking/v1beta1/validators")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.validators) {
                    mp[dataObj.operator_address] = dataObj.description.moniker
                }
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get("http://139.59.67.100:1317/cosmos/staking/v1beta1/validators")
            .then(async res => {
                for (const dataObj of res.data.validators) {
                    axiosRequest.push(`http://139.59.67.100:1317/cosmos/staking/v1beta1/validators/${dataObj.operator_address}/delegations`)
                }

                let delegatorArray = []

                await axios.all(axiosRequest.map(l => axios.get(l))).then(
                    axios.spread((...responses) => {
                            for (const dataObj of responses) {
                                let res = dataObj.config.url;
                                res = res.match(/agoricvaloper.*d/);
                                res = res[0];
                                res = res.substring(0, res.length - 2)
                                console.log("result", res)

                                if (dataObj.data.delegation_responses.length > 0) {
                                    delegatorArray.push(dataObj.data.delegation_responses[0].delegation.delegator_address)
                                    // combinedArray.push(
                                    //     {
                                    //         value: parseFloat(dataObj.data.commission.commission[0].amount).toFixed(2),
                                    //         key: mp[res]
                                    //     }
                                    // )
                                }
                            }


                            //sorting in descending order
                            combinedArray = combinedArray.sort(function (a, b) {
                                return b.value - a.value})
                        }

                    ))
                    .catch(errors => {
                        console.error(errors);
                    });

                let newAxiosRequest = []
                for (const dataObj of delegatorArray) {
                    newAxiosRequest.push(`http://139.59.67.100:1317/cosmos/staking/v1beta1/delegations/${dataObj}`)
                }
                await axios.all(newAxiosRequest.map(l => axios.get(l))).then(
                    axios.spread((...responses) => {
                            for (const dataObj of responses) {
                                let res = dataObj.config.url;
                                res = res.match(/agoric.*/);
                                res = res[0];
                                // res = res.substring(0, res.length - 6)
                                console.log("result", res)


                                    combinedArray.push(
                                        {
                                            value: (dataObj.data.delegation_responses.length),
                                            key: (res)
                                        }
                                    )


                            }
                            //sorting in descending order
                            combinedArray = combinedArray.sort(function (a, b) {
                                return b.value - a.value})
                        }

                    ))
                    .catch(errors => {
                        console.error(errors);
                    });
                newCombinedArray = combinedArray.slice(0, 10);
                console.log("temp", delegatorArray)



                for (const dataObj of newCombinedArray) {
                    value.push((dataObj.value));
                    key.push((dataObj.key));
                }
                console.log("combined array:", newCombinedArray)
                setChartData({
                    labels: key,
                    datasets: [
                        {
                            label: "Number Of Delegations",
                            data: value,
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(0, 255, 0)', 'rgb(204, 153, 255)', 'hsl(210, 100%, 65%)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 0, 255)', 'rgb(90, 129, 255)', 'rgb(92, 214, 214)', 'rgb(255, 184, 77)'],

                            borderWidth: 4,
                        }
                    ]
                });

            })
            .catch(err => {
                console.log(err);
            });


        console.log(value, key);
    };


    useEffect(() => {
        chart();
    }, []);
    return (
        <div className="App">
            <div>
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        title: {text: "Top 10 Delegators by Number Of Delegations", fontSize: 25, display: true},
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

export default NumberOfDelegations;
