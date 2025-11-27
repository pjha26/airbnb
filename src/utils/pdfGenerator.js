import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateReceiptPDF = (booking) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // --- Header ---
    // Logo (Text for now)
    doc.setFontSize(24);
    doc.setTextColor(255, 56, 92); // Airbnb/Ghumo Red
    doc.setFont('helvetica', 'bold');
    doc.text('Ghumo', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text('Receipt & Booking Confirmation', 20, 26);

    // Booking ID & Date
    doc.text(`Booking ID: ${booking.id.substring(0, 8).toUpperCase()}`, pageWidth - 20, 20, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, 26, { align: 'right' });

    // Divider
    doc.setDrawColor(220);
    doc.line(20, 35, pageWidth - 20, 35);

    // --- Property Details ---
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text(booking.listing.title, 20, 50);

    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.setFont('helvetica', 'normal');
    doc.text(booking.listing.location, 20, 58);

    // --- Stay Details ---
    const startDate = new Date(booking.startDate).toLocaleDateString();
    const endDate = new Date(booking.endDate).toLocaleDateString();

    autoTable(doc, {
        startY: 70,
        head: [['Check-in', 'Check-out', 'Guests']],
        body: [[startDate, endDate, `${booking.guests} Guests`]],
        theme: 'plain',
        styles: { fontSize: 12, cellPadding: 5 },
        headStyles: { fontStyle: 'bold', textColor: 50 },
    });

    // --- Payment Breakdown ---
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Details', 20, doc.lastAutoTable.finalY + 20);

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 30,
        body: [
            ['Total Amount Paid', `INR ${booking.totalPrice.toLocaleString('en-IN')}`],
            ['Payment Status', 'Paid'],
        ],
        theme: 'striped',
        styles: { fontSize: 12, cellPadding: 8 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 100 },
            1: { halign: 'right' },
        },
    });

    // --- Footer ---
    const footerY = doc.internal.pageSize.height - 30;
    doc.setDrawColor(220);
    doc.line(20, footerY, pageWidth - 20, footerY);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Thank you for traveling with Ghumo!', 20, footerY + 10);
    doc.text('Questions? Contact support@ghumo.com', 20, footerY + 16);

    // Save PDF
    doc.save(`Ghumo_Receipt_${booking.id.substring(0, 8)}.pdf`);
};
