import React, {useState, useEffect} from "react";
import ChartComponent, {Bar, Doughnut, Line, Pie} from "react-chartjs-2";
import axios from "axios";

const VotingPower = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let value = [];
        let key = [];
        let combinedArray = []
        let newCombinedArray = []



        axios
            .get("http://139.59.67.100:1317/validatorsets/latest")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.result.validators) {
                    combinedArray.push(
                        {
                            value: (dataObj.voting_power),
                            key: (dataObj.address)
                        }
                    )
                    //sorting in descending order
                    // combinedArray.sort((a, b) => (a.value < b.value) ? 1 : -1)
                    // newCombinedArray = combinedArray.slice(0, 10)
                }
                //
                combinedArray = combinedArray.sort(function (a, b) {
                    return a.value - b.value})
                newCombinedArray = combinedArray.slice(0, 10)

                for (const dataObj of newCombinedArray) {
                    value.push((dataObj.value));
                    key.push((dataObj.key));
                }
                console.log("combined array:", newCombinedArray)
                setChartData({

                    labels: key,
                    datasets: [
                        {
                            label: "Voting Power",
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
                <Doughnut
                    data={chartData}
                    options={{
                        responsive: true,
                        title: {text: "Top 10 Validators by Voting Power", fontSize: 25, display: true},
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

export default VotingPower;
