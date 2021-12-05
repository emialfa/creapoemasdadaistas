import { useEffect, useState } from 'react'
import dbConnect from '../lib/dbConnect'
import poemas from '../models/modes'
import Head from 'next/head'
import styles from '../styles/Modespage.module.css'
import Topbar from '../components/Topbar/Topbar'
import Link from 'next/link'
import Image from 'next/image'
import enter from '../public/images/enter.svg'
import Themes from '../components/Themes/Themes'

const Modes = ({modes}) => {
    const [modesText, setModesText] = useState([])
    const [modesAutor, setModesAutor] = useState([])
    useEffect(() => {
            document.body.style.zoom = 1;
            const arr = []
            Array.isArray(modes) && modes.map((e, indice) => indice === 0 || !arr.find(a => a==e.autor) ? arr.push(e.autor) : '')
            setModesAutor(arr)
            setModesText(modes)
    }, [])
    return (
        <>
        <Head>
            <title>¡Elige un modo! | CreaPoemasdadaistas</title>
            <meta name='description' content='CreaPoemasdadaistas es un juego solitario o multijugador en el cual crearás un poema a partir de las palabras que el "azar" te provea.' />
            <link 
                href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" 
                rel="stylesheet" 
            />
        </Head>
        <Topbar title="¡ELIGE UN MODO!" />
        <div className={styles.modespage__container}>
        {modesAutor.map(m => 
            <Link  key={'autor'+m}href={'/play/autor/' + m}>
            <a>
            <div className={styles.modespage__modecontainer}>
                <div className={styles.modespage__modetopbar}>{m}</div>  
                <div className={styles.modespage__modebody}>
                    <div className={styles.modespage__modebody_wrappertext} style={{marginTop: '2rem'}}>
                        <div>Autor:</div>
                        <div className={styles.modespage__modebody_text}>{m}</div>
                    </div>
                    <div className={styles.modespage__modebody_wrappertext}>
                        <div>Texto:</div>
                        <div  className={styles.modespage__modebody_text}>Varios</div>
                    </div>           
                    <div className={styles.modespage__modeenter}><Image className={styles.modespage__modeenter} src={enter} /></div></div>
                </div>  
            </a>
            </Link>
            )}
            {modes.map(m => 
            <Link key={'poema'+m.poema} href={'/play/text/' + m.poema}>
            <a>
            <div className={styles.modespage__modecontainer}>
                <div className={styles.modespage__modetopbar}>{m.autor}</div>  
                <div className={styles.modespage__modebody}>
                    <div className={styles.modespage__modebody_wrappertext} style={{marginTop: '2rem'}}>
                        <div>Autor:</div>
                        <div className={styles.modespage__modebody_text}>{m.autor}</div>
                    </div>
                    <div className={styles.modespage__modebody_wrappertext}>
                        <div>Texto:</div>
                        <div className={styles.modespage__modebody_text}>{m.poema}</div>
                    </div>
                <div className={styles.modespage__modeenter}><Image src={enter} /></div></div>
                </div>  
            </a>
            </Link>
            )}
            <Link href='/play/random' >
            <a>
             <div className={styles.modespage__modecontainer}>
                <div className={styles.modespage__modetopbar}>Random</div>  
                <div className={styles.modespage__modebody}>
                    <div className={styles.modespage__modebody_wrappertext} style={{marginTop: '2rem'}}>
                        <div>Autor:</div>
                        <div className={styles.modespage__modebody_text}>Random</div>
                    </div>
                    <div className={styles.modespage__modebody_wrappertext}>
                        <div>Texto:</div>
                        <div className={styles.modespage__modebody_text}>Random</div>
                    </div>                   
                    <div className={styles.modespage__modeenter}><Image className={styles.modespage__modeenter} src={enter} width={10} /></div></div>
                </div>  
            </a>
            </Link>
        </div>
        <Themes />
        </>
    )
}

export default Modes

export async function getServerSideProps() {
    try {
      await dbConnect();
      const result = await poemas.find().select('autor poema');
      const modes = result.map((doc) => {
        const mode = doc.toObject();
        mode._id = mode._id.toString();
        return mode;
      });
      return { props: { modes } };
    } catch (error) {
      console.log(error);
    }
  }