import styles from './wordsbag.module.css'
import Image from 'next/image'
import reload from '../../public/images/reload.svg'
import { useState, useEffect } from 'react'
import {start, end} from '../../utils/draganddrop'
import uuid from 'react-uuid'
import { touchStart} from '../../utils/dndMobile'

const WordsBag = ({ width, title, words, removeWord }) => {
    const [wordss, setWordss] = useState({words: [], change: 0})
    
    const handleDragEnd = (e) => {
        let res = end(e);
        res = res.split(" ")[0];
        const selectWords = wordss.words.filter(w => typeof w === 'string' ? w !== res : !Object.keys(w).find(e => w[e] == res));
        setWordss({words: selectWords, change: wordss.change + 1})
    }

    const handleTouch = (e) => {
        touchStart(e)
    }

    const mixWords = ( arr ) => {
        const selectWords = arr.sort(() => 0.5 - Math.random())
        selectWords.length = 20;
        const filterWords = selectWords.map(w => {
            const obj = {}
            Object.keys(w).map(p => { if (w[p] != 0)  {obj[p] = w[p]}})
            return obj
        })
        return typeof selectWords[0] == 'string' ? selectWords : filterWords;
    }
    useEffect(() => {
        if (words.length > 0){
            const selectWords = mixWords(words)
            setWordss({words: selectWords, change: wordss.change + 1})
        }
    }, [words])

    useEffect(() => {
        const selectWords = wordss.words.filter(w => typeof w === 'string' ? w !== removeWord : !Object.keys(w).find(e => w[e] == removeWord));
        setWordss({words: selectWords, change: wordss.change + 1})
    },[removeWord])

    const handleMix = async () => {
        const selectWords = mixWords(words)
        setWordss({words: selectWords, change: wordss.change + 1})
    }

    const handleOptions= (e) => {
        if(e.target.parentNode.childNodes[1]){
            const element = e.target.parentNode
            element.style.opacity = 1;
            element.childNodes[0].style.opacity = 1;
            element.childNodes[1].classList.toggle(styles.none)
            element.classList.toggle(styles.zindex)
        }
    }

    const handleOptionChange = (e) => {
        const element =  document.getElementById(e.target.parentNode.parentNode.id)
        const elementText = element.childNodes[0].textContent
        element.style.opacity = 1;
        element.childNodes[0].style.opacity = 1;
        element.childNodes[0].textContent = e.target.textContent
        e.target.textContent = elementText
        element.childNodes[1].classList.toggle(styles.none)
        element.classList.toggle(styles.zindex)
    }

    return (
        <div className={styles.wordsbag__container} style={{flex: `${width}`}}>
            <div className={styles.wordsbag__wordsbag}>
                <div className={styles.wordsbag__title} onClick={handleMix}>{title}<div className={styles.wodsbag__title__image}><Image src={reload} /></div></div>
                <div className={styles.wordsbag__separator}></div>
                
                    <div className={styles.wordsbag__wrapper}>
                    {wordss.words.map( (w, indice) => { let card; if (typeof w === 'string') { card = w } else {card = w[Object.keys(w)[0]];};
                    return (<div id={`word${card}${uuid()}`} key={`word${card}${uuid()}`} className={styles.wordsbag__word} draggable='true' 
                        onDragStart={start} 
                        onDragEnd={handleDragEnd} 
                        onTouchStart={handleTouch}
                        onContextMenu={handleOptions}><div className={styles.wordsbag__wordtext} style={{cursor: typeof w === 'string' ? 'pointer' : Object.keys(w).length > 1 ? 'copy' : 'pointer'}}>{card}</div>
                            <div className={`${styles.wordsbag__wordoptions} ${styles.none}`} style={{height: `${Object.keys(w).length * 22 - 22}px`}}>
                            {typeof w === 'object' && Object.keys(w).map((p, indice) => indice > 0 && <div className={styles.wordsbag__wordoption} onClick={handleOptionChange}>{w[p]}</div>)}
                            </div>
                            </div>) 
                })}
                </div>
            </div>
        </div>
    )
}

export default WordsBag
