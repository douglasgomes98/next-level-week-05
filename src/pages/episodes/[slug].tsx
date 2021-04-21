import { GetStaticPaths, GetStaticProps } from "next";
import { EpisodeRequest, EpisodeResponse } from "../../models";
import api from "../../services/api";
import { convertDurationToTimeString, formatDate } from "../../utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./episodes.module.scss";

type EpisodesProps = {
  episode: EpisodeResponse;
};

export default function Episodes({ episode }: EpisodesProps) {
  Link;

  return (
    <div className={styles.episode}>
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
        ></Image>

        <button type="button">
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
      ></div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const { data } = await api.get<EpisodeRequest>(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: formatDate(data.published_at, "d MMM yy"),
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
