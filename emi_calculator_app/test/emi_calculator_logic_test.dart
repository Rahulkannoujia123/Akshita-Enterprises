import 'package:flutter_test/flutter_test.dart';
import 'package:emi_calculator/emi_calculator_logic.dart';

void main() {
  test('Standard EMI Calculation', () {
    double p = 1000000; // 10 Lakhs
    double r = 8.5; // 8.5%
    int n = 120; // 10 Years (120 Months)

    double emi = EmiCalculatorLogic.calculateStandardEmi(p, r, n);
    expect(emi, closeTo(12398.57, 1.0)); // standard EMI is ~12398.57
  });

  test('Loan Full Amortization Calculation with baseline', () {
    final input = LoanInput(
      principal: 500000,
      annualInterestRate: 10.0,
      tenureMonths: 60,
      processingFeePercent: 1.0,
    );

    final result = EmiCalculatorLogic.calculateLoan(input);
    expect(result.monthlyEmi, closeTo(10623.52, 1.0));
    expect(result.schedule.length, equals(60));
    expect(result.processingFee, equals(5000));
    expect(result.processingFeeGst, equals(900));
    expect(result.totalUpfrontCharges, equals(5900));
    expect(result.totalExtraPayment, equals(0.0));
    expect(result.schedule.last.closingBalance, closeTo(0.0, 0.1));
  });

  test('Loan with Extra Payment Prepayments', () {
    final input = LoanInput(
      principal: 1000000,
      annualInterestRate: 9.0,
      tenureMonths: 120,
      prepaymentAmount: 5000,
      prepaymentFrequencyMonths: 1, // pay 5k extra every single month
      prepaymentStartMonth: 1,
      prepaymentType: PrepaymentType.reduceTenure,
    );

    final result = EmiCalculatorLogic.calculateLoan(input);
    // tenure saved should be substantial
    expect(result.effectiveTenureMonths, lessThan(120));
    expect(result.tenureSavedMonths, greaterThan(0));
    expect(result.interestSaved, greaterThan(0));
  });
}
