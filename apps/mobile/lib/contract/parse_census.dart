import 'package:mobile/contract/census.dart';
import 'package:mobile/contract/parse_guards.dart';

Census parseCensus(Object? value) {
  final record = recordOf(value);
  return Census(byStatus: parseCounts(record['byStatus']), bySpecies: parseCounts(record['bySpecies']));
}

List<CensusCount> parseCounts(Object? value) {
  if (value is! List) throw const FormatException(contractError);
  return [for (final item in value) parseCount(item as Object?)];
}

CensusCount parseCount(Object? value) {
  final record = recordOf(value);
  return CensusCount(label: textOf(record['label']), count: countOf(record['count']));
}
