import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/parse_census.dart';
import 'package:mobile/contract/parse_character.dart';
import 'package:mobile/contract/parse_episode.dart';
import 'package:mobile/contract/parse_guards.dart';

Cast parseCast(Object? value) {
  final record = recordOf(value);
  return Cast(head: parseHead(record), body: parseBody(record));
}

CastHead parseHead(Map<String, Object?> record) {
  return CastHead(episode: parseSummary(record['episode']), neighbors: parseNeighbors(record));
}

EpisodeNeighbors parseNeighbors(Map<String, Object?> record) {
  return EpisodeNeighbors(
    previousEpisode: parseNeighbor(record['previousEpisode']),
    nextEpisode: parseNeighbor(record['nextEpisode']),
  );
}

CastBody parseBody(Map<String, Object?> record) {
  return CastBody(index: stringList(record['index']), people: parsePeople(record));
}

CastPeople parsePeople(Map<String, Object?> record) {
  return CastPeople(characters: parseCharacters(record['characters']), census: parseCensus(record['census']));
}
