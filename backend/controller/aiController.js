export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const text = message.toLowerCase();
    let reply = "";

    // 👋 Greeting
    if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey")
    ) {
      reply =
        "Hi 👋 I’m your AI car rental assistant. I can help with budget, seating, car type, fuel, transmission, pricing, and rental policies.";
    }

    // 💰 Budget / Price
    else if (
      text.includes("budget") ||
      text.includes("cheap") ||
      text.includes("price") ||
      text.includes("cost") ||
      text.includes("rent")
    ) {
      reply =
        "Budget-friendly cars start from ₹30/day for hatchbacks, ₹45/day for sedans, ₹70/day for SUVs, and ₹150/day for luxury cars.";
    }

    // 🪑 Seating
    else if (
      text.includes("seat") ||
      text.includes("seater") ||
      text.includes("7") ||
      text.includes("seven")
    ) {
      reply =
        "We offer 4-seater hatchbacks, 5-seater sedans & SUVs, and 7-seater cars like Innova and XUV700.";
    }

    // 🚗 Car Type
    else if (
      text.includes("suv") ||
      text.includes("sedan") ||
      text.includes("hatchback") ||
      text.includes("luxury")
    ) {
      reply =
        "Available car types include hatchbacks, sedans, SUVs, and luxury cars depending on comfort and budget.";
    }

    // ⚙️ Transmission
    else if (
      text.includes("automatic") ||
      text.includes("manual")
    ) {
      reply =
        "Both manual and automatic transmission cars are available across most categories.";
    }

    // ⛽ Fuel
    else if (
      text.includes("fuel") ||
      text.includes("petrol") ||
      text.includes("diesel") ||
      text.includes("electric")
    ) {
      reply =
        "We offer petrol, diesel, and electric cars. Availability depends on the selected car model.";
    }

    // 📄 Documents
    else if (
      text.includes("document") ||
      text.includes("license")
    ) {
      reply =
        "You need a valid driving license and a government ID (Aadhaar/Passport). International users need an IDP.";
    }

    // 🚘 Mileage
    else if (
      text.includes("mileage") ||
      text.includes("km")
    ) {
      reply =
        "Each rental includes 250 km per day. Extra kilometers are charged based on car type.";
    }

    // 🏎️ Luxury Cars
    else if (
      text.includes("bmw") ||
      text.includes("audi") ||
      text.includes("mercedes")
    ) {
      reply =
        "Luxury cars like BMW, Audi, and Mercedes are available with premium interiors and automatic transmission.";
    }

    // 👨‍✈️ Driver
    else if (text.includes("driver")) {
      reply =
        "Both self-drive and chauffeur-driven options are available. Driver charges apply if selected.";
    }

    // 🔐 Security Deposit
    else if (text.includes("deposit")) {
      reply =
        "A refundable security deposit is required. The amount depends on the car category.";
    }

    // ❌ Cancellation
    else if (text.includes("cancel")) {
      reply =
        "Free cancellation is available up to 24 hours before the trip start time.";
    }

    // 🚚 Delivery
    else if (text.includes("delivery")) {
      reply =
        "Home delivery and pickup options are available in selected cities for an additional charge.";
    }

    // 🛡️ Insurance
    else if (text.includes("insurance")) {
      reply =
        "All cars are insured. Damages beyond normal wear may be chargeable as per policy.";
    }

    // ⏰ Late Return
    else if (text.includes("late")) {
      reply =
        "Late returns may attract extra hourly charges depending on the delay duration.";
    }

    // 🚧 Damage / Accident
    else if (
      text.includes("damage") ||
      text.includes("accident")
    ) {
      reply =
        "Minor wear is covered. Major damages are chargeable according to insurance and rental terms.";
    }

        // 📅 Availability / Booking
    else if (
      text.includes("available") ||
      text.includes("book") ||
      text.includes("booking")
    ) {
      reply =
        "Car availability depends on date, city, and car type. You can check live availability directly on the website.";
    }

    // 🎂 Age Limit
    else if (
      text.includes("age") ||
      text.includes("minimum age")
    ) {
      reply =
        "The minimum age to rent a car is 21 years with a valid driving license.";
    }

    // 💳 Payment Methods
    else if (
      text.includes("payment") ||
      text.includes("pay") ||
      text.includes("upi") ||
      text.includes("card")
    ) {
      reply =
        "We accept UPI, debit cards, credit cards, and net banking. Cash payment is not supported.";
    }

    // ⏳ Booking Extension
    else if (
      text.includes("extend") ||
      text.includes("extension")
    ) {
      reply =
        "Yes, you can extend your booking if the car is available. Extension charges apply.";
    }

    // 📍 City / Location
    else if (
      text.includes("city") ||
      text.includes("location") ||
      text.includes("available in")
    ) {
      reply =
        "Our services are available in major cities. Please select your city on the website to see available cars.";
    }

    // ✏️ Modify Booking
    else if (
      text.includes("modify") ||
      text.includes("change booking")
    ) {
      reply =
        "You can modify your booking details before the trip start time from the dashboard.";
    }

    // ☎️ Support
    else if (
      text.includes("support") ||
      text.includes("help") ||
      text.includes("customer care")
    ) {
      reply =
        "Our support team is available 24/7 through the help section on the website.";
    }

    // 🤖 Fallback (ONLY one)
    else {
      reply =
        "I can help you with budget, seating, car type, fuel, transmission, pricing, documents, and rental policies 😊";
    }

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: "AI server error" });
  }
};
