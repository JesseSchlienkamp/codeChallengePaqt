const bewoners = [
    { id: 1, name: "John Doe", addres: "Australielaan 11", perceel: "A", beschikkingID: 1 },
    { id: 2, name: "Jane Smith", addres: "Australielaan 13", perceel: "B", beschikkingID: 2 },
    { id: 3, name: "Joe Smith", addres: "Australielaan 13", perceel: "B", beschikkingID: null }
  ];
  
  const beschikkingen = [
    { id: 1, residentId: 1, budgetKm: 100, valid: true },
    { id: 2, residentId: 2, budgetKm: 150, valid: true }
  ];
  
  const taxiBedrijven = [
    { perceel: "A", naam: "Taxi A" },
    { perceel: "B", naam: "Taxi B" }
  ];
  
  const rides = [];
  
  module.exports = { bewoners, beschikkingen, taxiBedrijven, rides };
  