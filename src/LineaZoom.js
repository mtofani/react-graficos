import React, { PureComponent } from 'react'
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts'

const getAxisYDomain = (from, to, ref, offset, data) => {
  console.log(from, to, ref, offset)
  console.log(data)
  //TRAER POSICIONES DEL ARRAY PARA X
  /*
  from = data.findIndex(x => x.name === from)
  to = data.findIndex(x => x.name === to)

  console.log('FROM', from)
  console.log('TO', to)
  if (from > to) {
    const aux = from
    from = to
    to = aux
  }
  const refData = data.slice(from, to + 1)
*/
  // ORIGINAL
  const refData = data.slice(from - 1, to)
  console.log(refData)
  let [bottom, top] = [refData[0][ref], refData[0][ref]]
  refData.forEach(d => {
    if (d[ref] > top) top = d[ref]
    if (d[ref] < bottom) bottom = d[ref]
  })

  return [(bottom | 0) - offset, (top | 0) + offset, refData]
}

export default class LineaZoom extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/highlight-zomm-line-chart-v77bt'

  constructor(props) {
    super(props)

    const initialState = {
      data: props.datos,
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      animation: true,
    }
    this.state = initialState
  }

  componentWillReceiveProps(props) {
    const initialState = {
      data: props.datos,
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',

      animation: true,
    }
    this.state = initialState
  }
  zoom() {
    let { refAreaLeft, refAreaRight } = this.state
    const { data } = this.state

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }))
      return
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, '', 1, data)

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }))
  }

  zoomOut() {
    const { data } = this.state
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
    }))
  }

  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state

    return (
      <div className="highlight-bar-charts pt-auto mt-5" style={{ userSelect: 'none', width: '100%' }}>
        <h2 className="text-success">Stocks vs Cost</h2>
        <div className="d-flex justify-content-center mb-3">
          <button type="button" className="btn btn-outline-success btn-lg" onClick={this.zoomOut.bind(this)}>
            Zoom Out
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={200}
            height={200}
            data={data}
            onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid horizontal="true" vertical="" strokeDasharray="1 1" />
            <XAxis tick={{}} allowDataOverflow dataKey="name" domain={[left, right]} type="number" />
            <YAxis tick={{}} domain={[bottom, top]} type="number" yAxisId="1" />
            <Tooltip
              contentStyle={{ backgroundColor: '#404040', color: '#fff' }}
              cursor={false}
              itemStyle={{ color: '#fff' }}
            />
            <Line yAxisId="1" type="monotone" dataKey="cost" stroke="#8884d8" animationDuration={100} />
            <Legend verticalAlign="bottom" height={25} align="center" />)
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
