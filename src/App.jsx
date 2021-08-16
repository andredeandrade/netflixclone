import React, { useEffect, useState } from 'react'
import './app.scss'
import Tmdb from './services/Tmdb'
import MovieRow from './components/movieRow/MovieRow'
import FeaturedMovie from './components/featuredMovie/FeaturedMovie'
import Header from './components/header/Header'
import Loading from './assets/loading.gif'

const App = () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  
  useEffect(() => {
    const loadAll = async () => {
      // get/set lista total de filmes
      let list = await Tmdb.getHomeList()
      setMovieList(list)
      
      // get/set filme destaque
      let originals = list.filter(item => item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix
      </footer>
        
      {movieList.length <= 0 &&
        <div className="loading">
          <img src={Loading} alt="Carregando..."/>
        </div>
      }
    </div>
  )
}

export default App
