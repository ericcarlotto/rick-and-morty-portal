import 'package:mobile/catalog/season_prefix.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/episode.dart';

List<EpisodeSummary> filterCatalog(List<EpisodeSummary> episodes, CatalogQuery query) {
  return [for (final episode in episodes) if (keepEpisode(episode, query)) episode];
}

bool keepEpisode(EpisodeSummary episode, CatalogQuery query) {
  if (!includesText(query.name, episode.name)) return false;
  if (!includesText(query.code, episode.code)) return false;
  return startsWithSeason(episode.code, query.season);
}

bool includesText(String? value, String text) {
  final query = value?.trim().toLowerCase() ?? '';
  if (query.isEmpty) return true;
  return text.toLowerCase().contains(query);
}

bool startsWithSeason(String code, String? season) {
  final mark = seasonPrefix(season);
  if (mark.isEmpty) return true;
  return code.toLowerCase().startsWith(mark);
}
