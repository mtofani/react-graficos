import React, { useState, useEffect } from 'react'
import { BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, Legend, ResponsiveContainer } from 'recharts'

import getMocks from './services/getMocks'

const Radial = props => {
  const [datos, dataSet] = useState([])

  async function anyNameFunction() {
    dataSet(props.datos)
  }

  useEffect(() => {
    dataSet(props.datos)
  }, [props])

  return (
    <div className="mt-4">
      <h3> en Bars...</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={250} data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: '#404040', color: '#fff' }}
            cursor={false}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Bar dataKey="mass" fill="#8884d8" animationDuration={200} />
          <Bar dataKey="height" fill="#82ca9d" animationDuration={200} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Radial
