import 'package:mobile/contract/health.dart';
import 'package:mobile/contract/parse_guards.dart';

Health parseHealth(Object? value) {
  final record = recordOf(value);
  if (textOf(record['status']) != 'ok') throw const FormatException(contractError);
  return const Health();
}
