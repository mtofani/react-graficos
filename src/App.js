import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ExampleLineas from './ExampleLineas'
import NavBar from './NavBar'
import EjemploBar from './EjemploBar'
import getMocks from '../src/services/getMocks'
import LineaZoom from './LineaZoom'
import schema from './schema.json'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootTable from './BootTable'
import Table from './Table'
import './App.css'

import BeatLoader from 'react-spinners/BeatLoader'

const mocks = [
  { name: 1, cost: 2500.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 300.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 5500.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222 },
  { name: 11, cost: 6000.3, impression: 210 },
  { name: 12, cost: 8500.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 24500, impression: 400 },
  { name: 17, cost: 25553, impression: 200 },
  { name: 18, cost: 26666, impression: 50 },
  { name: 19, cost: 26666, impression: 100 },
  { name: 20, cost: 29000, impression: 100 },
]
const App = () => {
  const [datos, dataSet] = useState([])
  let [loading, setLoading] = useState(false)
  let [color, setColor] = useState('#16E0E0')
  const [checked, setChecked] = useState(localStorage.getItem('theme') === 'dark' ? true : false)

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem('theme', 'dark')
      setChecked(true)
    } else {
      localStorage.setItem('theme', 'light')
      setChecked(false)
    }
  }

  async function anyNameFunction() {
    let resp = await getMocks()
    dataSet(resp)
    console.log(resp)
  }

  useEffect(() => {
    dataSet(datos)
    anyNameFunction()
    console.log('TRAJE API')
    document.getElementsByTagName('HTML')[0].setAttribute('data-theme', localStorage.getItem('theme'))
  }, [checked])

  async function handleSubmit(e) {
    dataSet([])
    setLoading(!loading)
    let resp = await getMocks()
    dataSet(resp)
    setTimeout(() => {
      console.log(resp)

      if (datos) setLoading(false)
    }, 1000)
  }

  const col_acciones = [
    {
      dataField: 'cost',
      text: ' cost',
      sort: true,
    },
    {
      dataField: 'impression',
      text: 'imp',
      sort: true,
    },
  ]

  return (
    <div className="container-fluid p-3 mb-2 App">
      <div className="sweet-loading d-flex justify-content-center ">
        <BeatLoader color={color} loading={loading} size={60} />
      </div>

      <div className="d-flex justify-content-end">
        <h4 className="px-2"> Cambia el tema!</h4>
        <label className="switch">
          <input type="checkbox" defaultChecked={checked} onChange={() => toggleThemeChange()} />
          <span className="slider round" />
        </label>
      </div>

      <div className="d-flex justify-content-center">
        <button type="button" class="btn btn-outline-success btn-lg" onClick={handleSubmit}>
          Traer Info
        </button>
      </div>

      <div className="row mt-4">
        <div className="col-sm-6 col-md-6 shadow-sm p-3 mb-5  rounded ">
          <ExampleLineas datos={datos}></ExampleLineas>
        </div>
        <div className="col-sm-6 col-md-6 shadow-sm p-3 mb-5  rounded ">
          <EjemploBar datos={datos}></EjemploBar>
        </div>
        {/* Segunda seccion */}
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg shadow-md p-3 mb-5  rounded ">
            <ExampleLineas datos={datos}></ExampleLineas>
            <LineaZoom datos={mocks}></LineaZoom>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/*  <Table headers={Object.keys(schema)} rows={datos} theme={checked} /> */}

            <BootTable datos={datos} theme={checked}></BootTable>
            <BootTable datos={mocks} theme={checked} col={col_acciones}></BootTable>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
