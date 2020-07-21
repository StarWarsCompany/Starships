import React, {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import './starships.css'
import Spinner from 'react-bootstrap/Spinner'
import StarshipCard from '../starshipCard/starshipCard'

const Starships = () => {
  const [starshipList, setStarshipList] = useState(null)

  const [selectedStarship, setSelectedStarship] = useState({
    url: null,
    shipName: '',
  })

  const [showSpinner, setShowSpinner] = useState(false)
  // const [starshipImg, setStarshipImg] = useState(null)

  useEffect(() => {
    setShowSpinner(true)
    axios('https://swapi.dev/api/starships/').then((ships) => {
      setStarshipList(ships.data.results)
      setShowSpinner(false)
    })
  }, [])

  const extractId = (url) => {
    const idRegExp = /\/([0-9]*)\/$/
    return url.match(idRegExp)[1]
  }

  //if (starshipList) console.log(starshipList.url)

  const _imageBase = 'https://starwars-visualguide.com/assets/img'

  const handleStarshipImg = (event, ship) => {
    event.preventDefault()
    const num = extractId(ship.url)
    const url = _imageBase + '/starships/' + num + '.jpg'

    setSelectedStarship({url: url, shipName: ship.name, fullInfo: ship})
  }

  return (
    <Fragment>
      {showSpinner && <Spinner animation="border" variant="light" />}
      {starshipList && (
        <div className="main">
          <div className="caption">Starships</div>
          {starshipList.map((ship) => (
            <div key={ship.name} className="Starships">
              <a
                href="#"
                className="value"
                onClick={(event) => handleStarshipImg(event, ship)}
              >
                {ship.name}
              </a>
              <div className="StarshipCard">
                {selectedStarship &&
                  selectedStarship.shipName === ship.name && (
                    <StarshipCard
                      url={selectedStarship.url}
                      selectedShip={selectedStarship}
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  )
}

export default Starships
