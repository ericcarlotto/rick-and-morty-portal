import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/contract/parse_episode.dart';
import 'package:mobile/contract/parse_guards.dart';

EpisodeCatalog parseCatalog(Object? value) {
  final record = recordOf(value);
  return EpisodeCatalog(episodes: parseEpisodes(record['episodes']));
}

List<EpisodeSummary> parseEpisodes(Object? value) {
  if (value is! List) throw const FormatException(contractError);
  return [for (final item in value) parseSummary(item as Object?)];
}
