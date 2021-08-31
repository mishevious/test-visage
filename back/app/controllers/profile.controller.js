const db = require("../models");
const Profile = db.profile;
const Op = db.Sequelize.Op;
const { v4 } = require('uuid');

exports.create = (req, res) => {
  console.log('req : ', req.body)
  if (!req.body.jobTitle || !req.body.name || !req.body.pdf|| !req.body.bonusToken) {
    res.status(400).send({
      message: "Name, job and pdf are required."
    });
    return;
  }

  const profile = {
    jobTitle: req.body.jobTitle,
    name: req.body.name,
    notes: req.body.notes,
    pdf: req.body.pdf,
    bonusToken: req.body.bonusToken
  };

  Profile.create(profile)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the profile."
    });
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Profile.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving profiles."
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Profile.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Profile with id=${id}.`
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Profile.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Profile was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Profile with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating Profile with id=${id}.`
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Profile.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Profile was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not delete Profile with id=${id}.`
    });
  });
};

exports.uploadPdf = (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  const file = req.files.file;
  console.log('file,', file)

  const name = v4();

  const dir = 'public/pdf'

  file.mv(`${process.env.APPDIR}/${dir}/${name}.pdf`, (err) => {
    if (err) {
      return res.status(500).send({ msg: "Error occured" });
    }
    // Need to configure env to get the path
    return res.send({name: name, path: `http://localhost:3000/pdf/${name}.pdf`});
  });
}