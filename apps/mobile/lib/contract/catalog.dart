import 'package:mobile/contract/episode.dart';

class CatalogQuery {
  const CatalogQuery({this.name, this.code});

  final String? name;
  final String? code;
}

class EpisodeCatalog {
  const EpisodeCatalog({required this.episodes});

  final List<EpisodeSummary> episodes;
}

CatalogQuery cleanQuery(CatalogQuery query) {
  return CatalogQuery(name: blankToNull(query.name), code: blankToNull(query.code));
}

String? blankToNull(String? value) {
  if (value == null) return null;
  final text = value.trim();
  if (text.isEmpty) return null;
  return text;
}
