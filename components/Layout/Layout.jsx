import BlankSheet from '../Blanksheet/BlankSheet'
import WordsBag from '../WordsBag/WordsBag'
import styles from './layout.module.css'
import {useEffect, useState} from 'react'
import {enter, over, leave, drop} from '../../utils/draganddrop'

const Layout = ({allWords}) => {
    const [articulos, setArticulos] = useState([])
    const [sustantivos, setSustantivos] = useState([])
    const [adjetivos, setAdjetivos] = useState([])    
    const [verbos, setVerbos] = useState([])
    const [adverbios, setAdverbios] = useState([])
    const [word, setWord] = useState('')

    useEffect(() => {
            document.body.classList.add(styles.body)
            const words = {
                articulos: [], 
                sustantivos1: [], sustantivos2: [], sustantivos3: [], sustantivos4: [],
                adjetivos1:[],  adjetivos2:[],  adjetivos3:[],  adjetivos4:[],
                verbos1:[],  verbos2:[],  verbos3:[],  verbos4:[],
                adverbios:[]
            }
            allWords.map(obj => {
                words.articulos = [...words.articulos, ...(obj.articulos.split(","))]
                words.sustantivos1 = [...words.sustantivos1, ...(obj.sustantivos1.split(","))]
                words.sustantivos2 = [...words.sustantivos2, ...(obj.sustantivos2.split(","))]
                words.sustantivos3 = [...words.sustantivos3, ...(obj.sustantivos3.split(","))]
                words.sustantivos4 = [...words.sustantivos4, ...(obj.sustantivos4.split(","))]
                words.adjetivos1 = [...words.adjetivos1, ...(obj.adjetivos1.split(","))]
                words.adjetivos2 = [...words.adjetivos2, ...(obj.adjetivos2.split(","))]
                words.adjetivos3 = [...words.adjetivos3, ...(obj.adjetivos3.split(","))]
                words.adjetivos4 = [...words.adjetivos4, ...(obj.adjetivos4.split(","))]
                words.verbos1 = [...words.verbos1, ...(obj.verbos1.split(","))]
                words.verbos2 = [...words.verbos2, ...(obj.verbos2.split(","))]
                words.verbos3 = [...words.verbos3, ...(obj.verbos3.split(","))]
                words.verbos4 = [...words.verbos4, ...(obj.verbos4.split(","))]
                words.adverbios = [...words.adverbios, ...(obj.adverbios.split(","))]
            })
            function orderWords(name, obj){
                const arrWords = []
                words[name] = obj[name+1].forEach((w, indice) => {
                    const newObj = {}
                    newObj[name+1]= obj[name+1][indice];
                    newObj[name+2]= obj[name+2][indice];
                    newObj[name+3]= obj[name+3][indice];
                    newObj[name+4]= obj[name+4][indice];
                    arrWords.push(newObj);
                })
                return arrWords;
            }
            setArticulos(words.articulos)
            setSustantivos(orderWords("sustantivos", {sustantivos1: words.sustantivos1, sustantivos2: words.sustantivos2, sustantivos3: words.sustantivos3, sustantivos4: words.sustantivos4}))
            setAdjetivos(orderWords("adjetivos", {adjetivos1:words.adjetivos1, adjetivos2:words.adjetivos2, adjetivos3:words.adjetivos3, adjetivos4:words.adjetivos4}))
            setVerbos(orderWords("verbos", {verbos1: words.verbos1, verbos2: words.verbos2, verbos3: words.verbos3, verbos4: words.verbos4}))
            //setSustantivos(words.sustantivos1)
            //setAdjetivos(words.adjetivos1)
            //setVerbos(words.verbos1)
            setAdverbios(words.adverbios)
    },[])
    
    const handleRemoveWord = (w) => {
        setWord(w)
    }

    return (
        <div className={styles.layout__container}>
            <WordsBag removeWord={word} width='1' title='Artículos' words={articulos}></WordsBag>
            <div className={styles.layout__center}>
                <div className={styles.layout__wordsbag_center}>
                    <WordsBag removeWord={word} width='1.5' title='Sustantivos' words={sustantivos}></WordsBag>
                    <WordsBag removeWord={word} width='1.5' title='Adjetivos'  words={adjetivos}></WordsBag>
                    <WordsBag removeWord={word} width='1.5' title='Verbos'  words={verbos}></WordsBag>
                </div>
                <BlankSheet handleRemoveWord={handleRemoveWord} id='asdfsd' 
                    onDragEnter={enter}
                    onDragOver={over}
                    onDragLeave={leave}
                    onDrop={drop}
                />
            </div>
            <WordsBag removeWord={word} width='1' title='Adverbios'  words={adverbios}></WordsBag>
        </div>
    )
}

export default Layout
