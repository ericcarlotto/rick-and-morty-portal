import 'package:flutter/widgets.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/theme/text_styles.dart';

class PageLoading extends StatelessWidget {
  const PageLoading({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      key: const Key('scroll-loading'),
      padding: const EdgeInsets.symmetric(vertical: 24),
      child: Row(
        children: [
          const SizedBox(width: 10, height: 10, child: ColoredBox(color: PortalColors.indigo)),
          const SizedBox(width: 12),
          Text('A carregar mais', style: bodyStyle()),
        ],
      ),
    );
  }
}
