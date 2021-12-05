import { useRouter } from 'next/router'
import dbConnect from '../../../../lib/dbConnect';
import Head from 'next/head'
import { useEffect } from 'react';
import Topbar from '../../../../components/Topbar/Topbar';
import Layout from '../../../../components/Layout/Layout';
import poemas from '../../../../models/modes'
import { mediasQuerys } from '../../../../utils/mediasquerys'
import Themes from '../../../../components/Themes/Themes';

const Text = ({modes}) => {
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
      </Head>
            <Topbar title="¡CREÁ TU POEMA DADAISTA!"/>
            <Layout allWords={modes} />
            <Themes />
        </>
    )
}

export default Text

export async function getServerSideProps ({params}) {
    try {
        await dbConnect()
        const result = await poemas.find({poema: params.id})
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