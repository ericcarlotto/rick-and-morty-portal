import 'package:mobile/contract/census.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/contract/episode.dart';

class EpisodeNeighbors {
  const EpisodeNeighbors({required this.previousEpisode, required this.nextEpisode});

  final EpisodeSummary? previousEpisode;
  final EpisodeSummary? nextEpisode;
}

class CastHead {
  const CastHead({required this.episode, required this.neighbors});

  final EpisodeSummary episode;
  final EpisodeNeighbors neighbors;
}

class CastPeople {
  const CastPeople({required this.characters, required this.census});

  final List<CastCharacter> characters;
  final Census census;
}

class CastBody {
  const CastBody({required this.index, required this.people});

  final List<String> index;
  final CastPeople people;
}

class Cast {
  const Cast({required this.head, required this.body});

  final CastHead head;
  final CastBody body;
}

extension CastFields on Cast {
  EpisodeSummary get episode => head.episode;

  EpisodeSummary? get previousEpisode => head.neighbors.previousEpisode;

  EpisodeSummary? get nextEpisode => head.neighbors.nextEpisode;

  List<String> get index => body.index;

  List<CastCharacter> get characters => body.people.characters;

  Census get census => body.people.census;
}
