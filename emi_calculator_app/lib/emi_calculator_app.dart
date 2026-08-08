import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'emi_calculator_logic.dart';
import 'pdf_service.dart';

class EmiCalculatorApp extends StatefulWidget {
  const EmiCalculatorApp({super.key});

  @override
  State<EmiCalculatorApp> createState() => _EmiCalculatorAppState();
}

class _EmiCalculatorAppState extends State<EmiCalculatorApp> {
  bool isDarkTheme = true;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EMI Pro',
      debugShowCheckedModeBanner: false,
      theme: isDarkTheme ? getDarkTheme() : getLightTheme(),
      home: MainCalculatorScreen(
        isDarkTheme: isDarkTheme,
        onThemeToggle: () {
          setState(() {
            isDarkTheme = !isDarkTheme;
          });
        },
      ),
    );
  }

  ThemeData getDarkTheme() {
    return ThemeData.dark().copyWith(
      scaffoldBackgroundColor: const Color(0xFF0F172A), // deep space slate-900
      primaryColor: const Color(0xFF10B981), // emerald-500
      colorScheme: const ColorScheme.dark(
        primary: Color(0xFF10B981),
        secondary: Color(0xFF34D399),
        surface: Color(0xFF1E293B), // slate-800
      ),
      sliderTheme: const SliderThemeData(
        activeTrackColor: Color(0xFF10B981),
        thumbColor: Color(0xFF10B981),
        overlayColor: Color(0x2910B981),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFF1E293B),
        elevation: 0,
      ),
    );
  }

  ThemeData getLightTheme() {
    return ThemeData.light().copyWith(
      scaffoldBackgroundColor: const Color(0xFFF8FAFC), // slate-50
      primaryColor: const Color(0xFF059669), // emerald-600
      colorScheme: const ColorScheme.light(
        primary: Color(0xFF059669),
        secondary: Color(0xFF10B981),
        surface: Colors.white,
      ),
      sliderTheme: const SliderThemeData(
        activeTrackColor: Color(0xFF059669),
        thumbColor: Color(0xFF059669),
        overlayColor: Color(0x29059669),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        elevation: 1,
        foregroundColor: Color(0xFF1E293B),
      ),
    );
  }
}

class MainCalculatorScreen extends StatefulWidget {
  final bool isDarkTheme;
  final VoidCallback onThemeToggle;

  const MainCalculatorScreen({
    super.key,
    required this.isDarkTheme,
    required this.onThemeToggle,
  });

  @override
  State<MainCalculatorScreen> createState() => _MainCalculatorScreenState();
}

class _MainCalculatorScreenState extends State<MainCalculatorScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Calculators controllers
  final _pController = TextEditingController(text: '1000000');
  final _rController = TextEditingController(text: '8.5');
  final _nController = TextEditingController(text: '120');
  final _feeController = TextEditingController(text: '1.0');

  // Prepayment controllers
  final _prepayAmountController = TextEditingController(text: '0');
  final _prepayFreqController = TextEditingController(text: '0');
  final _prepayStartMonthController = TextEditingController(text: '1');

  // Moratorium controllers
  final _moraMonthsController = TextEditingController(text: '0');

  double _principal = 1000000;
  double _interestRate = 8.5;
  double _tenureMonths = 120;
  double _processingFeePercent = 1.0;

  double _prepayAmount = 0;
  int _prepayFreq = 0;
  int _prepayStartMonth = 1;
  PrepaymentType _prepayType = PrepaymentType.reduceTenure;

  int _moraMonths = 0;
  bool _accrueMoraInterest = true;

  // Scenario Comparison Inputs
  final _p1Controller = TextEditingController(text: '1000000');
  final _r1Controller = TextEditingController(text: '8.5');
  final _n1Controller = TextEditingController(text: '120');
  final _p2Controller = TextEditingController(text: '1000000');
  final _r2Controller = TextEditingController(text: '9.2');
  final _n2Controller = TextEditingController(text: '120');

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _pController.dispose();
    _rController.dispose();
    _nController.dispose();
    _feeController.dispose();
    _prepayAmountController.dispose();
    _prepayFreqController.dispose();
    _prepayStartMonthController.dispose();
    _moraMonthsController.dispose();
    _p1Controller.dispose();
    _r1Controller.dispose();
    _n1Controller.dispose();
    _p2Controller.dispose();
    _r2Controller.dispose();
    _n2Controller.dispose();
    super.dispose();
  }

  void _syncInputs() {
    _principal = double.tryParse(_pController.text) ?? 1000000;
    _interestRate = double.tryParse(_rController.text) ?? 8.5;
    _tenureMonths = double.tryParse(_nController.text) ?? 120;
    _processingFeePercent = double.tryParse(_feeController.text) ?? 1.0;
    _prepayAmount = double.tryParse(_prepayAmountController.text) ?? 0;
    _prepayFreq = int.tryParse(_prepayFreqController.text) ?? 0;
    _prepayStartMonth = int.tryParse(_prepayStartMonthController.text) ?? 1;
    _moraMonths = int.tryParse(_moraMonthsController.text) ?? 0;
  }

  LoanResult _calculateCurrentLoan() {
    _syncInputs();
    return EmiCalculatorLogic.calculateLoan(LoanInput(
      principal: _principal,
      annualInterestRate: _interestRate,
      tenureMonths: _tenureMonths.round(),
      processingFeePercent: _processingFeePercent,
      prepaymentAmount: _prepayAmount,
      prepaymentFrequencyMonths: _prepayFreq,
      prepaymentStartMonth: _prepayStartMonth,
      prepaymentType: _prepayType,
      moratoriumMonths: _moraMonths,
      accrueMoratoriumInterest: _accrueMoraInterest,
    ));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF10B981), Color(0xFF059669)],
                ),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text(
                'EMI',
                style: TextStyle(fontWeight: FontWeight.w900, color: Colors.white, fontSize: 16),
              ),
            ),
            const SizedBox(width: 10),
            const Text(
              'EMI Calculator Pro',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(widget.isDarkTheme ? Icons.light_mode : Icons.dark_mode),
            onPressed: widget.onThemeToggle,
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: theme.primaryColor,
          labelColor: widget.isDarkTheme ? Colors.white : Colors.black,
          tabs: const [
            Tab(icon: Icon(Icons.calculate), text: 'EMI Calculator'),
            Tab(icon: Icon(Icons.compare_arrows), text: 'Compare Loans'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildCalculatorTab(),
          _buildCompareTab(),
        ],
      ),
    );
  }

  Widget _buildCalculatorTab() {
    final loanResult = _calculateCurrentLoan();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Upper Branding Info Card
          _buildBrandingCard(),
          const SizedBox(height: 16),

          // High-Tech Gradient Glass Card displaying main outputs
          _buildDashboardCard(loanResult),
          const SizedBox(height: 20),

          // Advanced Chart Breakdown
          _buildVisualBreakdownCard(loanResult),
          const SizedBox(height: 20),

          // Input controls
          _buildInputControlsSection(),
          const SizedBox(height: 20),

          // Extra Prepayments & Moratorium Options Expansion
          _buildAdvancedOptionsSection(),
          const SizedBox(height: 20),

          // Amortization Schedule Table
          _buildAmortizationTableSection(loanResult),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildBrandingCard() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: widget.isDarkTheme ? const Color(0xFF1E293B).withOpacity(0.4) : const Color(0xFFD1FAE5).withOpacity(0.5),
        border: Border.all(color: widget.isDarkTheme ? const Color(0xFF10B981).withOpacity(0.2) : const Color(0xFF10B981).withOpacity(0.3)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          const Icon(Icons.verified_user, color: Color(0xFF10B981), size: 28),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Varanasi Region Support',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                ),
                Text(
                  'Powered by premium Sales & Service',
                  style: TextStyle(
                    fontSize: 11,
                    color: widget.isDarkTheme ? Colors.white70 : Colors.black87,
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildDashboardCard(LoanResult res) {
    final isDark = widget.isDarkTheme;
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isDark
              ? [const Color(0xFF1E293B), const Color(0xFF0F172A)]
              : [Colors.white, const Color(0xFFF1F5F9)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF10B981).withOpacity(isDark ? 0.05 : 0.02),
            blurRadius: 20,
            spreadRadius: 2,
          )
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const Text(
            'MONTHLY EMI',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 2, color: Colors.grey),
          ),
          const SizedBox(height: 6),
          Text(
            '₹${res.monthlyEmi.toStringAsFixed(2)}',
            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Color(0xFF10B981)),
          ),
          const SizedBox(height: 20),
          const Divider(),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildResultItem('Total Interest', '₹${res.totalInterestPaid.toStringAsFixed(0)}'),
              _buildResultItem('Total Principal', '₹${res.totalPrincipalPaid.toStringAsFixed(0)}'),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildResultItem('Total Payment', '₹${res.totalPayment.toStringAsFixed(0)}'),
              _buildResultItem('Charges + GST', '₹${res.totalUpfrontCharges.toStringAsFixed(0)}'),
            ],
          ),
          if (res.tenureSavedMonths > 0 || res.interestSaved > 0) ...[
            const SizedBox(height: 16),
            const Divider(),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                if (res.tenureSavedMonths > 0)
                  _buildResultItem('Tenure Saved', '${res.tenureSavedMonths} Months', highlight: true),
                if (res.interestSaved > 0)
                  _buildResultItem('Interest Saved', '₹${res.interestSaved.toStringAsFixed(0)}', highlight: true),
              ],
            ),
          ],
          const SizedBox(height: 20),
          ElevatedButton.icon(
            onPressed: () async {
              await PdfService.generateAndShareLoanPdf(
                LoanInput(
                  principal: _principal,
                  annualInterestRate: _interestRate,
                  tenureMonths: _tenureMonths.round(),
                  processingFeePercent: _processingFeePercent,
                  prepaymentAmount: _prepayAmount,
                  prepaymentFrequencyMonths: _prepayFreq,
                  prepaymentStartMonth: _prepayStartMonth,
                  prepaymentType: _prepayType,
                  moratoriumMonths: _moraMonths,
                  accrueMoratoriumInterest: _accrueMoraInterest,
                ),
                res,
              );
            },
            icon: const Icon(Icons.picture_as_pdf),
            label: const Text('Export Premium PDF Report'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildResultItem(String title, String value, {bool highlight = false}) {
    return Column(
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 11, color: Colors.grey),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            color: highlight ? const Color(0xFF10B981) : (widget.isDarkTheme ? Colors.white : Colors.black87),
          ),
        ),
      ],
    );
  }

  Widget _buildVisualBreakdownCard(LoanResult res) {
    final isDark = widget.isDarkTheme;
    final total = res.totalPrincipalPaid + res.totalInterestPaid;
    final principalPercent = total > 0 ? (res.totalPrincipalPaid / total) * 100 : 0.0;
    final interestPercent = total > 0 ? (res.totalInterestPaid / total) * 100 : 0.0;

    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Visual Breakdowns',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                flex: 4,
                child: SizedBox(
                  height: 140,
                  child: PieChart(
                    PieChartData(
                      sectionsSpace: 4,
                      centerSpaceRadius: 40,
                      sections: [
                        PieChartSectionData(
                          color: const Color(0xFF10B981),
                          value: principalPercent,
                          title: '${principalPercent.toStringAsFixed(1)}%',
                          radius: 30,
                          titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        PieChartSectionData(
                          color: Colors.redAccent,
                          value: interestPercent,
                          title: '${interestPercent.toStringAsFixed(1)}%',
                          radius: 30,
                          titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Expanded(
                flex: 5,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildLegendItem(const Color(0xFF10B981), 'Principal Component', '₹${res.totalPrincipalPaid.toStringAsFixed(0)}'),
                    const SizedBox(height: 10),
                    _buildLegendItem(Colors.redAccent, 'Interest Component', '₹${res.totalInterestPaid.toStringAsFixed(0)}'),
                  ],
                ),
              )
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLegendItem(Color color, String label, String val) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 12,
          height: 12,
          margin: const EdgeInsets.only(top: 2),
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
              Text(val, style: const TextStyle(fontSize: 11, color: Colors.grey)),
            ],
          ),
        )
      ],
    );
  }

  Widget _buildInputControlsSection() {
    final isDark = widget.isDarkTheme;
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Loan Parameters',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),

          // Principal
          _buildInputSlider(
            title: 'Loan Principal (₹)',
            value: _principal,
            min: 10000,
            max: 10000000,
            step: 50000,
            controller: _pController,
            onChanged: (val) {
              setState(() {
                _principal = val;
                _pController.text = val.round().toString();
              });
            },
          ),
          const SizedBox(height: 20),

          // Rate
          _buildInputSlider(
            title: 'Interest Rate (% p.a.)',
            value: _interestRate,
            min: 5,
            max: 25,
            step: 0.1,
            controller: _rController,
            onChanged: (val) {
              setState(() {
                _interestRate = double.parse(val.toStringAsFixed(1));
                _rController.text = _interestRate.toString();
              });
            },
          ),
          const SizedBox(height: 20),

          // Tenure
          _buildInputSlider(
            title: 'Tenure (Months)',
            value: _tenureMonths,
            min: 12,
            max: 360,
            step: 12,
            controller: _nController,
            onChanged: (val) {
              setState(() {
                _tenureMonths = val;
                _nController.text = val.round().toString();
              });
            },
          ),
          const SizedBox(height: 20),

          // Processing fee
          _buildInputSlider(
            title: 'Processing Fee (%)',
            value: _processingFeePercent,
            min: 0.0,
            max: 5.0,
            step: 0.1,
            controller: _feeController,
            onChanged: (val) {
              setState(() {
                _processingFeePercent = double.parse(val.toStringAsFixed(2));
                _feeController.text = _processingFeePercent.toString();
              });
            },
          ),
        ],
      ),
    );
  }

  Widget _buildInputSlider({
    required String title,
    required double value,
    required double min,
    required double max,
    required double step,
    required TextEditingController controller,
    required ValueChanged<double> onChanged,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            SizedBox(
              width: 120,
              height: 35,
              child: TextFormField(
                controller: controller,
                keyboardType: TextInputType.number,
                textAlign: TextAlign.end,
                decoration: const InputDecoration(
                  contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  border: OutlineInputBorder(),
                ),
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                onFieldSubmitted: (val) {
                  double? parsed = double.tryParse(val);
                  if (parsed != null) {
                    if (parsed < min) parsed = min;
                    if (parsed > max) parsed = max;
                    onChanged(parsed);
                  }
                },
              ),
            ),
          ],
        ),
        Slider(
          value: value.clamp(min, max),
          min: min,
          max: max,
          divisions: ((max - min) / step).round(),
          onChanged: onChanged,
        ),
      ],
    );
  }

  Widget _buildAdvancedOptionsSection() {
    final isDark = widget.isDarkTheme;
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.bolt, color: Color(0xFF10B981)),
              SizedBox(width: 8),
              Text(
                'Prepayment & Moratorium Pro',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Extra prepay amount
          TextFormField(
            controller: _prepayAmountController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Prepayment / Extra Amount (₹)',
              border: OutlineInputBorder(),
              contentPadding: EdgeInsets.all(12),
            ),
            onChanged: (val) => setState(() {}),
          ),
          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: TextFormField(
                  controller: _prepayFreqController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Frequency (0=once, 12=yearly)',
                    border: OutlineInputBorder(),
                    contentPadding: EdgeInsets.all(12),
                  ),
                  onChanged: (val) => setState(() {}),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: TextFormField(
                  controller: _prepayStartMonthController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Starting Month',
                    border: OutlineInputBorder(),
                    contentPadding: EdgeInsets.all(12),
                  ),
                  onChanged: (val) => setState(() {}),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Prepayment action selection
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Prepayment Strategy: ', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
              DropdownButton<PrepaymentType>(
                value: _prepayType,
                onChanged: (PrepaymentType? type) {
                  if (type != null) {
                    setState(() {
                      _prepayType = type;
                    });
                  }
                },
                items: const [
                  DropdownMenuItem(
                    value: PrepaymentType.reduceTenure,
                    child: Text('Reduce Tenure'),
                  ),
                  DropdownMenuItem(
                    value: PrepaymentType.reduceEmi,
                    child: Text('Reduce Monthly EMI'),
                  ),
                ],
              ),
            ],
          ),
          const Divider(height: 24),

          // Moratorium Option
          TextFormField(
            controller: _moraMonthsController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Moratorium Period (Months)',
              border: OutlineInputBorder(),
              contentPadding: EdgeInsets.all(12),
            ),
            onChanged: (val) => setState(() {}),
          ),
          const SizedBox(height: 12),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Accrue Interest during Moratorium', style: TextStyle(fontSize: 13)),
              Switch(
                value: _accrueMoraInterest,
                onChanged: (val) {
                  setState(() {
                    _accrueMoraInterest = val;
                  });
                },
                activeThumbColor: const Color(0xFF10B981),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAmortizationTableSection(LoanResult res) {
    final isDark = widget.isDarkTheme;
    final maxToShow = 24; // Show first 24 months to keep UI smooth, rest can be exported to PDF

    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Repayment Schedule',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
              ),
              Text(
                'Showing ${res.schedule.length > maxToShow ? maxToShow : res.schedule.length}/${res.schedule.length} Months',
                style: const TextStyle(fontSize: 12, color: Colors.grey),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columnSpacing: 16,
              horizontalMargin: 8,
              headingRowHeight: 40,
              dataRowMinHeight: 35,
              dataRowMaxHeight: 35,
              columns: const [
                DataColumn(label: Text('Month', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
                DataColumn(label: Text('Emi (₹)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
                DataColumn(label: Text('Interest (₹)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
                DataColumn(label: Text('Principal (₹)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
                DataColumn(label: Text('Extra (₹)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
                DataColumn(label: Text('Balance (₹)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
              ],
              rows: res.schedule.take(maxToShow).map((m) {
                return DataRow(cells: [
                  DataCell(Text(m.month.toString(), style: const TextStyle(fontSize: 11))),
                  DataCell(Text(m.emi.toStringAsFixed(0), style: const TextStyle(fontSize: 11))),
                  DataCell(Text(m.interest.toStringAsFixed(0), style: const TextStyle(fontSize: 11))),
                  DataCell(Text(m.principalPaid.toStringAsFixed(0), style: const TextStyle(fontSize: 11))),
                  DataCell(Text(m.extraPayment.toStringAsFixed(0), style: const TextStyle(fontSize: 11))),
                  DataCell(Text(m.closingBalance.toStringAsFixed(0), style: const TextStyle(fontSize: 11))),
                ]);
              }).toList(),
            ),
          ),
          if (res.schedule.length > maxToShow) ...[
            const SizedBox(height: 10),
            const Text(
              'Export PDF to view the complete amortization schedule table.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 11, color: Colors.grey, fontStyle: FontStyle.italic),
            ),
          ]
        ],
      ),
    );
  }

  Widget _buildCompareTab() {
    final isDark = widget.isDarkTheme;

    // Calculate Scenario 1
    double p1 = double.tryParse(_p1Controller.text) ?? 1000000;
    double r1 = double.tryParse(_r1Controller.text) ?? 8.5;
    int n1 = int.tryParse(_n1Controller.text) ?? 120;
    final res1 = EmiCalculatorLogic.calculateLoan(LoanInput(principal: p1, annualInterestRate: r1, tenureMonths: n1));

    // Calculate Scenario 2
    double p2 = double.tryParse(_p2Controller.text) ?? 1000000;
    double r2 = double.tryParse(_r2Controller.text) ?? 9.2;
    int n2 = int.tryParse(_n2Controller.text) ?? 120;
    final res2 = EmiCalculatorLogic.calculateLoan(LoanInput(principal: p2, annualInterestRate: r2, tenureMonths: n2));

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Loan Comparison Tool',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 6),
          const Text(
            'Compare two loan options side-by-side to choose the smartest financial option.',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
          const SizedBox(height: 16),

          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Loan Option 1 Card
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF1E293B) : Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFF10B981).withOpacity(0.4)),
                  ),
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('OPTION 1', style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 12)),
                      const SizedBox(height: 10),
                      TextFormField(
                        controller: _p1Controller,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Principal (₹)', isDense: true),
                        onChanged: (val) => setState(() {}),
                      ),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: _r1Controller,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Rate (% p.a.)', isDense: true),
                        onChanged: (val) => setState(() {}),
                      ),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: _n1Controller,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Tenure (Months)', isDense: true),
                        onChanged: (val) => setState(() {}),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // Loan Option 2 Card
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF1E293B) : Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.blue.withOpacity(0.4)),
                  ),
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('OPTION 2', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold, fontSize: 12)),
                      const SizedBox(height: 10),
                      TextFormField(
                        controller: _p2Controller,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Principal (₹)', isDense: true),
                        onChanged: (val) => setState(() {}),
                      ),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: _r2Controller,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Rate (% p.a.)', isDense: true),
                        onChanged: (val) => setState(() {}),
                      ),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: _n2Controller,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(labelText: 'Tenure (Months)', isDense: true),
                        onChanged: (val) => setState(() {}),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Side-by-Side Comparison Output
          Container(
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1E293B) : Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
            ),
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Side-by-Side Analysis', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                _buildComparisonRow('Monthly EMI', '₹${res1.monthlyEmi.toStringAsFixed(0)}', '₹${res2.monthlyEmi.toStringAsFixed(0)}'),
                const Divider(),
                _buildComparisonRow('Total Interest', '₹${res1.totalInterestPaid.toStringAsFixed(0)}', '₹${res2.totalInterestPaid.toStringAsFixed(0)}', highlightLess: true, val1Numeric: res1.totalInterestPaid, val2Numeric: res2.totalInterestPaid),
                const Divider(),
                _buildComparisonRow('Total Payment', '₹${res1.totalPayment.toStringAsFixed(0)}', '₹${res2.totalPayment.toStringAsFixed(0)}', highlightLess: true, val1Numeric: res1.totalPayment, val2Numeric: res2.totalPayment),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildComparisonRow(
    String label,
    String val1,
    String val2, {
    bool highlightLess = false,
    double? val1Numeric,
    double? val2Numeric,
  }) {
    bool val1Better = false;
    bool val2Better = false;

    if (highlightLess && val1Numeric != null && val2Numeric != null) {
      if (val1Numeric < val2Numeric) {
        val1Better = true;
      } else if (val2Numeric < val1Numeric) {
        val2Better = true;
      }
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Expanded(flex: 3, child: Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
          Expanded(
            flex: 2,
            child: Text(
              val1,
              textAlign: TextAlign.right,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: val1Better ? const Color(0xFF10B981) : (widget.isDarkTheme ? Colors.white : Colors.black87),
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Text(
              val2,
              textAlign: TextAlign.right,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: val2Better ? const Color(0xFF10B981) : (widget.isDarkTheme ? Colors.white : Colors.black87),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
