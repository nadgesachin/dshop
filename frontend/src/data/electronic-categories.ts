export interface ElectronicsCategory {
    id: number;
    name: string;
    slug: string;
  }
  
  export const electronicsCategories: ElectronicsCategory[] = [
    { id: 1, name: "Mobile Phones", slug: "mobile-phones" },
    { id: 2, name: "Smartphones", slug: "smartphones" },
    { id: 3, name: "Feature Phones", slug: "feature-phones" },
    { id: 4, name: "Laptops", slug: "laptops" },
    { id: 5, name: "Ultrabooks", slug: "ultrabooks" },
    { id: 6, name: "Gaming Laptops", slug: "gaming-laptops" },
    { id: 7, name: "Tablets", slug: "tablets" },
    { id: 8, name: "iPads", slug: "ipads" },
    { id: 9, name: "Televisions", slug: "televisions" },
    { id: 10, name: "Smart TVs", slug: "smart-tvs" },
    { id: 11, name: "LED TVs", slug: "led-tvs" },
    { id: 12, name: "OLED TVs", slug: "oled-tvs" },
    { id: 13, name: "Cameras", slug: "cameras" },
    { id: 14, name: "DSLR Cameras", slug: "dslr-cameras" },
    { id: 15, name: "Mirrorless Cameras", slug: "mirrorless-cameras" },
    { id: 16, name: "Action Cameras", slug: "action-cameras" },
    { id: 17, name: "Headphones", slug: "headphones" },
    { id: 18, name: "Wireless Earbuds", slug: "wireless-earbuds" },
    { id: 19, name: "Gaming Consoles", slug: "gaming-consoles" },
    { id: 20, name: "Xbox", slug: "xbox" },
    { id: 21, name: "PlayStation", slug: "playstation" },
    { id: 22, name: "Nintendo Switch", slug: "nintendo-switch" },
    { id: 23, name: "Speakers", slug: "speakers" },
    { id: 24, name: "Bluetooth Speakers", slug: "bluetooth-speakers" },
    { id: 25, name: "Soundbars", slug: "soundbars" },
    { id: 26, name: "Projectors", slug: "projectors" },
    { id: 27, name: "Computer Accessories", slug: "computer-accessories" },
    { id: 28, name: "Keyboards", slug: "keyboards" },
    { id: 29, name: "Mice", slug: "mice" },
    { id: 30, name: "Webcams", slug: "webcams" },
    { id: 31, name: "External Storage", slug: "external-storage" },
    { id: 32, name: "USB Drives", slug: "usb-drives" },
    { id: 33, name: "Hard Drives", slug: "hard-drives" },
    { id: 34, name: "Solid State Drives (SSD)", slug: "ssds" },
    { id: 35, name: "Printers", slug: "printers" },
    { id: 36, name: "Scanners", slug: "scanners" },
    { id: 37, name: "Smart Watches", slug: "smart-watches" },
    { id: 38, name: "Fitness Bands", slug: "fitness-bands" },
    { id: 39, name: "Wearable Cameras", slug: "wearable-cameras" },
    { id: 40, name: "Home Audio Systems", slug: "home-audio" },
    { id: 41, name: "Bluetooth Receivers", slug: "bluetooth-receivers" },
    { id: 42, name: "Routers", slug: "routers" },
    { id: 43, name: "WiFi Extenders", slug: "wifi-extenders" },
    { id: 44, name: "Modems", slug: "modems" },
    { id: 45, name: "Monitors", slug: "monitors" },
    { id: 46, name: "Gaming Monitors", slug: "gaming-monitors" },
    { id: 47, name: "Chargers", slug: "chargers" },
    { id: 48, name: "Power Banks", slug: "power-banks" },
    { id: 49, name: "VR Headsets", slug: "vr-headsets" },
    { id: 50, name: "Drones", slug: "drones" },
    { id: 51, name: "Security Cameras", slug: "security-cameras" },
    { id: 52, name: "Smart Doorbells", slug: "smart-doorbells" },
    { id: 53, name: "Smart Home Devices", slug: "smart-home" },
    { id: 54, name: "Digital Photo Frames", slug: "digital-photo-frames" },
    { id: 55, name: "Car Electronics", slug: "car-electronics" },
    { id: 56, name: "Dash Cams", slug: "dash-cams" },
    { id: 57, name: "Inverters & Stabilizers", slug: "inverters-stabilizers" },
    { id: 58, name: "Battery Packs", slug: "battery-packs" },
    { id: 59, name: "Electronic Components", slug: "electronic-components" },
    { id: 60, name: "Arduino Boards", slug: "arduino-boards" },
    { id: 61, name: "Raspberry Pi", slug: "raspberry-pi" },
    { id: 62, name: "Circuit Boards", slug: "circuit-boards" },
    { id: 63, name: "Power Adapters", slug: "power-adapters" },
    { id: 64, name: "Smart Plugs", slug: "smart-plugs" },
    { id: 65, name: "Voltage Converters", slug: "voltage-converters" },
    { id: 66, name: "HDMI Cables", slug: "hdmi-cables" },
    { id: 67, name: "USB Hubs", slug: "usb-hubs" },
    { id: 68, name: "KVM Switches", slug: "kvm-switches" },
    { id: 69, name: "Thermal Printers", slug: "thermal-printers" },
    { id: 70, name: "Barcode Scanners", slug: "barcode-scanners" },
    { id: 71, name: "POS Machines", slug: "pos-machines" },
    { id: 72, name: "Industrial PCs", slug: "industrial-pcs" },
    { id: 73, name: "Server Racks", slug: "server-racks" },
    { id: 74, name: "Network Switches", slug: "network-switches" },
    { id: 75, name: "Smart Thermostats", slug: "smart-thermostats" },
    { id: 76, name: "Smart Lights", slug: "smart-lights" },
    { id: 77, name: "Motion Sensors", slug: "motion-sensors" },
    { id: 78, name: "Electronic Toys", slug: "electronic-toys" },
    { id: 79, name: "3D Printers", slug: "3d-printers" },
    { id: 80, name: "3D Printing Filaments", slug: "3d-printing-filaments" },
    { id: 81, name: "Solar Panels", slug: "solar-panels" },
    { id: 82, name: "Solar Inverters", slug: "solar-inverters" },
    { id: 83, name: "Bluetooth Trackers", slug: "bluetooth-trackers" },
    { id: 84, name: "Digital Voice Recorders", slug: "voice-recorders" },
    { id: 85, name: "Remote Controls", slug: "remote-controls" },
    { id: 86, name: "TV Wall Mounts", slug: "tv-wall-mounts" },
    { id: 87, name: "AV Receivers", slug: "av-receivers" },
    { id: 88, name: "Home Theater Systems", slug: "home-theater-systems" },
    { id: 89, name: "Battery Chargers", slug: "battery-chargers" },
    { id: 90, name: "Rechargeable Batteries", slug: "rechargeable-batteries" },
    { id: 91, name: "Power Strips", slug: "power-strips" },
    { id: 92, name: "Surge Protectors", slug: "surge-protectors" },
    { id: 93, name: "Laptop Stands", slug: "laptop-stands" },
    { id: 94, name: "Cooling Pads", slug: "cooling-pads" },
    { id: 95, name: "Docking Stations", slug: "docking-stations" },
    { id: 96, name: "TV Tuners", slug: "tv-tuners" },
    { id: 97, name: "Sound Cards", slug: "sound-cards" },
    { id: 98, name: "Graphic Cards", slug: "graphic-cards" },
    { id: 99, name: "Motherboards", slug: "motherboards" },
    { id: 100, name: "Power Supply Units", slug: "power-supply-units" },
    { id: 101, name: "RAM Modules", slug: "ram-modules" },
    { id: 102, name: "Processors (CPUs)", slug: "processors" },
    { id: 103, name: "Internal SSDs", slug: "internal-ssds" },
    { id: 104, name: "CCTV Systems", slug: "cctv-systems" },
    { id: 105, name: "Biometric Devices", slug: "biometric-devices" },
    { id: 106, name: "Smart Glasses", slug: "smart-glasses" },
    { id: 107, name: "Smart Rings", slug: "smart-rings" },
    { id: 108, name: "Voice Assistants", slug: "voice-assistants" },
    { id: 109, name: "Mini PCs", slug: "mini-pcs" },
    { id: 110, name: "E-Book Readers", slug: "ebook-readers" },
    { id: 111, name: "Bluetooth Adapters", slug: "bluetooth-adapters" },
    { id: 112, name: "TV Boxes & Streaming Devices", slug: "tv-boxes-streaming" },
    { id: 113, name: "Satellite Receivers", slug: "satellite-receivers" },
    { id: 114, name: "Fingerprint Scanners", slug: "fingerprint-scanners" },
    { id: 115, name: "Electric Scooters", slug: "electric-scooters" },
    { id: 116, name: "Electric Skateboards", slug: "electric-skateboards" },
    { id: 117, name: "Car Audio Systems", slug: "car-audio" },
    { id: 118, name: "Rearview Cameras", slug: "rearview-cameras" },
    { id: 119, name: "OBD Devices", slug: "obd-devices" },
    { id: 120, name: "Smart Clocks", slug: "smart-clocks" },
    { id: 121, name: "Digital Thermometers", slug: "digital-thermometers" },
    { id: 122, name: "Portable Air Purifiers", slug: "portable-air-purifiers" },
    { id: 123, name: "Smart Scales", slug: "smart-scales" },
    { id: 124, name: "Electric Toothbrushes", slug: "electric-toothbrushes" },
    { id: 125, name: "Hair Trimmers", slug: "hair-trimmers" },
    { id: 126, name: "Smart Kitchen Appliances", slug: "smart-kitchen-appliances" },
    { id: 127, name: "Electric Kettles", slug: "electric-kettles" },
    { id: 128, name: "Microwave Ovens", slug: "microwave-ovens" },
    { id: 129, name: "Induction Cooktops", slug: "induction-cooktops" },
    { id: 130, name: "Smart Refrigerators", slug: "smart-refrigerators" },
    { id: 131, name: "Air Fryers", slug: "air-fryers" },
    { id: 132, name: "Electronic Weighing Scales", slug: "electronic-weighing-scales" },
    { id: 133, name: "Smart Door Locks", slug: "smart-door-locks" },
    { id: 134, name: "Smoke Detectors", slug: "smoke-detectors" },
    { id: 135, name: "Water Leak Sensors", slug: "water-leak-sensors" },
    { id: 136, name: "Power Meters", slug: "power-meters" },
    { id: 137, name: "Voltage Stabilizers", slug: "voltage-stabilizers" },
    { id: 138, name: "Timers & Programmable Switches", slug: "programmable-switches" },
    { id: 139, name: "EMF Meters", slug: "emf-meters" },
    { id: 140, name: "Digital Multimeters", slug: "digital-multimeters" },
    { id: 141, name: "Oscilloscopes", slug: "oscilloscopes" },
    { id: 142, name: "Soldering Kits", slug: "soldering-kits" },
    { id: 143, name: "Breadboards", slug: "breadboards" },
    { id: 144, name: "Capacitors", slug: "capacitors" },
    { id: 145, name: "Resistors", slug: "resistors" },
    { id: 146, name: "Transistors", slug: "transistors" },
    { id: 147, name: "Relays", slug: "relays" },
    { id: 148, name: "Connectors & Wires", slug: "connectors-wires" },
    { id: 149, name: "Development Boards", slug: "development-boards" },
    { id: 150, name: "Infrared Sensors", slug: "infrared-sensors" },
  ];

  