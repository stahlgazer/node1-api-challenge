const express = require("express");
const Actions = require("../helpers/actionModel.js");
const router = express.Router();

// checked - get all actions
router.get("/", (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({ error: "Error retrieving actions" })
    })
})

// checked - get action by id .get(id)
router.get("/:id", validateAction, (req, res) => {
  Actions.get(req.params.id)
    .then(actionFound => {
      res.status(200).json(actionFound);
    })
    .catch(error => {
      res.status(500).json({ errror: "Error getting action" });
    });
});

// checked - update action by id .update(id, changes)
router.put("/:id", validateAction, (req, res) => {
  Actions.update(req.action.id, req.body)
    .then(changes => {
      res.status(200).json(changes);
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating action" });
    });
});

// checked - delete action by id .remove(id)
router.delete("/:id", validateAction, (req, res) => {
  Actions.remove(req.action.id)
    .then(count => {
      res.status(200).json({ message: "Action has been deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "Error deleting action" });
    });
});

// checked - validate action id exists
function validateAction(req, res, next) {
  Actions.get(req.params.id)
    .then(actionFound => {
      if (actionFound) {
        req.action = actionFound;
        next();
      } else {
        res.status(400).json({ error: "This action doesn't exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error validating action ID" });
    });
}

module.exports = router;