String seasonPrefix(String? value) {
  final text = value?.trim() ?? '';
  if (text.isEmpty) return '';
  if (!RegExp(r'^\d{1,2}$').hasMatch(text)) return 's00';
  return 's${text.padLeft(2, '0')}';
}
