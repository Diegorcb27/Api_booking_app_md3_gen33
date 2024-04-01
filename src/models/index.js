const Booking = require("./Booking");
const City = require("./City");
const Hotel = require("./Hotel");
const Image = require("./Image");
const Review = require("./Review");
const User = require("./User");

//relaciones uno a muchos hotel-ciudad
City.hasMany(Hotel)
Hotel.belongsTo(City)
// Hotel.belongsTo(City, { foreignKey: 'cityId' })

//relaciones uno a muchos images-hotel
Hotel.hasMany(Image)
Image.belongsTo(Hotel)

//relaciones uno a muchos booking-user
User.hasMany(Booking)
Booking.belongsTo(User)

//relaciones uno a muchos booking-hotel
Hotel.hasMany(Booking)
Booking.belongsTo(Hotel)

//relaciones uno a muchos review-user
User.hasMany(Review)
Review.belongsTo(User)

//relaciones uno a muchos review-hotel
Hotel.hasMany(Review)
Review.belongsTo(Hotel)





