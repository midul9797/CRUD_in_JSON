const fs = require("fs");
const { isArray } = require("util");
//Read File
let users = JSON.parse(fs.readFileSync("./random_user.json"));
//Write File
const update = (data) => {
  fs.writeFile("./random_user.json", JSON.stringify(data), function (err) {
    if (err) throw err;
  });
};

module.exports.getRandomUser = (req, res, next) => {
  const randomId = Math.floor(Math.random() * users.length);
  res.send(users[randomId]);
};

module.exports.getAllUsers = (req, res, next) => {
  const { limit } = req.query;
  res.json(users.slice(0, limit));
};

module.exports.saveUser = (req, res, next) => {
  const newUser = req.body;
  //Validation
  if (
    newUser.id !== undefined &&
    newUser.name !== undefined &&
    newUser.gender !== undefined &&
    newUser.contact !== undefined &&
    newUser.address !== undefined &&
    newUser.photoUrl !== undefined
  ) {
    users.push(newUser);
    update(users);
    res.send(users);
  } else {
    console.log(newUser)
    res.send("Please give all information correctly");
  }
};

module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;

  //Index of updated user
  let position;
  if (id == Number(id)) {
    users.forEach((user, index) => {
      if (user.id === Number(id)) {
        position = index;
      }
    });
    users[position].id = id;
    users[position].gender = req.body.gender;
    users[position].name = req.body.name;
    users[position].contact = req.body.contact;
    users[position].address = req.body.address;
    users[position].photoUrl = req.body.photoUrl;
    update(users);
    res.send(users[position]);
  } else {
    res.send("ID missing");
  }
};
module.exports.multipleUpdate = (req, res, next) => {
  //Request.body have to be an array of objects
  const newUpdate = req.body;
  if(Array.isArray(newUpdate)){

      newUpdate.map((update) => {
          users.map((user, index) => {
              if (user.id === update.id) {
        if (update.gender !== undefined) users[index].gender = update.gender;
        if (update.name !== undefined) users[index].name = update.name;
        if (update.contact !== undefined) users[index].contact = update.contact;
        if (update.address !== undefined) users[index].address = update.address;
        if (update.photoUrl !== undefined)
          users[index].photoUrl = update.photoUrl;
        }
    });
});
update(users);
res.send(users);
}else{res.send("Reqest body have to be an array")}
};
module.exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  if (id == Number(id)) {
    users = users.filter((user) => user.id !== Number(id));
    update(users);
    res.send(users);
  } else {
    res.send("ID Missing");
  }
};
