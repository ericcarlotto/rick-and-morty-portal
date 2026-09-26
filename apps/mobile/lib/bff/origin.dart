const defaultBffOrigin = 'http://127.0.0.1:3001';

String resolveOrigin(String? raw) {
  final trimmed = (raw ?? '').trim();
  if (trimmed.isEmpty) return defaultBffOrigin;
  return withoutTrailingSlash(trimmed);
}

String withoutTrailingSlash(String value) {
  return value.replaceAll(RegExp(r'/+$'), '');
}
