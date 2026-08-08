import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:share_plus/share_plus.dart';
import 'package:open_file/open_file.dart';
import 'emi_calculator_logic.dart';

class PdfService {
  static Future<void> generateAndShareLoanPdf(LoanInput input, LoanResult result) async {
    final pdf = pw.Document();

    pdf.addPage(
      pw.MultiPage(
        pageFormat: PdfPageFormat.a4,
        build: (context) => [
          pw.Header(
            level: 0,
            child: pw.Row(
              mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
              children: [
                pw.Column(
                  crossAxisAlignment: pw.CrossAxisAlignment.start,
                  children: [
                    pw.Text('EMI Pro Enterprises', style: pw.TextStyle(fontSize: 24, fontWeight: pw.FontWeight.bold)),
                    pw.Text('Babatpur, Varanasi, U.P. - 221006', style: const pw.TextStyle(fontSize: 10)),
                  ],
                ),
                pw.Column(
                  crossAxisAlignment: pw.CrossAxisAlignment.end,
                  children: [
                    pw.Text('EMI Pro Report', style: pw.TextStyle(fontSize: 16, fontWeight: pw.FontWeight.bold)),
                    pw.Text('Genuine Sales & Service', style: const pw.TextStyle(fontSize: 10)),
                  ],
                ),
              ],
            ),
          ),
          pw.SizedBox(height: 15),
          pw.Text('Loan Amortization & Calculation Summary', style: pw.TextStyle(fontSize: 14, fontWeight: pw.FontWeight.bold)),
          pw.SizedBox(height: 10),
          pw.Table(
            border: pw.TableBorder.all(color: PdfColors.grey300),
            children: [
              _buildPdfRow('Loan Principal', 'INR ${input.principal.toStringAsFixed(0)}'),
              _buildPdfRow('Annual Interest Rate', '${input.annualInterestRate}%'),
              _buildPdfRow('Tenure Months', '${input.tenureMonths}'),
              _buildPdfRow('Monthly EMI', 'INR ${result.monthlyEmi.toStringAsFixed(2)}'),
              _buildPdfRow('Processing Fee + GST (18%)', 'INR ${result.totalUpfrontCharges.toStringAsFixed(2)}'),
              _buildPdfRow('Total Interest Payable', 'INR ${result.totalInterestPaid.toStringAsFixed(2)}'),
              _buildPdfRow('Total Amount Payable', 'INR ${result.totalPayment.toStringAsFixed(2)}'),
              if (result.tenureSavedMonths > 0)
                _buildPdfRow('Tenure Saved', '${result.tenureSavedMonths} Months'),
              if (result.interestSaved > 0)
                _buildPdfRow('Interest Saved', 'INR ${result.interestSaved.toStringAsFixed(2)}'),
            ],
          ),
          pw.SizedBox(height: 20),
          pw.Text('Amortization Schedule (First 36 Months)', style: pw.TextStyle(fontSize: 12, fontWeight: pw.FontWeight.bold)),
          pw.SizedBox(height: 8),
          pw.Table(
            border: pw.TableBorder.all(color: PdfColors.grey300),
            children: [
              pw.TableRow(
                decoration: const pw.BoxDecoration(color: PdfColors.grey100),
                children: [
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('Month', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('Opening Bal', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('EMI', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('Interest', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('Principal', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('Extra', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('Closing Bal', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 9))),
                ],
              ),
              ...result.schedule.take(36).map((m) => pw.TableRow(
                children: [
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('${m.month}', style: const pw.TextStyle(fontSize: 8))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('INR ${m.openingBalance.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('INR ${m.emi.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('INR ${m.interest.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('INR ${m.principalPaid.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('INR ${m.extraPayment.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8))),
                  pw.Padding(padding: const pw.EdgeInsets.all(4), child: pw.Text('INR ${m.closingBalance.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8))),
                ],
              )),
            ],
          ),
          pw.SizedBox(height: 20),
          pw.Divider(),
          pw.Center(
            child: pw.Text(
              'Thank you for using EMI Pro. Contact us at technologyemipro@gmail.com / +91 8787260552 for CCTV, computer, solar setup enquiries.',
              textAlign: pw.TextAlign.center,
              style: const pw.TextStyle(fontSize: 8, color: PdfColors.grey),
            ),
          )
        ],
      ),
    );

    try {
      final output = await getTemporaryDirectory();
      final file = File('${output.path}/EMI_Pro_Report.pdf');
      await file.writeAsBytes(await pdf.save());

      // Share report file
      await Share.shareXFiles([XFile(file.path)], text: 'EMI Pro Loan Report');

      // Attempt to open file locally if possible
      await OpenFile.open(file.path);
    } catch (e) {
      // safe fallback for headless/test scenarios
    }
  }

  static pw.TableRow _buildPdfRow(String label, String value) {
    return pw.TableRow(
      children: [
        pw.Padding(padding: const pw.EdgeInsets.all(6), child: pw.Text(label, style: const pw.TextStyle(fontSize: 10))),
        pw.Padding(padding: const pw.EdgeInsets.all(6), child: pw.Text(value, style: pw.TextStyle(fontSize: 10, fontWeight: pw.FontWeight.bold))),
      ],
    );
  }
}
