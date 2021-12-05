import styles from './themes.module.css'
import useColorTheme from "use-color-theme";

const Themes = () => {
    const colorTheme = useColorTheme('light-theme', {
        classNames: ['light-theme', 'dark-theme', 'funky']
      });
    const handleColorTheme = (theme) => {
        colorTheme.set(theme);
    }
    return (
        <div className = {styles.themes__themescontainer}>
            <div className={styles.themes__theme} style={{backgroundColor: 'rgba(186, 235, 220, 0.92)'}} onClick={() =>   handleColorTheme('light-theme')}></div>
            <div className={styles.themes__theme} style={{backgroundColor: 'rgba(235, 218, 186, 0.92)'}} onClick={() => handleColorTheme('dark-theme')}></div>
            <div className={styles.themes__theme} style={{backgroundColor: 'rgba(247, 224, 1, 0.95)'}} onClick={() => handleColorTheme('funky')}></div>
        </div>
    )
}

export default Themes
