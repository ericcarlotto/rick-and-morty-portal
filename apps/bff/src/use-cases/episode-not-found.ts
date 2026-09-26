export class EpisodeNotFound extends Error {
  constructor(readonly episodeId: number) {
    super('Episódio não encontrado');
  }
}
