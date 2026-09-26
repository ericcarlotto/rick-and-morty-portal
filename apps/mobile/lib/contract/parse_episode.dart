import 'package:mobile/contract/episode.dart';
import 'package:mobile/contract/parse_guards.dart';

EpisodeSummary parseSummary(Object? value) {
  final record = recordOf(value);
  return EpisodeSummary(id: intOf(record['id']), title: parseTitle(record));
}

EpisodeTitle parseTitle(Map<String, Object?> record) {
  return EpisodeTitle(name: textOf(record['name']), code: textOf(record['code']));
}

EpisodeSummary? parseNeighbor(Object? value) {
  if (value == null) return null;
  return parseSummary(value);
}
