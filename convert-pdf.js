const fs = require('fs');
const PDFDocument = require('pdfkit');

// JSON data
const jsonData = [
    {
        "title": "Whitley Villas",
        "address": "115F Whitley Road Newton / Novena (D11)",
        "distance": "5 mins (420 m) from TE10 Mount Pleasant MRT",
        "amount": "4080000",
        "link": "https://www.propertyguru.com.sg/listing/for-sale-whitley-villas-24785505",
        "about": "About this propertyRare Freehold Corner Semi D in D11New exclusive listing.If you are looking for a freehold semi d around $4.5M, this might be the perfect home for you.Pure selling, NO Extension required!Cobroke welcome, 50/50!3 Storey + basement Corner Semi D in D11Built Up: 3025 sqftTenure: FreeholdMCST Fees: $1000/QuarterFurthest unit from main road offering lots of space, quiet and privacyBasement:- Private parking for 2 cars- Granny room en suite- Helper's room with own toilet- Home shelter- Storage- Backyard Laundry areaLevel 1:- direct access to swimming pool- Living room- Dining area- Wet and dry kitchen- Good size outside patio area, big enough for outdoor family dining or   BBQ area- Good sized back yard- ToiletLevel 2- 1 en suite bedroom- 2 common bedrooms + common bathroomLevel 3- Huge master bedroom en suite with walk in wardrobe------------------------------------------------------------------------------------------------------Transport:- Mount Pleasant Mrt (TE 10): 0.35km- Novena Mrt (NS 20): 0.97kmPrimary schools:- Anglo-Chinese School: 0.87km- CHIJ TPY: 0.92km- Singapore Chinese Girl's School: 1.27km- St Joseph's Institution Junior: 1.35km- Marymount Convent School: 1.55kmChildcare:- Chiltern House: 0.77km- Pat's Schoolhouse: 0.79km- Mindchamps: 0.83km- Kiddiwinkie Schoolhouse: 0.80km- The Little Skool-house International: 0.83kmMalls & Supermarket:- Balestier Hill Shopping Centre: 0.5km- Square 2: 0.9km- Zhongshan Mall: 1km- Novena Square: 1km- Velocity@ novena Square: 1kmConnect with Alvin today to view this fantastic property right away. Show more",
        "bed": 5,
        "bath": 6,
        "sqft": "3025",
        "psf": "S$ 1,321",
        "createdAt": "2024-04-22 23:29:33",
        "updatedAt": "2024-04-22 23:29:33",
        "deletedAt": null
    },
    {
        "title": "Lorencia",
        "address": "Lorencia",
        "distance": "5 mins (420 m) from TE10 Mount Pleasant MRT",
        "amount": "3000",
        "link": "https://www.propertyguru.com.sg/listing/for-sale-whitley-villas-24785505",
        "about": "About this propertyRare Freehold Corner Semi D in D11New exclusive listing.If you are looking for a freehold semi d around $4.5M, this might be the perfect home for you.Pure selling, NO Extension required!Cobroke welcome, 50/50!3 Storey + basement Corner Semi D in D11Built Up: 3025 sqftTenure: FreeholdMCST Fees: $1000/QuarterFurthest unit from main road offering lots of space, quiet and privacyBasement:- Private parking for 2 cars- Granny room en suite- Helper's room with own toilet- Home shelter- Storage- Backyard Laundry areaLevel 1:- direct access to swimming pool- Living room- Dining area- Wet and dry kitchen- Good size outside patio area, big enough for outdoor family dining or   BBQ area- Good sized back yard- ToiletLevel 2- 1 en suite bedroom- 2 common bedrooms + common bathroomLevel 3- Huge master bedroom en suite with walk in wardrobe------------------------------------------------------------------------------------------------------Transport:- Mount Pleasant Mrt (TE 10): 0.35km- Novena Mrt (NS 20): 0.97kmPrimary schools:- Anglo-Chinese School: 0.87km- CHIJ TPY: 0.92km- Singapore Chinese Girl's School: 1.27km- St Joseph's Institution Junior: 1.35km- Marymount Convent School: 1.55kmChildcare:- Chiltern House: 0.77km- Pat's Schoolhouse: 0.79km- Mindchamps: 0.83km- Kiddiwinkie Schoolhouse: 0.80km- The Little Skool-house International: 0.83kmMalls & Supermarket:- Balestier Hill Shopping Centre: 0.5km- Square 2: 0.9km- Zhongshan Mall: 1km- Novena Square: 1km- Velocity@ novena Square: 1kmConnect with Alvin today to view this fantastic property right away. Show more",
        "bed": 2,
        "bath": 1,
        "sqft": "3025",
        "psf": "S$ 3,321",
        "createdAt": "2024-04-22 23:29:33",
        "updatedAt": "2024-04-22 23:29:33",
        "deletedAt": null
    }
];

// Function to create PDF
function createPDF(data, filename) {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filename);
    doc.pipe(stream);

    data.forEach(property => {
        doc.text(`Title: ${property.title}`);
        doc.moveDown();
        doc.text(`Address: ${property.address}`);
        doc.moveDown();
        doc.text(`Bedrooms: ${property.bed}`);
        doc.moveDown();
        doc.text(`Bathrooms: ${property.bath}`);
        doc.moveDown();
        doc.text(`Price: ${property.amount}`);
        doc.moveDown();
        doc.text(`Property Details: ${property.about}`);
        doc.moveDown();
        doc.moveDown(); // Add extra space between properties
    });

    doc.end();
    console.log(`PDF file "${filename}" created successfully.`);
}

// Generate PDF
createPDF(jsonData, 'property_info.pdf');