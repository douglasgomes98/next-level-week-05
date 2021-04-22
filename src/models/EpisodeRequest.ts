/* eslint-disable camelcase */
type File = {
  url: string;
  type: string;
  duration: number;
};

export type EpisodeRequest = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: File;
};
