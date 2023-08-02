const xlsx = require('xlsx');
const fs = require('fs');

const Dates = require('../model/dates')

const dayjs = require('dayjs')


const populateDB = async (req, res) => {
  console.log("In Populate DB")
  const pathToSheet = req.file.path;
  const workbook = xlsx.readFile(pathToSheet);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

  try {
    for (const data of jsonData) {
      const dateOfBirth = dayjs(data['Date of Birth'], 'YYYY/M/D', true);
      const dateOfJoining = dayjs(data['Date of Joining'], 'YYYY/M/D', true);
      

      if (!dateOfBirth.isValid()) {
        console.error('Invalid date format for dateOfBirth:', data['Date of Birth']);
        continue;
      }

      if (!dateOfJoining.isValid()) {
        console.error('Invalid date format for dateOfJoining:', data['Date of Joining']);
        continue;
      }

      const employeeId = data['Employee ID'];
      const existingEmployee = await Dates.findOne({ employeeId });

      if (existingEmployee) {
        // Update the existing employee document
        existingEmployee.employeeName = data['Employee Name'];
        existingEmployee.employeeEmail = data['Employee Email'];
        existingEmployee.dateOfBirth = dateOfBirth.add(1, 'day').toDate();
        existingEmployee.dateOfJoining = dateOfJoining.add(1, 'day').toDate();
        existingEmployee.favouriteColour = data['favourite Colour'];
        existingEmployee.favouriteFood = data['favourite food'];
        existingEmployee.placeOfInterest = data['Place of interest'];
        existingEmployee.gender = data['Gender'];
       
        await existingEmployee.save();
      } else {
        // Create a new employee document
        const employee = new Dates({
          employeeId,
          employeeName: data['Employee Name'],
          employeeEmail: data['Employee Email'],
          dateOfBirth: dateOfBirth.add(1, 'day').toDate(),
          dateOfJoining: dateOfJoining.add(1, 'day').toDate(),
          favouriteColour: data['favourite Colour'],
          favouriteFood: data['favourite food'],
          placeOfInterest: data['Place of interest'],
          gender: data['Gender']
        
        });

        await employee.save();
      }
    }

    fs.unlink(pathToSheet, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    console.log('Data inserted into MongoDB.');
    res.send('Data inserted into MongoDB.');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    res.status(500).send('An error occurred while inserting data into MongoDB.');
  }
};



module.exports= {populateDB}