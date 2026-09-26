import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/catalog/filter_catalog.dart';
import 'package:mobile/catalog/season_prefix.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/contract/catalog.dart';

import 'support/samples.dart';

void main() {
  const seasonTwo = 'A Rickle in Time';

  test('filtra nome, código e temporada enquanto os campos mudam', () {
    final episodes = [pilotEpisode, lawnEpisode, episodeOf(12, seasonTwo, 'S02E01')];
    expect(ids(episodes, const CatalogQuery(name: ' dog ')), [2]);
    expect(ids(episodes, const CatalogQuery(code: 's01e01')), [1]);
    expect(ids(episodes, const CatalogQuery(season: '2')), [12]);
    expect(ids(episodes, const CatalogQuery(season: ' 2 ')), [12]);
    expect(ids(episodes, const CatalogQuery(season: 'abc')), isEmpty);
    expect(ids(episodes, const CatalogQuery(name: 'pilot', season: '2')), isEmpty);
    expect(ids(episodes, const CatalogQuery()), [1, 2, 12]);
    expect(seasonPrefix(''), '');
    expect(seasonPrefix('9'), 's09');
  });
}

List<int> ids(List<EpisodeSummary> episodes, CatalogQuery query) {
  return filterCatalog(episodes, query).map((episode) => episode.id).toList();
}
