const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/productpromo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  {
    category: "Alignment",
    name: "Acoem AT-100",
    description: "The AT-100 shaft alignment solution is the result of almost 40 years of shaft alignment expertise and innovation, leveraging the latest technology to enhance your user experience. With the AT-100, Acoem complements its product family of Shaft Alignment. Integrated apps, patented technology and easy connectivity make the AT-100 an app-based alignment tool.",
    pdfUrl: "http://localhost:5000/product-data/alignment/1/Acoem_AT-100.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/1/at-100.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-200",
    description: `The Acoem AT-200, a pinnacle in shaft alignment
    perfection meticulously crafted over four decades of unparalleled expertise and groundbreaking innovation. Elevating your user experience with
    cutting-edge technology, this solution embodies the epitome of precision and efficiency.
    Experience the future of precision alignment with Acoem's AT-200. This app-based shaft alignment tool blends integrated apps, patented tech, and effortless connectivity for unparalleled performance in Industry 4.0. Elevate your precision game with the AT-200 - where innovation meets efficiency.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/2/Acoem_AT-200.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/2/at-200.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-300",
    description: `Experience enhanced sensor intelligence with our latest
    advancements. Our 3rd generation digital line sensor offers a
    longer measurement range of up to 15 m, ensuring precise data
    capture. High-performance inclinometers provide an impressive
    0.01 degrees resolution for accurate results. Plus, enjoy reduced
    power consumption for greater efficiency in your applications.
    Elevate your sensing capabilities with our cutting-edge technology.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/3/Acoem_AT-300.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/3/at-300.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-400",
    description: `The Acoem AT-400 is a cutting-edge alignment solution designed to provide
    robust precision for machinery alignment. With dual-axis sensor technology,
    the AT-400 ensures accurate alignment for compressors, blowers, fans,
    turbines, pumps, gearboxes, and more.
    Featuring a long measurement distance of up to 20 meters and a highresolution
    point laser detection system (0.001 mm), this system is
    perfect for those seeking unmatched reliability and ease of use in critical
    maintenance tasks.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/4/Acoem_AT-400.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/4/at-400.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-100",
    description: "The AT-100 shaft alignment solution is the result of almost 40 years of shaft alignment expertise and innovation, leveraging the latest technology to enhance your user experience. With the AT-100, Acoem complements its product family of Shaft Alignment. Integrated apps, patented technology and easy connectivity make the AT-100 an app-based alignment tool.",
    pdfUrl: "http://localhost:5000/product-data/alignment/1/Acoem_AT-100.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/1/at-100.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-200",
    description: `The Acoem AT-200, a pinnacle in shaft alignment
    perfection meticulously crafted over four decades of unparalleled expertise and groundbreaking innovation. Elevating your user experience with
    cutting-edge technology, this solution embodies the epitome of precision and efficiency.
    Experience the future of precision alignment with Acoem's AT-200. This app-based shaft alignment tool blends integrated apps, patented tech, and effortless connectivity for unparalleled performance in Industry 4.0. Elevate your precision game with the AT-200 - where innovation meets efficiency.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/2/Acoem_AT-200.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/2/at-200.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-300",
    description: `Experience enhanced sensor intelligence with our latest
    advancements. Our 3rd generation digital line sensor offers a
    longer measurement range of up to 15 m, ensuring precise data
    capture. High-performance inclinometers provide an impressive
    0.01 degrees resolution for accurate results. Plus, enjoy reduced
    power consumption for greater efficiency in your applications.
    Elevate your sensing capabilities with our cutting-edge technology.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/3/Acoem_AT-300.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/3/at-300.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-400",
    description: `The Acoem AT-400 is a cutting-edge alignment solution designed to provide
    robust precision for machinery alignment. With dual-axis sensor technology,
    the AT-400 ensures accurate alignment for compressors, blowers, fans,
    turbines, pumps, gearboxes, and more.
    Featuring a long measurement distance of up to 20 meters and a highresolution
    point laser detection system (0.001 mm), this system is
    perfect for those seeking unmatched reliability and ease of use in critical
    maintenance tasks.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/4/Acoem_AT-400.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/4/at-400.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-100",
    description: "The AT-100 shaft alignment solution is the result of almost 40 years of shaft alignment expertise and innovation, leveraging the latest technology to enhance your user experience. With the AT-100, Acoem complements its product family of Shaft Alignment. Integrated apps, patented technology and easy connectivity make the AT-100 an app-based alignment tool.",
    pdfUrl: "http://localhost:5000/product-data/alignment/1/Acoem_AT-100.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/1/at-100.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-200",
    description: `The Acoem AT-200, a pinnacle in shaft alignment
    perfection meticulously crafted over four decades of unparalleled expertise and groundbreaking innovation. Elevating your user experience with
    cutting-edge technology, this solution embodies the epitome of precision and efficiency.
    Experience the future of precision alignment with Acoem's AT-200. This app-based shaft alignment tool blends integrated apps, patented tech, and effortless connectivity for unparalleled performance in Industry 4.0. Elevate your precision game with the AT-200 - where innovation meets efficiency.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/2/Acoem_AT-200.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/2/at-200.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-300",
    description: `Experience enhanced sensor intelligence with our latest
    advancements. Our 3rd generation digital line sensor offers a
    longer measurement range of up to 15 m, ensuring precise data
    capture. High-performance inclinometers provide an impressive
    0.01 degrees resolution for accurate results. Plus, enjoy reduced
    power consumption for greater efficiency in your applications.
    Elevate your sensing capabilities with our cutting-edge technology.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/3/Acoem_AT-300.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/3/at-300.png"
  },
  {
    category: "Alignment",
    name: "Acoem AT-400",
    description: `The Acoem AT-400 is a cutting-edge alignment solution designed to provide
    robust precision for machinery alignment. With dual-axis sensor technology,
    the AT-400 ensures accurate alignment for compressors, blowers, fans,
    turbines, pumps, gearboxes, and more.
    Featuring a long measurement distance of up to 20 meters and a highresolution
    point laser detection system (0.001 mm), this system is
    perfect for those seeking unmatched reliability and ease of use in critical
    maintenance tasks.`,
    pdfUrl: "http://localhost:5000/product-data/alignment/4/Acoem_AT-400.pdf",
    imageUrl: "http://localhost:5000/product-data/alignment/4/at-400.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: `The FLIR E8 New Model is an excellent choice for professionals seeking a dependable, 
    easy-to-use thermal camera that combines solid imaging performance with practical features. It's ideal for building diagnostics, 
    electrical inspections, and preventive maintenance tasks where clear thermal visualization is essential.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-New-Model.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: ` the FLIR T530 is a sophisticated thermal imaging camera tailored for professionals who need accurate, 
    high-quality thermal data combined with ease of use and advanced features. Its blend of high-resolution imaging, smart autofocus, 
    MSX enhancement, and ergonomic design makes it a top choice for expert-level thermal inspections.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/2/flir-t530.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir One Edge Pro",
    description: `Unlock the power of professional-grade thermal imaging right from your smartphone with the FLIR One Edge Pro.
     Designed for on-the-go professionals and enthusiasts alike, this compact and rugged thermal camera delivers stunning thermal clarity with a 
     160 x 120 resolution sensor and FLIR's cutting-edge MSX® technology, which adds crisp visible details to every thermal image.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/3/flir-one-egde-pro.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/3/300b9343-3839-40e4-b0a6-23fae7232562_10543383_3.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir C5",
    description: `FLIR C5 is a versatile, easy-to-use thermal camera that combines portability with powerful imaging technology. 
    It empowers professionals to quickly identify and document issues, improving efficiency and accuracy in inspections. 
    Whether you're in the field or on-site, the FLIR C5 is a reliable companion for thermal diagnostics.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/4/FLIR-C5.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/4/c5-wifi-2v-01.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: `The FLIR E8 New Model is an excellent choice for professionals seeking a dependable, 
    easy-to-use thermal camera that combines solid imaging performance with practical features. It's ideal for building diagnostics, 
    electrical inspections, and preventive maintenance tasks where clear thermal visualization is essential.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-New-Model.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: ` the FLIR T530 is a sophisticated thermal imaging camera tailored for professionals who need accurate, 
    high-quality thermal data combined with ease of use and advanced features. Its blend of high-resolution imaging, smart autofocus, 
    MSX enhancement, and ergonomic design makes it a top choice for expert-level thermal inspections.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/2/flir-t530.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir One Edge Pro",
    description: `Unlock the power of professional-grade thermal imaging right from your smartphone with the FLIR One Edge Pro.
     Designed for on-the-go professionals and enthusiasts alike, this compact and rugged thermal camera delivers stunning thermal clarity with a 
     160 x 120 resolution sensor and FLIR's cutting-edge MSX® technology, which adds crisp visible details to every thermal image.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/3/flir-one-egde-pro.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/3/300b9343-3839-40e4-b0a6-23fae7232562_10543383_3.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir C5",
    description: `FLIR C5 is a versatile, easy-to-use thermal camera that combines portability with powerful imaging technology. 
    It empowers professionals to quickly identify and document issues, improving efficiency and accuracy in inspections. 
    Whether you're in the field or on-site, the FLIR C5 is a reliable companion for thermal diagnostics.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/4/FLIR-C5.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/4/c5-wifi-2v-01.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: `The FLIR E8 New Model is an excellent choice for professionals seeking a dependable, 
    easy-to-use thermal camera that combines solid imaging performance with practical features. It's ideal for building diagnostics, 
    electrical inspections, and preventive maintenance tasks where clear thermal visualization is essential.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-New-Model.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: ` the FLIR T530 is a sophisticated thermal imaging camera tailored for professionals who need accurate, 
    high-quality thermal data combined with ease of use and advanced features. Its blend of high-resolution imaging, smart autofocus, 
    MSX enhancement, and ergonomic design makes it a top choice for expert-level thermal inspections.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/2/flir-t530.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir One Edge Pro",
    description: `Unlock the power of professional-grade thermal imaging right from your smartphone with the FLIR One Edge Pro.
     Designed for on-the-go professionals and enthusiasts alike, this compact and rugged thermal camera delivers stunning thermal clarity with a 
     160 x 120 resolution sensor and FLIR's cutting-edge MSX® technology, which adds crisp visible details to every thermal image.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/3/flir-one-egde-pro.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/3/300b9343-3839-40e4-b0a6-23fae7232562_10543383_3.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir C5",
    description: `FLIR C5 is a versatile, easy-to-use thermal camera that combines portability with powerful imaging technology. 
    It empowers professionals to quickly identify and document issues, improving efficiency and accuracy in inspections. 
    Whether you're in the field or on-site, the FLIR C5 is a reliable companion for thermal diagnostics.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/4/FLIR-C5.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/4/c5-wifi-2v-01.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: `The FLIR E8 New Model is an excellent choice for professionals seeking a dependable, 
    easy-to-use thermal camera that combines solid imaging performance with practical features. It's ideal for building diagnostics, 
    electrical inspections, and preventive maintenance tasks where clear thermal visualization is essential.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-New-Model.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: ` the FLIR T530 is a sophisticated thermal imaging camera tailored for professionals who need accurate, 
    high-quality thermal data combined with ease of use and advanced features. Its blend of high-resolution imaging, smart autofocus, 
    MSX enhancement, and ergonomic design makes it a top choice for expert-level thermal inspections.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/2/flir-t530.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir One Edge Pro",
    description: `Unlock the power of professional-grade thermal imaging right from your smartphone with the FLIR One Edge Pro.
     Designed for on-the-go professionals and enthusiasts alike, this compact and rugged thermal camera delivers stunning thermal clarity with a 
     160 x 120 resolution sensor and FLIR's cutting-edge MSX® technology, which adds crisp visible details to every thermal image.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/3/flir-one-egde-pro.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/3/300b9343-3839-40e4-b0a6-23fae7232562_10543383_3.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir C5",
    description: `FLIR C5 is a versatile, easy-to-use thermal camera that combines portability with powerful imaging technology. 
    It empowers professionals to quickly identify and document issues, improving efficiency and accuracy in inspections. 
    Whether you're in the field or on-site, the FLIR C5 is a reliable companion for thermal diagnostics.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/4/FLIR-C5.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/4/c5-wifi-2v-01.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: `The FLIR E8 New Model is an excellent choice for professionals seeking a dependable, 
    easy-to-use thermal camera that combines solid imaging performance with practical features. It's ideal for building diagnostics, 
    electrical inspections, and preventive maintenance tasks where clear thermal visualization is essential.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-New-Model.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: ` the FLIR T530 is a sophisticated thermal imaging camera tailored for professionals who need accurate, 
    high-quality thermal data combined with ease of use and advanced features. Its blend of high-resolution imaging, smart autofocus, 
    MSX enhancement, and ergonomic design makes it a top choice for expert-level thermal inspections.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/2/flir-t530.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir One Edge Pro",
    description: `Unlock the power of professional-grade thermal imaging right from your smartphone with the FLIR One Edge Pro.
     Designed for on-the-go professionals and enthusiasts alike, this compact and rugged thermal camera delivers stunning thermal clarity with a 
     160 x 120 resolution sensor and FLIR's cutting-edge MSX® technology, which adds crisp visible details to every thermal image.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/3/flir-one-egde-pro.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/3/300b9343-3839-40e4-b0a6-23fae7232562_10543383_3.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir C5",
    description: `FLIR C5 is a versatile, easy-to-use thermal camera that combines portability with powerful imaging technology. 
    It empowers professionals to quickly identify and document issues, improving efficiency and accuracy in inspections. 
    Whether you're in the field or on-site, the FLIR C5 is a reliable companion for thermal diagnostics.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/4/FLIR-C5.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/4/c5-wifi-2v-01.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: `The FLIR E8 New Model is an excellent choice for professionals seeking a dependable, 
    easy-to-use thermal camera that combines solid imaging performance with practical features. It's ideal for building diagnostics, 
    electrical inspections, and preventive maintenance tasks where clear thermal visualization is essential.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-New-Model.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: ` the FLIR T530 is a sophisticated thermal imaging camera tailored for professionals who need accurate, 
    high-quality thermal data combined with ease of use and advanced features. Its blend of high-resolution imaging, smart autofocus, 
    MSX enhancement, and ergonomic design makes it a top choice for expert-level thermal inspections.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/2/flir-t530.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir One Edge Pro",
    description: `Unlock the power of professional-grade thermal imaging right from your smartphone with the FLIR One Edge Pro.
     Designed for on-the-go professionals and enthusiasts alike, this compact and rugged thermal camera delivers stunning thermal clarity with a 
     160 x 120 resolution sensor and FLIR's cutting-edge MSX® technology, which adds crisp visible details to every thermal image.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/3/flir-one-egde-pro.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/3/300b9343-3839-40e4-b0a6-23fae7232562_10543383_3.jpg"
  },
  {
    category: "Thermal Camera",
    name: "Flir C5",
    description: `FLIR C5 is a versatile, easy-to-use thermal camera that combines portability with powerful imaging technology. 
    It empowers professionals to quickly identify and document issues, improving efficiency and accuracy in inspections. 
    Whether you're in the field or on-site, the FLIR C5 is a reliable companion for thermal diagnostics.`,
    pdfUrl: "http://localhost:5000/product-data/thermal-camera/4/FLIR-C5.pdf",
    imageUrl: "http://localhost:5000/product-data/thermal-camera/4/c5-wifi-2v-01.png"
  }
];

async function insertProducts() {
  try {
    await Product.deleteMany({}); // Hapus data lama (opsional)
    await Product.insertMany(products);
    console.log('Data produk berhasil dimasukkan!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Gagal memasukkan data produk:', err);
  }
}

insertProducts();
