import 'package:flutter/widgets.dart';
import 'package:mobile/contract/census.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/chrome.dart';

class CensusPanel extends StatelessWidget {
  const CensusPanel({required this.census, super.key});

  final Census census;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Heading(spec: HeadingSpec(text: 'Por estado', style: sectionHeading())),
        CountList(counts: census.byStatus),
        Heading(spec: HeadingSpec(text: 'Por espécie', style: sectionHeading())),
        CountList(counts: census.bySpecies),
      ],
    );
  }
}

class CountList extends StatelessWidget {
  const CountList({required this.counts, super.key});

  final List<CensusCount> counts;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [for (final item in counts) Text('${item.label}: ${item.count}', style: bodyStyle())],
    );
  }
}
