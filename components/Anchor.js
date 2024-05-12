import Link from "next/link";
import styles from '../styles/Anchor.module.css'

export default function Anchor({ text, href, onClick, ariaCurrent }) {
    return (
        <Link legacyBehavior href={href}>
            <a className={styles.link} onClick={onClick} aria-current={ariaCurrent}>
                {text}
            </a>
        </Link>
    )
}