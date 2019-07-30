var myNames = require("../names.json");

var MAX_RESULTS = 5000;

exports.index = function(req, res) {
  res.send("Random User API");
};

exports.api = function(req, res) {
  this.results = req.query.results;
  this.seed = req.query.seed;
  res.send(generateNames(this.results, this.seed));
};

function generateNames(results, seed) {
  this.results = results;
  if (this.results > MAX_RESULTS) {
    this.results = MAX_RESULTS;
  }
  this.seed = seed;

  var rand = require("random-seed").create(this.seed);
  var gender;
  var picRand;
  var picNum;
  var genRand;
  var firstname, lastname, street, city, state, postcode;
  var username;
  var phone;
  var email;
  var date;
  var age;
  var cell;
  var picMedium;
  var thumbnail;
  var picLarge;


  var names = {
    results: []
  };
  for (let i = 0; i < this.results; i++) {
    genRand = rand(2);
    picRand = rand(40) + 1;

    if (picRand < 10) {
      picNum = "00" + picRand;
    } else if (picRand < 100) {
      picNum = "0" + picRand;
    } else {
      picNum = "" + picRand;
    }

    if (genRand == 0) {
      gender = "male";
      picLarge = "http://localhost:3000/men/m" + picNum + ".jpg";
      firstname = myNames.male_names[rand(myNames.male_names.length)];
    } else {
      gender = "female";
      picLarge = "http://localhost:3000/women/f" + picNum + ".jpg";
      firstname = myNames.female_names[rand(myNames.female_names.length)];
      username = firstname + myNames.username_a[rand(myNames.username_a.length)] + rand(9);
    }

    lastname = myNames.last_names[rand(myNames.last_names.length)];

    street =
      myNames.last_names[rand(myNames.last_names.length)] +
      " " +
      myNames.street_types[rand(myNames.street_types.length)];

    email =  firstname + myNames.username_a[rand(myNames.username_a.length)] + "@gmail.com";
    state = myNames.states[rand(myNames.states.length)];
    city = myNames.last_names[rand(myNames.last_names.length)] + "" + myNames.city_endings[rand(myNames.city_endings.length)];

    let randYear = Math.floor(Math.random() * (1996 - 1930 )) + 1930;
    
    function createAgeDate() {
      date = myNames.months[rand(myNames.months.length)] + " " + rand(30) + "," + " " + randYear;
      age = 2019 - randYear;
    }
    createAgeDate();
    



    postcode = rand(90000) + 10000;
   

      phone =  rand(899) + 100 + "-" + rand(899  + 100) + "-" + rand(9) + rand(9) + rand(9) + rand(9);
 
    

    var person = {
      gender: gender,
      name: {
        first: firstname,
        last: lastname
      },
      location: {
        street: street,
        city: city,
        state: state,
        postcode: postcode
      },
      email: email,
      username: username,
      dob: {
        date: date,
        age: age
      },
      phone: phone,
      cell: cell,
      picture: {
        large: picLarge,
        medium: picMedium,
        thumbnail: thumbnail
      }
    };
    names.results.push(person);
  }
  return names;
}
