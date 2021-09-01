import datos from './mock.json'

const getMocks = async () => {
  /*
  let url = 'https://swapi.dev/api/people/'
  let response = await fetch(url)
  response = await response.json()
  */
  let response = datos
  return response.results
}

export default getMocks
