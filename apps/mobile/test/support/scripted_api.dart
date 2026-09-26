import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/health.dart';

class ScriptedApi implements PortalApi {
  Future<Health> Function() healthHandler = () async => const Health();
  Future<EpisodeCatalog> Function(CatalogQuery query) episodesHandler = (_) async {
    return const EpisodeCatalog(episodes: []);
  };
  Future<Cast> Function(int episodeId) castHandler = (_) async => throw Exception('sem elenco');
  final queries = <CatalogQuery>[];

  @override
  Future<Health> health() => healthHandler();

  @override
  Future<EpisodeCatalog> episodes(CatalogQuery query) {
    queries.add(query);
    return episodesHandler(query);
  }

  @override
  Future<Cast> castOf(int episodeId) => castHandler(episodeId);
}
