import React, { useState } from 'react'

const Table = props => {
  const { headers, rows, theme } = props
  let styleTable = theme ? 'table table-striped table-hover table-dark' : 'table table-striped table-hover'

  return (
    <div>
      <table className={styleTable}>
        <TableHeader headers={headers}></TableHeader>
        <TableBody headers={headers} rows={rows}></TableBody>
      </table>
    </div>
  )
}

const TableHeader = props => {
  const { headers } = props
  return (
    <thead className="thead-dark" key="header-1">
      <tr key="header-0">
        {headers &&
          headers.map((value, index) => {
            return (
              <th key={index}>
                <div>{value}</div>
              </th>
            )
          })}
      </tr>
    </thead>
  )
}

const TableBody = props => {
  const { headers, rows } = props

  function buildRow(row, headers) {
    return (
      <tr key={row.id}>
        {headers.map((value, index) => {
          return <td key={index}>{row[value]}</td>
        })}
      </tr>
    )
  }

  return (
    <tbody>
      {rows &&
        rows.map(value => {
          return buildRow(value, headers)
        })}
    </tbody>
  )
}

export default Table
