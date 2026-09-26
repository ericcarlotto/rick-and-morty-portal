import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/health.dart';

abstract interface class PortalApi {
  Future<Health> health();

  Future<EpisodeCatalog> episodes(CatalogQuery query);

  Future<Cast> castOf(int episodeId);
}
