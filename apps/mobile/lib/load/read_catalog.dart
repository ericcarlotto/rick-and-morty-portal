import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/contract/catalog.dart';

class RemoteException implements Exception {
  const RemoteException();
}

Future<EpisodeCatalog> readCatalog(PortalApi api, CatalogQuery query) async {
  try {
    await api.health();
    return await api.episodes(query);
  } on Exception {
    throw const RemoteException();
  }
}
