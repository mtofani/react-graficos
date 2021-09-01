import BootstrapTable from 'react-bootstrap-table-next'

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import { ToolkitProvide, CSVExport, ColumnToggle } from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory from 'react-bootstrap-table2-editor'

const { ExportCSVButton } = CSVExport

const columns = [
  {
    dataField: 'name',
    text: ' Name',
    sort: true,
    filter: textFilter({ placeholder: 'Filtra aqui!' }),
  },
  {
    dataField: 'height',
    text: 'Altura',
    sort: true,
  },
]
const selectRow = {
  mode: 'radio',

  clickToSelect: true,
}
const cellEdit = cellEditFactory({
  mode: 'click',
})

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(row, rowIndex)
  },
}

const BootTable = props => {
  let styleTable = props.theme ? 'table table-striped table-hover table-dark' : 'table table-striped table-hover'

  return (
    <div>
      <BootstrapTable
        bootstrap4
        cellEdit={cellEdit}
        keyField="name"
        data={props.datos}
        classes={styleTable}
        columns={columns}
        filter={filterFactory({})}
        selectRow={selectRow}
        rowEvents={rowEvents}
        pagination={paginationFactory({ showTotal: true, sizePerPage: 10 })}
      />
    </div>
  )
}
export default BootTable
