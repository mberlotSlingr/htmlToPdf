# htmlToPdf

A Slingr service that converts HTML content into PDF documents.

## Overview

This repository contains a Slingr service wrapper around a Node.js HTML-to-PDF library. Its purpose is to let Slingr apps generate PDF files from HTML templates or raw HTML content in a simple, reusable way.

## What this project does

With this service, an application can:

- Convert HTML strings into PDF documents
- Generate printable documents such as invoices, reports, certificates, and forms
- Centralize PDF generation behind a Slingr service interface
- Reuse the same PDF generation capabilities across different Slingr apps

## How it fits in Slingr

In Slingr, services expose external capabilities to apps through a standard integration interface. This project packages HTML-to-PDF functionality so it can be consumed as a service instead of requiring each app to implement PDF generation on its own.

## Typical use cases

Common scenarios for this service include:

- Creating invoices and receipts
- Exporting reports to PDF
- Rendering contracts or business documents
- Producing downloadable or printable versions of app data

## Repository purpose

This repository is intended to:

- Encapsulate PDF generation logic
- Provide a maintainable integration point for Slingr-based solutions
- Simplify document generation workflow
