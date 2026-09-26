import 'package:flutter/material.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/theme/text_styles.dart';

class BrandBar extends StatelessWidget {
  const BrandBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: PortalColors.papel,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 8, 8, 8),
        child: Row(
          children: [
            const Flexible(child: BrandMark()),
            if (Navigator.canPop(context)) const PortalBack(),
          ],
        ),
      ),
    );
  }
}

class BrandMark extends StatelessWidget {
  const BrandMark({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('PORTAL', style: eyebrowStyle()),
        const SizedBox(width: 10),
        Flexible(child: Text('Rick and Morty', overflow: TextOverflow.ellipsis, style: titleStyle().copyWith(fontSize: 18))),
      ],
    );
  }
}

class PortalBack extends StatelessWidget {
  const PortalBack({super.key});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      key: const Key('voltar'),
      style: linkStyle(),
      onPressed: () => Navigator.of(context).pop(),
      child: Text('Voltar', style: bodyStyle()),
    );
  }
}
