import React, { useState } from 'react'
import {
  LineChart,
  ZoomAndPan,
  Line,
  Legend,
  XAxis,
  Brush,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useEffect } from 'react'
import getMocks from '../src/services/getMocks'

const ExampleLineas = props => {
  const [datos, dataSet] = useState([])

  /*async function anyNameFunction() {
    let resp = await getMocks()
    dataSet(resp)
    console.log(resp)
  }
  */

  useEffect(() => {
    dataSet(props.datos)
  }, [props])

  return (
    <div className="mt-4">
      <h2 className="text-warning"> en Lines...</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={datos}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis tick={{}} dataKey="name" />
          <YAxis tick={{}} domain={[0, 'dataMax + 100']} />

          <Tooltip
            contentStyle={{ backgroundColor: '#404040', color: '#fff' }}
            cursor={false}
            itemStyle={{ color: '#fff' }}
          />

          <Brush height={25}></Brush>

          <Line type="monotone" dataKey="height" stroke="#8884d8" activeDot={{ r: 8 }} animationDuration={300} />
          <Line type="monotone" dataKey="mass" stroke="#82ca9d" animationDuration={300} />
          <Legend verticalAlign="bottom" height={5} align="center" chartHeight={25} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
export default ExampleLineas
