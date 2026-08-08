import 'package:flutter_test/flutter_test.dart';
import 'package:emi_calculator/emi_calculator_app.dart';

void main() {
  testWidgets('EMI calculator app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const EmiCalculatorApp());

    // Verify our logo or brand header text is displayed.
    expect(find.text('EMI Calculator Pro'), findsWidgets);
    expect(find.text('EMI Calculator'), findsOneWidget);
  });
}
