const contractError = 'Contrato inválido';

Map<String, Object?> recordOf(Object? value) {
  if (value is! Map) throw const FormatException(contractError);
  return {for (final entry in value.entries) entry.key.toString(): entry.value as Object?};
}

String textOf(Object? value) {
  if (value is! String) throw const FormatException(contractError);
  if (value.trim().isEmpty) throw const FormatException(contractError);
  return value;
}

String stringItem(Object? value) {
  if (value is! String) throw const FormatException(contractError);
  return value;
}

int intOf(Object? value) {
  if (value is! int) throw const FormatException(contractError);
  if (value < 1) throw const FormatException(contractError);
  return value;
}

int countOf(Object? value) {
  if (value is! int) throw const FormatException(contractError);
  if (value < 0) throw const FormatException(contractError);
  return value;
}

List<String> stringList(Object? value) {
  if (value is! List) throw const FormatException(contractError);
  return [for (final item in value) stringItem(item as Object?)];
}
