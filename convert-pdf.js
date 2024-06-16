const fs = require("fs");
const PDFDocument = require("pdfkit");

// JSON data
const jsonData = [
  {
    title: "Hougang Landed Inter Terrace FH",
    fullAddressText: " Hougang / Punggol / Sengkang (D19)",
    distanceText: "14 mins (1.2 km) from NE14/CR8 Hougang MRT",
    amount: " S$ 3,798,000",
    about:
      "About this propertyFreehold 4 Bed 3 Bath 2-storey Hougang Landed Terrace1,873SQFT of FREEHOLD LANDEst. Built Up Area of 2,583 sqftWell Maintained & Renovated for the modern family aspiring for your own Freehold Land!6.5M Frontage x 27M Depth of HomeNorth East Facing3-5 mins walk to Hougang Midtown, Hougang Mall & Hougang Central6-8 mins walk to Hougang MRT & Bus Interchange (640m)1KM to 4 Reputable Schools:-\tHOLY INNOCENTS PRIMARY SCHOOL-\tCHIJ OUR LADY OF THE NATIVITY-\tPUNGGOL PRIMARY SCHOOL-\tMONTFORT JUNIOR SCHOOLFOR PLEASURE OF OWNERSHIP, CALL\n          8*****\n         TO SECURE A PRIVATE VIEWINGDISCLAIMER: ALL LAND, BUILT UP AREAS, FLOOR PLANS & MEASUREMENTS ARE BASED ON APPROXIMATE ESTIMATES. THEY ARE SUBJECT TO FINAL SURVEY AND SHALL NOT FORM PART OF ANY OFFER, CONTACT, OR CONSTITUTE ANY WARRANTY BY THE SALESPERSON AND SHALL NOT BE REGARDED AS STATEMENTS OR REPRESENTATIONS OF FACT. Show less",
    bed: "4",
    bath: "3",
    sqft: "1,873",
    psf: "S$ 2,028",
  },
  {
    title: "Flora View",
    fullAddressText:
      "1 Ang Mo Kio Street 66 Ang Mo Kio / Bishan / Thomson (D20)",
    distanceText: "18 mins (1.5 km) from NS15 Yio Chu Kang MRT",
    amount: " S$ 1,250,000",
    about:
      "About this propertyPenthouse Serenity: Condo Unit With Open Roof Terrace And Jacuzzi!CEA Registration: L3010858B / R059392GPreview in virtual tour: \n          www.h*****\n        Step into a world of luxurious tranquility with this exquisite penthouse condo unit which offers an exclusive open roof terrace with a relaxing Jacuzzi, making it the ultimate oasis for those seeking a retreat in the city.Situated on the penthouse floor, this unit features a corridor orientation, ensuring privacy and serenity. With its original condition, you have the opportunity to customize and design the space to your heart's desire. As you enter through the main door facing east, you'll be greeted by breathtaking views of the surrounding landscape, allowing you to unwind and reconnect with nature without leaving the comfort of your home.Convenience is at your doorstep with a 4-minute walk to the nearest bus stop and Yio Chu Kang MRT station just 7 bus stops away. A quick 7-minute walk takes you to a convenience store for your daily essentials, while a mere 1-minute stroll brings you to a variety of eateries, catering to all your culinary cravings. Families will appreciate the proximity to reputable schools within a 1-2 km radius. So hurry and schedule a viewing with us today to make this unit your home.Exclusive Propseller Listing!Size:- 1055 sqft.- 2 bedrooms + 2 bathrooms- JacuzziAttributes:- Extension needed: None- Unit orientation: Corridor unit- Penthouse floor unit- Original condition- Main door facing - East- Views from unit: LandscapeConvenience:- 4 mins walk to the nearest bus stop (bus services: 70, 86, 163, etc.)- 7 mins walk to the nearest convenience store- 1 min walk to the nearest eateries- 7 bus stops to Yio Chu Kang MRT- Schools within 1-2 km: Anderson Primary and Mayflower Primary. Show more",
    bed: "2",
    bath: "2",
    sqft: "1,055",
    psf: "S$ 1,185",
  },
  {
    title: "Hougang Landed Inter Terrace FH",
    fullAddressText: " Hougang / Punggol / Sengkang (D19)",
    distanceText: "14 mins (1.2 km) from NE14/CR8 Hougang MRT",
    amount: " S$ 3,798,000",
    about:
      "About this propertyFreehold 4 Bed 3 Bath 2-storey Hougang Landed Terrace1,873SQFT of FREEHOLD LANDEst. Built Up Area of 2,583 sqftWell Maintained & Renovated for the modern family aspiring for your own Freehold Land!6.5M Frontage x 27M Depth of HomeNorth East Facing3-5 mins walk to Hougang Midtown, Hougang Mall & Hougang Central6-8 mins walk to Hougang MRT & Bus Interchange (640m)1KM to 4 Reputable Schools:-\tHOLY INNOCENTS PRIMARY SCHOOL-\tCHIJ OUR LADY OF THE NATIVITY-\tPUNGGOL PRIMARY SCHOOL-\tMONTFORT JUNIOR SCHOOLFOR PLEASURE OF OWNERSHIP, CALL\n          8*****\n         TO SECURE A PRIVATE VIEWINGDISCLAIMER: ALL LAND, BUILT UP AREAS, FLOOR PLANS & MEASUREMENTS ARE BASED ON APPROXIMATE ESTIMATES. THEY ARE SUBJECT TO FINAL SURVEY AND SHALL NOT FORM PART OF ANY OFFER, CONTACT, OR CONSTITUTE ANY WARRANTY BY THE SALESPERSON AND SHALL NOT BE REGARDED AS STATEMENTS OR REPRESENTATIONS OF FACT. Show more",
    bed: "4",
    bath: "3",
    sqft: "1,873",
    psf: "S$ 2,028",
  },
  {
    title: "Surin Villas",
    fullAddressText: "Upper Serangoon Road Hougang / Punggol / Sengkang (D19)",
    distanceText: "12 mins (1000 m) from NE13 Kovan MRT",
    amount: " S$ 3,780,000",
    about:
      "About this propertyNicely renovated and convenient locationNew listPropNex Eminence Landed Team- Tenure: Freehold- Build up: 5231sqft- Rooms: 4 + 1- Ensuite: 4- Bath: 6Wet and dry kitchenSwimming poolCar porch for 2 carsExtension requiredLooking for a home that is bright and well ventilated? Look no further. Move in condition. Within 1km to Paya Lebar Methodist Girls School Show more",
    bed: "4",
    bath: "6",
    sqft: "5,231",
  },
  {
    title: "Jalan Kuang Semi-Detached Near Upper Changi Mrt",
    fullAddressText: "JALAN KUANG Bedok / Upper East Coast (D16)",
    distanceText: "9 mins (750 m) from DT34 Upper Changi MRT",
    amount: " S$ 5,480,000",
    about:
      "About this propertyRenovated semi detached near mrtEXCLUSIVE LISTING!Discover tranquillity and convenience in this charming 3-storey semi-detached home located just a 10-minute walk (750m) from Upper Changi MRT station. Situated in a serene neighbourhood, this house offers easy access to major expressways, including PIE, TPE, and ECP, making commuting a breeze. Changi Airport is a mere 10-minute drive away.Its proximity to SUTD, Changi Business Park, Singapore Expo, and East Point Mall adds to its appeal for both work and leisure. It can accommodate two cars comfortably.Level 1:- Living room- Dining room- Maid's room & bathroom- Wet and dry kitchen- PantryLevel 2:- Master bedroom with ensuite and walk-in wardrobe- 2 large common rooms with shared bathroom- Large roof terraceLevel 3:- 1 large common room with ensuite-  Common room-  BalconyDon't miss this opportunity to own a slice of tranquillity in a highly sought-after location. Schedule your viewing today! Show more",
    bed: "5",
    bath: "5",
    sqft: "2,800",
    psf: "S$ 1,957",
  },

  {
    title: "The Reserve Residences",
    fullAddressText:
      "9 Jalan Anak Bukit Clementi Park / Upper Bukit Timah (D21)",
    distanceText: "14 mins (1.1 km) from DT5 Beauty World MRT",
    amount: " S$ 3,512,885",
    about:
      "About this propertyDirect from developer! Star Buy! Integrated development @ Beauty WorldDirect Developer 1st Hand Prices! Call Developer Sales Team. No Commission Require 免佣金!️THE RESERVE RESIDENCES️Direct Connect To Beauty World MRT & Integrated With Bus Interchange 直接连接美世界地铁站并与巴士转换站整合!2024年最佳新品之一. 购物中心和地铁内的最佳城市边缘的开发项目, 私人电梯, 千万不要在错过了! 2024年独家高尚富贵新楼盘！Discounts Available 优惠价格，考查发展项目，请拨热线开发商销售热线\n          9*****\n         嘉宾预购可享特价优惠!您的一站式房地产服务. 最靠谱的房产中介.Condo Name 公寓名: THE RESERVE RESIDENCESAddress 地址: 9 - 23 Jalan Anak BukitDeveloper 发展商: Far East Organization & Sino GroupDistrict 邮区: 21Tenure 产权年限: 99TOP 建筑年份: 2027Total Units 总单位数: 4 Low-Rise Towers 6-11 Storeys, 2 Mid-Rise Towers 4-16 Storeys & 2 High-Rise Towers 4-32 Storeys, Total 732 Residential, 160 Serviced ResidencesFacilities 设施: Full Condo Facilities- 1 Bdr: 441 & 495 sqft (100 units)- 2 Bdr: 560 - 743 sqft (250 units)- 2+Study: 721 - 807 sqft (54 units)- 3 Bdr: 883 - 1,378 sqft (126 units)- 3+Study: 1,216 sqft (14 units)- 3+Flexi+Lift: 1,313 & 1,324 sqft (76 units)- 4+Lift: 1,475 - 1,625 sqft (91 units)- 4+Study+Lift: 1,561 - 2,250 sqft (3 units)- 5+Lift: 1,765 - 3,003 sqft (7 units)- 5 Bdr PH+Lift: 2,486 - 2,809 sqft (5 units)Elite Schools Nearby Are Raffles Girls’ Primary, Nanyang Primary, Hwa Chong Institution, Nanyang Girls’ High, NUS, NJC, Ngee Ann Polytechnic And More...Shopping Malls Nearby Are Bukit Timah Plaza, Beauty World Centre, The Grandstand, The Rail Mall, All Holland Shopping Belts And More...Best City Fringe Prime AreaIdeal for Investments & Own StayBeautiful Landscape Area DesignFor The Exclusive PrestigeForeigner Welcome To Purchase️地处新加坡黄金地段️优越的地理位置和丰富的周边设施️设施便利，餐饮选择多样，附近名校云集️开车短车程内到达滨海湾金融中心和中央商业区️不限制外国人购买️公寓设施遍布广泛，配套齐全多功能️ 这是您生活的理想场所，能够提供给您中部最好的设施，从购物到美食再到学校。同时又十分接近新加坡的中央商务区并且有世界知名的娱乐设施供您选择, 使您的日常通勤变得轻而易举优惠价格, 考查发展项目, Direct Developers' Showflat Sales Hotline 请拨热线开发商销售热线\n          9*****\n        嘉宾预购可享特价优惠, 确保你买到最低特别优惠价!Disclaimer: Prices, sizes and units availability are subject to change at anytime without prior notice. Show more",
    bed: "3",
    bath: "3",
    sqft: "1,378",
    psf: "S$ 2,549",
  },
  {
    title:
      "⭐️⭐️LANDED7772@2 STOREY DETACHED WITH CHARACTER THAT RARELY COME BY, 1KM TO SJI, NOVENA SQ/MRT",
    fullAddressText: " Newton / Novena (D11)",
    distanceText: "12 mins (1 km) from NS20 Novena MRT",
    amount: " S$ 9,990,000",
    about:
      "About this propertyA unique chracter detached house within 1km to Sji, Mrt and Malls.New List at D112 storey detached house with its unique character. Can renovate and move in if you love this cosy house. Can major A&A or rebuild for your own option* Can redevelop and subdivide Land approx 4858 sfBuilt up approx 4000sfSimple and Well kept condFrontage > 18mSee to believe 1km to SJIClose to Novena Square, Velocity etc.Mins to Orchard and city.Call KL Goh\n          8*****\n         Show more",
    bed: "5",
    bath: "3",
    sqft: "4,858",
    psf: "S$ 2,056",
  },
  {
    title: "212A Punggol Walk",
    fullAddressText: "212A Punggol Walk Hougang / Punggol / Sengkang (D19)",
    distanceText: "10 mins (840 m) from PW7 Soo Teck LRT",
    amount: " S$ 650,000",
    about:
      "About this property6-8 mins walk to Punggol MRT Station.--- Unit Information ---• Renovated & Well maintained unit• 3 bedrooms all intact• Bright and breezy unit• Main door faces South• Located near Punggol MRT and Waterway Point which is 8 mins walk away• 6-8 mins by foot to bus interchange & Punggol MRTViewings are strictly by appointment & availability of the sellers.For more details and viewing of unit, call Terence Tham Now to make an appointment with me.~~~~~~~~~~~~~~~~Looking for your next Dream Home? We focus strongly in HDB & can be successfully found through US within a short time!! (BUY / SELL / RENT).Call/SMS/whatsapp us your criteria and we will get back to you at the earliest possible time to assist you.Sellers who are looking to Sell & Upgrade, do contact me for more details and information. We can have a non-obligatory meet up for a coffee chat.SEA Delivers Results!! Show more",
    bed: "3",
    bath: "2",
    sqft: "1,001",
    psf: "S$ 649",
  },
  {
    title: "Riversails",
    fullAddressText:
      "24 Upper Serangoon Crescent Hougang / Punggol / Sengkang (D19)",
    distanceText: "9 mins (740 m) from SE4 Kangkar LRT",
    amount: " S$ 1,230,000",
    about:
      "About this propertyNew Listing for Sale!Selling with tenancy! Point block unit!High Floor!Pool View!Functional Layout!Master room can fit king sized bed!Spacious kitchen!Come with Balcony and Household Shelter!Very well-maintained!No west sun!Viewing by appointment only! Show more",
    bed: "2",
    bath: "2",
    sqft: "882",
    psf: "S$ 1,395",
  },
  {
    title: "Livia",
    fullAddressText: "73 Pasir Ris Grove Pasir Ris / Tampines (D18)",
    distanceText: "17 mins (1.4 km) from CP1/EW1/CR5 Pasir Ris MRT",
    amount: " S$ 1,150,000",
    about:
      "About this propertyPool Facing 2 Bedroom plus Study2 Bedroom + Study & 2 BathroomRegular layout; no odd shapes No West SunFull Condo FacilitiesPool Facing Enclosed KitchenGood Sized Bedrooms Call for an exclusive viewing appointment today! Show more",
    bed: "2",
    bath: "2",
    sqft: "915",
    psf: "S$ 1,257",
  },
  {
    title: "Avila Terrace",
    fullAddressText: "Mariam Way Changi Airport / Changi Village (D17)",
    distanceText: "12 mins (990 m) from CR4 Pasir Ris East MRT",
    amount: " S$ 3,850,000",
    about:
      "About this property100% move in condition!Fully renovated house not more than 5 years100% move in conditionLevel 1: Bedroom with ample storage space Level 2: 3 Bedrooms Level 3: 1 Bedroom + Family Room (Can be converted into Bedroom)Convenient parking spaces right outside the house Rare unblock views Ample space for outdoor gardeningSquarish Layout, no odd shapes Bus stop conveniently located within minutes walkMajor expressway within minutes drive WhatsApp me for an exclusive viewing today Show more",
    bed: "5",
    bath: "3",
    sqft: "1,757",
    psf: "S$ 2,191",
  },
  {
    title: "Austville Residences",
    fullAddressText:
      "13 Sengkang East Avenue Hougang / Punggol / Sengkang (D19)",
    distanceText: "9 mins (780 m) from SE5 Ranggung LRT",
    amount: " S$ 1,100,000",
    about:
      "About this propertyVery Well Maintained HouseWell maintained unit up for grabs!Well maintained unit Squarish layout with no wastage in space North South facing unit with no afternoon sunComes with an enclosed kitchen and ample storage space available Suitable for own stay or investmentEnjoy the Serenity within the development with full condo facilities Close proximity to amenities Bus stop right outside the project Mins away from major expressway Nearby primary school:North Spring Primary SchoolNorth Vista Primary SchoolWhatsapp me for an exclusive viewing today! Show more",
    bed: "2",
    bath: "2",
    sqft: "786",
    psf: "S$ 1,399",
  },
  {
    title: "Huge Corner Terrace @Telok Kurau",
    fullAddressText: " East Coast / Marine Parade (D15)",
    distanceText: "10 mins (820 m) from EW7 Eunos MRT",
    amount: " S$ 6,998,000",
    about:
      "About this propertyRare 4 ensuite bdrms, Huge land size, Corner Terrace**South facing, great wind flow throughout the house****Rare land size (>4,500sf)****4 spacious ensuite bedrooms****Unique air well for abundance of natural light****3D Virtual Tour available! WhatsApp me for the link!**- 3 Storey Corner Terrace in the East- Freehold- Land size: 4,700sf- Build up area: 4,500sf- 5 bedrooms + 5 baths- Big garden space- Unique air well allows flow of natural light or lift provision- First floor: 1 bedroom plus common bathroom- Second floor: 2 ensuite bedrooms- Third floor: 2 ensuite bedrooms- Minutes walk to Kembangan MRT station- Within 1km to Haig Girl's Schl and St. Stephen's Schl- Close proximity to enclave of eateries in Joo Chiat, Katong and Marine ParadePlease contact Yan Goh for your exclusive house tour today!Another Quality Listing of:Huttons Landed DivisionWe LAND Results for YOU!Huttons Real Estate Group Show more",
    bed: "5",
    bath: "5",
    sqft: "4,700",
    psf: "S$ 1,489",
  },
  {
    title: "2sty Corner terr- 1km Taonan",
    fullAddressText:
      "Still lane/East Coast road East Coast / Marine Parade (D15)",
    distanceText: "13 mins (1 km) from TE27 Marine Terrace MRT",
    amount: " S$ 4,900,000",
    about:
      "About this propertyQuiet Cul-De-sac house with Pool viewOriginal Double sty Corner terrace Front North facing with side wall facing East Plot dimension 9m by 26.4m Side View overlook apartment pool view without any neighbour looking into your house Wide cul-de-sac road Renovate or Rebuild to your Taste New Owner can either renovate overall interior or rebuild to your taste Most recent transaction was a 3.5sty Corner Terrace  sold at 6.55m.. reasonable asking for a original condition Corner terrace for buyer to build to their own taste Hurry call now\n          8*****\n         for viewing of your next dream home. Show more",
    bed: "3",
    bath: "2",
    sqft: "2,698",
    psf: "S$ 1,816",
  },
  {
    title: "Riversails",
    fullAddressText:
      "14 Upper Serangoon Crescent Hougang / Punggol / Sengkang (D19)",
    distanceText: "9 mins (740 m) from SE4 Kangkar LRT",
    amount: " S$ 1,300,000",
    about:
      "About this propertyRarely Available Premium Stack High Floor 2 Bedroom Unit For Sale!Call for an exclusive viewing today! View to believe, one truly not to be missed!RiversailsD192 Bed + 3 Bath882 sqft/82 sqm- Owner occupied- Pristine condition- North South facing- Bright and spacious unit- Functional and efficient living areas- Good sized bedrooms- Spacious dining and living area- Homeshelter + wc- Good connectivity- Near amenitiesNearby MRTs:Kangkar (SE4) 0.60kmRanggung (SE5) 0.68kmBakau (SE3) 1.11kmBuangkok (NE15) 1.14kmRumbia (SE2) 1.36kmHougang (NE14 CR8) 1.53kmSengkang (NE16 STC) 1.59kmNearby Bus Stops:Aft Sengkang East Dr (Bus: 102) 0.11kmOpp Blk 477A (Bus: 136, 102, 62, 6N) 0.12kmBlk 477A (Bus: 62, 62A, 102, 136) 0.16kmBef Sengkang East Dr (Bus: 102) 0.17kmGroceries & Supermarket:Giant(Compassvale Bow) 0.68kmNTUC Fairprice (Rivervale Plaza) 0.70kmNTUC Fairprice (Compassvale Link) 1.01kmNTUC Fairprice (Hougang Lifestyle Mall) 1.23kmSchools:North Vista Secondary School 0.43kmSerangoon Secondary School 0.52kmNorth Vista Primary School 0.84kmNorth Spring Primary School 0.87kmChij Our Lady Of The Nativity 0.87kmPunggol Primary School 0.92kmSeng Kang Secondary School 0.93kmHoly Innocents' High School 1.11kmSeng Kang Primary School 1.18kmPalm View Primary School 1.35kmChij St. Joseph's Convent 1.39kmContact us for a non-obligatory viewing!Benjamin & RileyERAPreeminent Group Show more",
    bed: "2",
    bath: "3",
    sqft: "882",
    psf: "S$ 1,474",
  },
];

// Function to create PDF
function createPDF(data, filename) {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filename);
  doc.pipe(stream);

  data.forEach((property, index) => {
    doc.text(`Property ID: ${index + 1}`);
    doc.text(`Title: ${property.title}`);
    doc.text(`Address: ${property.fullAddressText}`);
    doc.text(`Bedrooms: ${property.bed}`);
    doc.text(`Bathrooms: ${property.bath}`);
    doc.text(`Price: ${property.amount}`);
    doc.text(`Property Details: ${property.about}`);
    doc.moveDown(); // Add extra space between properties
  });

  doc.end();
  console.log(`PDF file "${filename}" created successfully.`);
}

// Generate PDF
createPDF(jsonData, "property_info.pdf");
