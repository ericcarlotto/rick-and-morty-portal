import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/load/read_catalog.dart';

Future<Cast> readCast(PortalApi api, int episodeId) async {
  try {
    return await api.castOf(episodeId);
  } on Exception {
    throw const RemoteException();
  }
}
