import styles from './blanksheet.module.css'
import {enter, over, leave, drop} from '../../utils/draganddrop'
import {capturePhoto} from '../../utils/capturePhoto'
import {touchStartDrop, touchStartDelete} from '../../utils/dndMobile'
import {useState, useRef} from 'react'
import { saveAs } from "file-saver";
import whatsappIcon from '../../public/images/whatsappIcon.svg'
import shareIcon from '../../public/images/share.svg'
import Image from 'next/image'

const filas = [0, 1, 2, 3, 4, 5, 6, 7 ,8, 9]
const BlankSheet = ({handleRemoveWord}) => {
    const [hideSaveWindow, setHideSaveWindow] = useState(false)
    const [hideSharedOptions, setHideSharedOptions] = useState(false)
    const namePoem = useRef('')
    const handleSave = (e) => {
        setHideSaveWindow(true)
        capturePhoto(e, document.getElementById('blanksheet').textContent.substring(0,8)).then(res =>{
            res.style.width= '500px';
            res.style.height= 'auto';
            res.style.borderRadius= '30px 30px 0px 0px';
            document.getElementById('poemCanva').appendChild(res)
        })
    }

    const handleShare = () => {
        let poem = [];
        filas.map(f => {
            const poemRow = []
            const xRow = []
            const words = document.getElementById(`blanksheet${f}`).childNodes;
            words.forEach(w => {
                xRow.push(w.childNodes[0].getBoundingClientRect().x)
                poemRow.push({text: w.childNodes[0].textContent, pos: w.childNodes[0].getBoundingClientRect().x})
            })
            xRow.sort(function(a, b){return a - b})
            xRow.map((e, indice) => {
                const posElem = poemRow.findIndex(i => i.pos == e)
                const elem = poemRow[posElem]
                poemRow.splice(posElem, 1)
                poemRow.splice(indice, 0, elem)
            })
            const textRow = poemRow.map(e => e.text)
            poem.push(textRow)
        })
        let poemText = ''
        for (let i=poem.length-1; i>0;i--){
            if(poem[i].length > 0){
                break;
            }
            if(poem[i].length == 0 && poem[i-1].length >= 0){
                poem.splice(i, 1)
            }
        }
        poem.forEach((p) => {
            poemText+= p.join(" ") + "\n"
        })
        window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(poemText), '_blank', 'noopener');    
    }

    const handleTouchStartDrop = (e) => {
        const res = touchStartDrop(e)
        handleRemoveWord(res)
    }

    const handleTouchStartDelete = (e) => {
        const res = touchStartDelete(e)
        handleRemoveWord(res)
    }

    const handleDownloadImg = (e) => {
        saveAs(document.getElementById('poemCanva').childNodes[0].src, `${namePoem.current.value}.png`);
    }
    return (
        <div className={styles.blanksheet__container}>
                <div className={styles.blanksheet__dropzone} id="blanksheet">
                    <h3 id='blanksheetNotification' className={styles.blanksheet__dropzone_inactive}>Arrastra palabras aqui para crear tu poema...</h3>
                    {filas.map(f => (
                        <div key={'blanksheet' + f} className={styles.blanksheet__dropzone__row} id={`blanksheet${f}`} draggable='false'
                        onDragEnter={enter}
                        onDragOver={over}
                        onDragLeave={leave}
                        onDrop={drop}
                        onTouchStart={handleTouchStartDrop}></div>
                    )) }
            </div>
        <div className={styles.blanksheet__bottombar}>
        <div className={styles.blanksheet__separator}></div>
        <div className={styles.blanksheet__containericons}>
        <div className={styles.blanksheet__dropzone__removeicon} id='deleteWord'  onTouchStart={handleTouchStartDelete}></div>
        <div className={styles.blanksheet__dropzone__saveicon} onClick={handleSave}>Guardar</div>
        <div className={styles.blanksheet__dropzone__shareicon} onClick={() => setHideSharedOptions(!hideSharedOptions)}>
            <Image src={shareIcon} alt='share' className={styles.blanksheet__dropzone__shareiconimg} /> 
        {hideSharedOptions &&
            <div className={styles.blanksheet__dropzone__sharewindowwrapper}>
                <div className={styles.blanksheet__dropzone__sharewindow}>
                    <Image src={whatsappIcon} alt='whatsappShare' className={styles.blanksheet__dropzone__sharewindowicon} onClick={handleShare}/></div>
                <div className={styles.blanksheet__dropzone__sharewindowtriangle}></div>
            </div>}
        </div>
        </div>
        </div>
        {hideSaveWindow && <>
        <div className={styles.blanksheet__background} onClick={(e) => setHideSaveWindow(false)}></div>
        <div className={styles.blanksheet__containersavewindow}>
        <div className={styles.blanksheet__savewindow}>
            <div className={styles.blanksheet__savewindow_close} onClick={(e) => setHideSaveWindow(false)}>+</div>
            <div id='poemCanva' style={{borderRadius: '30px 30px 0px 0px'}}></div>
            <div className={styles.blanksheet__savewindow_title}>Guardar Poema</div>
            <input type='text' ref={namePoem} className={styles.blanksheet__savewindow_input} placeholder="Nombre del poema" />
            <div className={styles.blanksheet__savewindow_button} onClick={handleDownloadImg}>Descargar como imagen</div>
        </div></div></>}
        </div>
    )
}

export default BlankSheet
