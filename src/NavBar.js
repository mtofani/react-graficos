import { useEffect } from 'react'
import getMocks from '../src/services/getMocks'

const NavBar = () => {
  return (
    <div>
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand"></a>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
