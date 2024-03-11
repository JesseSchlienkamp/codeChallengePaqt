function findMondaysBetween(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    
    // Zoek de eerste maandag na de startdatum
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() + 1);
    }
    
    // Array van maandagen
    let mondays = [];
    
    // Loop tot de einddatum, voeg maandag toe
    while (startDate < endDate) {
      // Controleer of de huidige week volledig binnen de gegeven periode valt
      let endOfWeek = new Date(startDate);
      endOfWeek.setDate(endOfWeek.getDate() + 6); // Zondag van deze week
      
      if (endOfWeek <= endDate) {
        // Voeg toe als de hele week binnen de periode valt
        mondays.push(new Date(startDate));
      }
      
      // Ga naar de volgende maandag
      startDate.setDate(startDate.getDate() + 7);
    }
    
    // Converteer datums naar string
    return mondays.map(monday => monday.toISOString().split('T')[0]);
  }
  

  console.log(findMondaysBetween('2023-03-01', '2023-04-01'));