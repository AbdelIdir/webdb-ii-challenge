const express = require("express");

const db = require("./data/db_config");

const router = express.Router();

router.get("/", (req, res) => {
  ///stretch part for sorting and limiting
  const { limit = 10, sortby = "id", sortdir = "asc" } = req.query;

  db.select("*")
    .limit(limit)
    .orderBy(sortby, sortdir)
    .from("cars")
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "could not retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("cars")
    .where({ id })
    .first()
    .then(vehicle => {
      console.log(vehicle);
      // we must check the length to find our if our account exists,here I removed the .length so that we dont need to json(acc[0]) in order to get the object.Since we already use .first(). Here if (acc) comes back undefined,the catch will throw the error message.
      if (vehicle) {
        res.json(vehicle);
      } else {
        res
          .status(404)
          .json({ message: "Could not find vehicle with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get vehicle" });
      console.log(err);
    });
});

// router.get("/", (req, res) => {
//   const { page = 1, limit = 2, sortby = "id", sortdir = "asc" } = req.query;

//   db.select("*")
//     .from(req.query)
//     .orderBy(sortby, sortdir)
//     .limit(limit)
//   .then((result) => {
//     res.json(200).json(result)
//   }).catch((err) => {
//     console.log(err)
//   });

// });

///// using the .find() feature

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   db.select("*")
//     .from("accounts")
//     .where({ id })
//     .first()
//     .then(acc => {
//       res.json(acc);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to get account" });
//       console.log(err);
//     });
// });

router.post("/", (req, res) => {
  const data = req.body;

  if (!(data && data.name && data.vin && data.make_model && data.mileage)) {
    res
      .status(400)
      .json({ message: "Type in all the required details for this vehicle" });
    return;
  }

  db("cars")
    .insert(data, "id")

    // another way of doing it,here up above
    // db.insert(data)
    //   .into("accounts")
    .then(ids => {
      const id = ids[0];
      return db("cars")
        .where({ id })
        .first()
        .then(vehicle => {
          res.status(201).json(vehicle);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "there was a problem adding a vehicle" });
    });
});

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   db("accounts")
//     .where({ id })
//     .update(id, changes)
//     .then(count => {
//       //count because we get back a count of how many records have been updated
//       res.status(200).json({ message: `${count} record(s) updated` });
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ message: "Error adding the account" });
//     });
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // if (!(changes.name  && changes.budget)) {
  //   res
  //     .status(400)
  //     .json({ message: "Type in a name and a budget for this account" });
  //   return;
  // }

  db("cars")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated   ` });
      } else {
        res.status(404).json({ message: "vehicle not found" });
      }
      //count because we get back a count of how many records have been updated
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error updating the vehicle" });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      //count because we get back a count of how many records have been updated
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error removing the vehicle" });
    });
});

// Add a query string option to your GET /api/accounts endpoint. The query string may contain limit, sortby and sortdir keys. If these keys are provided, use these values to limit and sort the accounts which are selected from the database. Reference the docs for sorting and limiting in knex.

module.exports = router;
