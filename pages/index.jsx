import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Homepage.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import logo from '../public/images/logo.png'
import Themes from '../components/Themes/Themes'

const texts = [{
  title: '¡Creá tu poema dadaísta!', 
  text: 'Poemas dadaistas online es un juego solitario o multijugador en el cual crearás un poema a partir de las palabras que el "azar" te provea.'},{
  title:'Instrucciones de juego',
  text: 'Puedes optar por la opción juego rápido o por la opción de modos donde las palabras vendrán de textos de autores especificos. Por ejemplo en el modo cortazar, las palabras provienen de textos de dicho autor. Tambien puedes crear tus propios modos a partir de los textos que elijas y guardarlos en tu cuenta privada o darles acceso publico para que cualquier usuario pueda usarlo.'},{
  title: '¿Qué es el dadaismo?',
  text: 'El dadaísmo busca renovar la expresión mediante el empleo de materiales inusuales o manejando planos de pensamientos antes no mezclables. Es un movimiento antiartístico, antiliterario y antipoético porque cuestiona la existencia del arte, la literatura y la poesía. De hecho, por definición, cuestiona el propio dadaísmo.'},{
  title: 'Cómo hacer un poema dadaísta por Tristan Tzara',
  text: 'Para hacer un poema dadaísta coge un periódico, unas tijeras, y escoge un artículo de longitud similar al poema que quieras hacer. Recorta el artículo. Después recorta todas las palabras que lo conforman e introdúcelas en una bolsa. Agítala suavemente. A continuación coge cada una de ellas y colócalas una tras otra en el mismo orden en el que salieron de la bolsa. Copíalas concienzudamente. El poema te definirá como eres. '
  }
]

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  //document.body.style.zoom = 1;
  const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : texts.length-1);
      } else {
        setSlideIndex(slideIndex < texts.length-1 ? slideIndex + 1 : 0);
      }
    };
  useEffect(() => {
      document.body.style.zoom = 1;
  }, [])

  return (
    <>
      <Head>     
        <title>¡Creá tu poema dadaísta! | CreaPoemasdadaistas</title>
        <meta name='description' content='CreaPoemasdadaistas es un juego solitario o multijugador en el cual crearás un poema a partir de las palabras que el "azar" te provea.' />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={styles.homepage__container}>
            <div className={styles.homepage__left}>
                <div className={styles.homepage__buttonscontainer}>
            <Link href='/play/random'>
              <a className='animate-pulse'>
                <div className={styles.homepage__button1}>Juego rápido</div>
              </a>
            </Link>
            <Link href='/modes'>
              <a className='animate-pulse'>
                <div className={styles.homepage__button2}>Juego con modos</div>
             </a>
            </Link>
            </div>
            </div>
        <div className={styles.homepage__right}>
            <Image className={styles.homepage__logo} src={logo} width={295}></Image>
            <div className={styles.homepage__textcontainer}>
            <div className={styles.homepage__slider}>
            <div className={styles.homepage__guidebuttonswrapper}>
            {texts.map((p, indice) => (
                <div className={styles.homepage__GuideButton} key={'guidebutton'+indice} style={{opacity: `${slideIndex === indice ? '1' : '.5'}`}}></div>))}
            </div>
            <div className={styles.homepage_carousel}>
                {texts.map((p, indice) => (
                    <div key={'text'+indice} style={{display: `${slideIndex === indice ? 'block': 'none'}`}}>
                    <h1 className={styles.homepage__title}>{p.title}</h1>
                    <p className={styles.homepage__text}>{p.text}</p>
                    </div>
                 ))}
            </div>
            <div className={styles.homepage__buttonLeftContainer}>
                <div className={styles.homepage__buttonLeft} onClick={() => handleClick("left")}></div>
            </div>
            <div className={styles.homepage__buttonRightContainer}>
                <div className={styles.homepage__buttonRight} onClick={() => handleClick("right")}></div>
            </div>
        </div>
            </div>
        </div>
        </div>
        <Themes />
    </>
  )
}
