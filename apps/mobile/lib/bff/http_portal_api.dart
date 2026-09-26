import 'dart:convert';

import 'package:mobile/bff/bff_link.dart';
import 'package:mobile/bff/paths.dart';
import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/health.dart';
import 'package:mobile/contract/parse_cast.dart';
import 'package:mobile/contract/parse_catalog.dart';
import 'package:mobile/contract/parse_health.dart';

class HttpPortalApi implements PortalApi {
  const HttpPortalApi({required this.link});

  final BffLink link;

  @override
  Future<Health> health() => getParsed(healthGet(link));

  @override
  Future<EpisodeCatalog> episodes(CatalogQuery query) => getParsed(catalogGet(link, query));

  @override
  Future<Cast> castOf(int episodeId) => getParsed(castGet(link, episodeId));
}

class ParsedRequest<T> {
  const ParsedRequest({required this.path, required this.parse});

  final String path;
  final T Function(Object?) parse;
}

class ParsedGet<T> {
  const ParsedGet({required this.link, required this.request});

  final BffLink link;
  final ParsedRequest<T> request;
}

ParsedGet<Health> healthGet(BffLink link) {
  return ParsedGet(link: link, request: ParsedRequest(path: healthPath, parse: parseHealth));
}

ParsedGet<EpisodeCatalog> catalogGet(BffLink link, CatalogQuery query) {
  return ParsedGet(link: link, request: ParsedRequest(path: catalogPath(query), parse: parseCatalog));
}

ParsedGet<Cast> castGet(BffLink link, int episodeId) {
  return ParsedGet(link: link, request: ParsedRequest(path: castPath(episodeId), parse: parseCast));
}

Future<T> getParsed<T>(ParsedGet<T> request) async {
  final response = await request.link.client.get(bffUri(request.link.origin, request.request.path));
  if (response.statusCode != 200) throw const PortalException();
  return request.request.parse(decodeBody(response.body));
}

Object? decodeBody(String body) {
  try {
    return jsonDecode(body);
  } on FormatException {
    throw const PortalException();
  }
}

class PortalException implements Exception {
  const PortalException();
}
