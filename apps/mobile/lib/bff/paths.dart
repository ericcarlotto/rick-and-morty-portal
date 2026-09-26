import 'package:mobile/contract/catalog.dart';

const healthPath = '/api/health';

String castPath(int episodeId) => '/api/episodes/$episodeId/cast';

String catalogPath(CatalogQuery query) {
  final params = <String, String>{};
  putQuery(params, QueryPart(key: 'name', value: query.name));
  putQuery(params, QueryPart(key: 'code', value: query.code));
  if (params.isEmpty) return '/api/episodes';
  return '/api/episodes?${Uri(queryParameters: params).query}';
}

class QueryPart {
  const QueryPart({required this.key, required this.value});

  final String key;
  final String? value;
}

void putQuery(Map<String, String> params, QueryPart part) {
  final text = blankToNull(part.value);
  if (text == null) return;
  params[part.key] = text;
}

Uri bffUri(String origin, String path) => Uri.parse('$origin$path');
