## The need

Handwritten timesheets (first name, last name, arrival and departure times) were typed into Excel one by one. The goal was to automate that data entry.

## What I built

A Windows application with a graphical interface (**Tkinter**) that:

1. reads the scanned PDF and extracts the information with **Tesseract OCR**;
2. shows a mandatory review screen, with thumbnails of the sheets, to fix reading errors;
3. automatically fills the Excel template, with one sheet per employee;
4. prepares the daily activity entry in the payroll software, using **Selenium**.

## What I take away

Handwriting is still hard for OCR to read. The review screen is therefore essential: the tool saves time without ever validating data on a human's behalf.
