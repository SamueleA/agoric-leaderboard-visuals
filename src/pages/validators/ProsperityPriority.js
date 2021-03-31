import React, {useState, useEffect} from "react";
import ChartComponent, {Bar, Line, Pie, Radar} from "react-chartjs-2";
import axios from "axios";

const ProsperityPriority = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let value = [];
        let key = [];
        let combinedArray = []
        let newCombinedArray = []


        axios
            .get("https://api.testnet.agoric.aneka.io/validators")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.data.validators) {
                    combinedArray.push(
                        {
                            value: (dataObj.proposer_priority),
                            key: (dataObj.description.moniker)
                        }
                    )
                    //sorting in descending order
                    combinedArray.sort((a, b) => (a.value < b.value) ? 1 : -1)
                    newCombinedArray = combinedArray.slice(0, 10)
                }

                for (const dataObj of newCombinedArray) {
                    value.push((dataObj.value));
                    key.push((dataObj.key));
                }
                console.log("combined array:", newCombinedArray)
                setChartData({

                    labels: key,
                    datasets: [
                        {
                            label: "Amount of uagstake",
                            data: value,
                            backgroundColor: 'rgba(144,238,144,0.5)',
                            pointHitRadius: 10,
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
                <Radar
                    data={chartData}
                    options={{
                        responsive: true,
                        title: {text: "Top 10 Validators by Prosperity Priority for Next Round of Consensus", fontSize: 25, display: true},
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

export default ProsperityPriority;
