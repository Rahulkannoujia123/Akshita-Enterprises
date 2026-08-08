import 'dart:math';

enum LoanType { home, personal, car }

enum PrepaymentType { reduceTenure, reduceEmi }

class Prepayment {
  final int month;
  final double amount;
  final PrepaymentType type;

  Prepayment({
    required this.month,
    required this.amount,
    required this.type,
  });
}

class LoanInput {
  final double principal;
  final double annualInterestRate;
  final int tenureMonths;
  final double processingFeePercent;
  final double prepaymentAmount;
  final int prepaymentFrequencyMonths; // 0 for one-time, >0 for recurring
  final int prepaymentStartMonth;
  final PrepaymentType prepaymentType;
  final int moratoriumMonths;
  final bool accrueMoratoriumInterest; // true = add to principal, false = pay monthly

  LoanInput({
    required this.principal,
    required this.annualInterestRate,
    required this.tenureMonths,
    this.processingFeePercent = 1.0,
    this.prepaymentAmount = 0.0,
    this.prepaymentFrequencyMonths = 0,
    this.prepaymentStartMonth = 1,
    this.prepaymentType = PrepaymentType.reduceTenure,
    this.moratoriumMonths = 0,
    this.accrueMoratoriumInterest = true,
  });
}

class AmortizationMonth {
  final int month;
  final double openingBalance;
  final double emi;
  final double interest;
  final double principalPaid;
  final double extraPayment;
  final double closingBalance;

  AmortizationMonth({
    required this.month,
    required this.openingBalance,
    required this.emi,
    required this.interest,
    required this.principalPaid,
    required this.extraPayment,
    required this.closingBalance,
  });
}

class LoanResult {
  final double monthlyEmi;
  final double totalPrincipalPaid;
  final double totalInterestPaid;
  final double totalPayment;
  final double totalExtraPayment;
  final double processingFee;
  final double processingFeeGst; // 18% on processing fee
  final double totalUpfrontCharges;
  final int effectiveTenureMonths;
  final int tenureSavedMonths;
  final double interestSaved;
  final List<AmortizationMonth> schedule;

  LoanResult({
    required this.monthlyEmi,
    required this.totalPrincipalPaid,
    required this.totalInterestPaid,
    required this.totalPayment,
    required this.totalExtraPayment,
    required this.processingFee,
    required this.processingFeeGst,
    required this.totalUpfrontCharges,
    required this.effectiveTenureMonths,
    required this.tenureSavedMonths,
    required this.interestSaved,
    required this.schedule,
  });
}

class EmiCalculatorLogic {
  static double calculateStandardEmi(double p, double r, int n) {
    if (p <= 0 || n <= 0) return 0.0;
    if (r == 0) return p / n;
    // Monthly interest rate
    double rMonthly = r / (12 * 100);
    double emi = p * rMonthly * pow(1 + rMonthly, n) / (pow(1 + rMonthly, n) - 1);
    return emi;
  }

  static LoanResult calculateLoan(LoanInput input) {
    double initialPrincipal = input.principal;
    double rMonthly = input.annualInterestRate / (12 * 100);
    int tenure = input.tenureMonths;

    double processingFee = (initialPrincipal * input.processingFeePercent) / 100.0;
    double processingFeeGst = processingFee * 0.18; // 18% GST
    double totalUpfrontCharges = processingFee + processingFeeGst;

    // 1. Calculate standard EMI first (without prepayments or moratorium)
    double baseEmi = calculateStandardEmi(initialPrincipal, input.annualInterestRate, tenure);

    // Let's compute standard baseline total interest for comparing savings
    double baselineTotalInterest = 0.0;
    {
      double bal = initialPrincipal;
      for (int m = 1; m <= tenure; m++) {
        double interest = bal * rMonthly;
        double principalPaid = baseEmi - interest;
        if (bal < principalPaid) {
          principalPaid = bal;
        }
        bal -= principalPaid;
        baselineTotalInterest += interest;
        if (bal <= 0) break;
      }
    }

    List<AmortizationMonth> schedule = [];
    double currentPrincipal = initialPrincipal;
    double totalInterestPaid = 0.0;
    double totalExtraPaid = 0.0;
    double totalPrincipalPaid = 0.0;

    int currentMonth = 1;
    double currentEmi = baseEmi;

    // Handle Moratorium months first if any
    for (int m = 1; m <= input.moratoriumMonths; m++) {
      double interest = currentPrincipal * rMonthly;
      double emiPaid = 0.0;

      if (input.accrueMoratoriumInterest) {
        // Interest is accrued (added to principal)
        double opening = currentPrincipal;
        currentPrincipal += interest;
        schedule.add(AmortizationMonth(
          month: currentMonth,
          openingBalance: opening,
          emi: 0.0,
          interest: interest,
          principalPaid: -interest, // negative indicating accrual
          extraPayment: 0.0,
          closingBalance: currentPrincipal,
        ));
        totalInterestPaid += interest;
      } else {
        // Interest paid monthly, principal stays same
        double opening = currentPrincipal;
        emiPaid = interest; // user pays interest only
        schedule.add(AmortizationMonth(
          month: currentMonth,
          openingBalance: opening,
          emi: emiPaid,
          interest: interest,
          principalPaid: 0.0,
          extraPayment: 0.0,
          closingBalance: currentPrincipal,
        ));
        totalInterestPaid += interest;
      }
      currentMonth++;
    }

    // Recalculate EMI after moratorium if principal changed
    if (input.moratoriumMonths > 0 && input.accrueMoratoriumInterest) {
      currentEmi = calculateStandardEmi(currentPrincipal, input.annualInterestRate, tenure);
    }

    // Main repayment loop
    int maxRepayMonths = 600; // Safe limit to prevent infinite loop
    while (currentPrincipal > 0.01 && currentMonth <= maxRepayMonths) {
      double openingBal = currentPrincipal;
      double interest = currentPrincipal * rMonthly;
      double emi = currentEmi;

      if (emi > (currentPrincipal + interest)) {
        emi = currentPrincipal + interest;
      }

      double principalPaid = emi - interest;
      if (principalPaid < 0) principalPaid = 0;
      if (principalPaid > currentPrincipal) {
        principalPaid = currentPrincipal;
        emi = principalPaid + interest;
      }

      currentPrincipal -= principalPaid;

      // Handle prepayments
      double extra = 0.0;
      bool isPrepaymentMonth = false;
      if (input.prepaymentAmount > 0) {
        if (input.prepaymentFrequencyMonths == 0) {
          // One-time prepayment
          if (currentMonth == input.prepaymentStartMonth) {
            isPrepaymentMonth = true;
          }
        } else {
          // Recurring prepayment
          int monthsSinceStart = currentMonth - input.prepaymentStartMonth;
          if (monthsSinceStart >= 0 && monthsSinceStart % input.prepaymentFrequencyMonths == 0) {
            isPrepaymentMonth = true;
          }
        }
      }

      if (isPrepaymentMonth && currentPrincipal > 0) {
        extra = input.prepaymentAmount;
        if (extra > currentPrincipal) {
          extra = currentPrincipal;
        }
        currentPrincipal -= extra;
        totalExtraPaid += extra;
      }

      schedule.add(AmortizationMonth(
        month: currentMonth,
        openingBalance: openingBal,
        emi: emi,
        interest: interest,
        principalPaid: principalPaid,
        extraPayment: extra,
        closingBalance: currentPrincipal,
      ));

      totalInterestPaid += interest;
      totalPrincipalPaid += principalPaid;

      // Handle prepayment type logic (reduce tenure vs reduce EMI)
      if (extra > 0 && input.prepaymentType == PrepaymentType.reduceEmi) {
        // Recalculate monthly EMI for remaining tenure
        int remainingTenure = (tenure + input.moratoriumMonths) - currentMonth;
        if (remainingTenure > 0) {
          currentEmi = calculateStandardEmi(currentPrincipal, input.annualInterestRate, remainingTenure);
        }
      }

      currentMonth++;
    }

    int effectiveTenure = schedule.length;
    int expectedTenureWithMoratorium = tenure + input.moratoriumMonths;
    int tenureSaved = expectedTenureWithMoratorium - effectiveTenure;
    if (tenureSaved < 0) tenureSaved = 0;

    double actualTotalPaid = 0.0;
    for (var m in schedule) {
      actualTotalPaid += m.emi + m.extraPayment;
    }

    double interestSaved = baselineTotalInterest - totalInterestPaid;
    if (interestSaved < 0) interestSaved = 0.0;

    return LoanResult(
      monthlyEmi: baseEmi,
      totalPrincipalPaid: totalPrincipalPaid,
      totalInterestPaid: totalInterestPaid,
      totalPayment: actualTotalPaid,
      totalExtraPayment: totalExtraPaid,
      processingFee: processingFee,
      processingFeeGst: processingFeeGst,
      totalUpfrontCharges: totalUpfrontCharges,
      effectiveTenureMonths: effectiveTenure,
      tenureSavedMonths: tenureSaved,
      interestSaved: interestSaved,
      schedule: schedule,
    );
  }
}
