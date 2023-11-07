import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { getActiveStatus } from "../api/scholarship";




export default function PieChart() {
    const [open, setOpen] = useState(0);
    const [total, setTotal] = useState(0);
    const closed = total - open;

    const fetchTickets = async () => {
        const {error, data} = await getActiveStatus();
        if (error) return console.log("error", error);

        
        setOpen(data.activeScholarships);
       
        setTotal(data.totalScholarships);
    }

    useEffect( () => {
        fetchTickets();
    }
    , [])

    const data = [
        ["Task", "Hours per Day"],
        ["Open", open],
        ["Closed", closed],
        
      ];

    const options = {
        legend: "none",
        pieStartAngle: -45,
        colors: ["#94c045", "#0063aa"],
        // title: "Open & Closed Tickets",
        is3D: true,
        animation:{
            duration: 2000,
            easing: 'inAndOut',
            startup: true,
          },
      };
    return (

<Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
      
    />

    )
}
