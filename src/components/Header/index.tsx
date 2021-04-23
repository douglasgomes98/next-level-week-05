import Link from 'next/link';
import styles from './styles.module.scss';
import { formatDate } from '../../utils';

function Header() {
  const currentDate = formatDate(new Date(), 'EEEEEE, d MMMM');

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src="/logo.svg" alt="Podcastr" />
      </Link>
      <p>O melhor para você ouvir sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}

export default Header;
