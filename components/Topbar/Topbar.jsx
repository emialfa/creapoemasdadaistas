import styles from './topbar.module.css'

const Topbar = ({title}) => {
    return (
        <div className={styles.topbar__container}>
            <h1 className={styles.topbar__title}>{title}</h1>
        </div>
    )
}

export default Topbar
