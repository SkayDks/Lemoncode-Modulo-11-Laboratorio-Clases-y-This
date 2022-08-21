const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

const priceRoom = {
  standard: 100,
  suite: 150,
};

const priceRoomTour = {
  standard: 100,
  suite: 100,
};

class hotelBooking {
  constructor(extPriceRoom) {
    this._booking;
    this._total;
    this._subTotal;
    this._room = extPriceRoom;

    this._staticPrice = {
      addCharges: 40,
      iva: 0.21,
      breakfast: 15,
    };
  }

  // getters
  get iva() {
    return this._staticPrice.iva;
  }

  get breakfast() {
    return this._staticPrice.breakfast;
  }

  get addCharges() {
    return this._staticPrice.addCharges;
  }

  get getTotal() {
    return this._total;
  }

  get getSubTotal() {
    return this._subTotal;
  }

  get getBooking() {
    return this._booking;
  }

  //setters
  set setBooking(extBooking) {
    this._booking = extBooking;
    this.reCalculate();
  }

  // Methods
  calcAddCharges(p) {
    return (p - 1) * this.addCharges;
  }

  calcBreakfast(breakfast, ppl) {
    return breakfast ? this.breakfast * ppl : 0;
  }

  calcRoom(room) {
    return this._room[room];
  }

  calculateExtras(room, breakfast, ppl) {
    return (
      this.calcRoom(room) +
      this.calcBreakfast(breakfast, ppl) +
      this.calcAddCharges(ppl)
    );
  }

  calculateSubTotal() {
    console.log();
    this._subTotal = this.getBooking.reduce(
      (acc, book) =>
        acc +
        book.noches *
          this.calculateExtras(book.tipoHabitacion, book.desayuno, book.pax),
      0
    );
  }

  calculateTotal() {
    this._total = this.getSubTotal * (this.iva + 1);
  }

  reCalculate() {
    this.calculateSubTotal();
    this.calculateTotal();
  }

  print() {
    console.log(`Subtotal: ${this.getSubTotal}€`);
    console.log(`Total:  ${this.getTotal}€`);
  }
}

class privateBooking extends hotelBooking {
  constructor(extBooking, extPriceRoom) {
    super(extPriceRoom);
    this.setBooking = extBooking;
  }
}

class tourBooking extends hotelBooking {
  constructor(extBooking, extPriceRoom) {
    super(extPriceRoom);
    this._discount = 0.15;
    this.setBooking = extBooking;
  }

  calculateTotal() {
    super.calculateTotal();
    this._total = (this._total * (1-this._discount )).toFixed(2);
  }
}

const reservaPrivate = new privateBooking(reservas, priceRoom);
reservaPrivate.print();

const reservaTour = new tourBooking(reservas, priceRoomTour);
reservaTour.print();
