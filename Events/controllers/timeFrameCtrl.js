const xlsx = require('xlsx');
const fs = require('fs');
const { emptyDir } = require('fs-extra');
const Dates = require('../model/dates')
const moment = require('moment');
const dayjs = require('dayjs')
const {mailSysForBirthday,mailSysForWorkAnniversary} = require('../utils/mailSys')

const populateDB = async (req, res) => {
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



const isUpcomingEventWithinLimit = (eventDate, todayDate, extend) => {
  const date = new Date(eventDate);
  const today = new Date(todayDate);
  const limit = new Date(today);
  limit.setDate(today.getDate() + extend);
  const birthDay = date.getDate();
  const birthMonth = date.getMonth();

  if (birthMonth === today.getMonth() && birthMonth === limit.getMonth()) {
    return birthDay >= today.getDate() && birthDay <= limit.getDate();
  }
  if (birthMonth === today.getMonth() && birthMonth === limit.getMonth()) {
    return birthDay >= today.getDate() && birthDay <= limit.getDate();
  }
  if (birthMonth === today.getMonth()) {
    return birthDay >= today.getDate();
  }
  if (birthMonth === limit.getMonth()) {
    return birthDay <= limit.getDate();
  }
  const overflown = limit.getFullYear() > today.getFullYear();
  if (overflown) {
    return birthMonth > today.getMonth() || birthMonth < limit.getMonth();
  }
  return birthMonth > today.getMonth() && birthMonth < limit.getMonth();
};


 
const getUpcomingBirthdays = async (req, res) => {
  try {
    const days = req.params.days;
    const today = new Date();
    // today.setDate(31);
    const employee = await Dates.find().sort({ dob: 1 });
    
    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      const eventDate = employee[i].dateOfBirth;
      
      switch (days) {
        case "1days":
           if(isUpcomingEventWithinLimit(eventDate,today,1)){
            ans.push(employee[i]);
            mailSysForBirthday(employee[i].employeeEmail,employee[i].employeeName)
           }
         
          break;
        case "7days":
  
           if(isUpcomingEventWithinLimit(eventDate,today,7)){
            ans.push(employee[i]);
           }
         
          break;
        case "14days":

          if(isUpcomingEventWithinLimit(eventDate,today,14)){
            ans.push(employee[i]);
           }
          
          break;
        case "1month":
          if(isUpcomingEventWithinLimit(eventDate,today,30)){
            ans.push(employee[i]);
           }
          break;
        case "6months":
          if(isUpcomingEventWithinLimit(eventDate,today,180)){
            ans.push(employee[i]);
           }
          break;

        default:
          if(isUpcomingEventWithinLimit(eventDate,today,365)){
            ans.push(employee[i]);
            
           }
          break;
      }
    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};


const getUpcomingAnniversary = async (req, res) => {
  
  try {
    const days = req.params.days;
    const today = new Date();
   
    const employee = await Dates.find({}).sort({ dob: 1 });
     
    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      var eventDate = employee[i].dateOfJoining;

      switch (days) {
        case "1days":
          if(isUpcomingEventWithinLimit(eventDate,today,1)){
           ans.push(employee[i]);
           mailSysForWorkAnniversary(employee[i].employeeEmail,employee[i].employeeName)
          }
        
         break;
        case "7days":
  
           if(isUpcomingEventWithinLimit(eventDate,today,7)){
            ans.push(employee[i]);
           }
         
          break;
        case "14days":

          if(isUpcomingEventWithinLimit(eventDate,today,14)){
            ans.push(employee[i]);
           }
          
          break;
        case "1month":
          if(isUpcomingEventWithinLimit(eventDate,today,30)){
            ans.push(employee[i]);
           }
          break;
        case "6months":
          if(isUpcomingEventWithinLimit(eventDate,today,180)){
            ans.push(employee[i]);
           }
          break;

        default:
          if(isUpcomingEventWithinLimit(eventDate,today,365)){
            ans.push(employee[i]);
           }
          break;
      }

    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};

module.exports= {populateDB,getUpcomingAnniversary,getUpcomingBirthdays}