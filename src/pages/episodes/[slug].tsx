import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { usePlayer } from '../../contexts/PlayerContext';
import { EpisodeRequest, EpisodeResponse } from '../../models';
import { getFirebaseService } from '../../services/firebase';
import { convertDurationToTimeString, formatDate } from '../../utils';
import styles from './episodes.module.scss';

type EpisodesProps = {
  episode: EpisodeResponse;
};

export default function Episodes({ episode }: EpisodesProps) {
  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <Head>
        <title>{`${episode.title} | Podcastr`}</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const episodes: EpisodeRequest[] = [];

  const database = getFirebaseService().database().ref('episodes');

  const snapshots = await database.once('value');

  snapshots.forEach(snapshot => {
    const item = snapshot.val();
    episodes.push(item);
  });

  const data = episodes.find(item => item.id === slug);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: formatDate(data.published_at, 'd MMM yy'),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(data.file.duration),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  };
};
