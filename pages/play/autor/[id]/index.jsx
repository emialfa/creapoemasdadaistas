import dbConnect from '../../../../lib/dbConnect';
import Head from 'next/head'
import { useEffect } from 'react';
import Topbar from '../../../../components/Topbar/Topbar';
import Layout from '../../../../components/Layout/Layout';
import poemas from '../../../../models/modes'
import { mediasQuerys } from '../../../../utils/mediasquerys'

const Autor = ({modes}) => {
    useEffect(() => {
        document.oncontextmenu = function(){return false}
        mediasQuerys()
    }, [])
    return (
        <>
        <Head>     
        <title>¡Creá tu poema dadaísta! | CreaPoemasdadaistas</title>
        <meta name='description' content='CreaPoemasdadaistas es un juego solitario o multijugador en el cual crearás un poema a partir de las palabras que el "azar" te provea.' />
        <link rel="icon" href="#" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" 
          rel="stylesheet" 
        />

      </Head>
            <Topbar title="¡CREÁ TU POEMA DADAISTA!"/>
            <Layout allWords={modes} />
        </>
    )
}

export default Autor

export async function getServerSideProps ({params}) {
    try {
        await dbConnect()
        const result = await poemas.find({autor: params.id})
        const modes = result.map((doc) => {
          const mode = doc.toObject();
          mode._id = mode._id.toString();
          return mode;
        });
        return {props: { modes }}
    } catch (error) {
        console.log(error)
    }
}