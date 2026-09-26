import 'package:flutter/widgets.dart';
import 'package:mobile/contract/census.dart';
import 'package:mobile/theme/text_styles.dart';

class CensusPanel extends StatelessWidget {
  const CensusPanel({required this.census, super.key});

  final Census census;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 8),
      child: Wrap(spacing: 16, runSpacing: 8, children: censusChips(census)),
    );
  }
}

List<Widget> censusChips(Census census) {
  return [for (final item in [...census.byStatus, ...census.bySpecies]) Text('${item.label} ${item.count}', style: bodyStyle())];
}
