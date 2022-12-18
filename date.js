module.exports.GetDate = function () {
  let today = new Date();
  //3rd part it as
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};

module.exports.GetDay =function () {
    let today = new Date();
    //3rd part it as
    var options = {
      weekday: "long",
    };
  
    return today.toLocaleDateString("en-US", options);
  };

//   var currentDay=today.getDay();
//   var day = "";

//!st part
//   if (today.getDay() === 6 || today.getDay() === 0) {

//     day = "weekend";
//   } else {
//     // res.write('<h1>Need to hold on</h1>');
//     // res.write('<p>Happy faces</p>');
//     // res.send();

//     // res.sendFile(__dirname+'/index.html');

//     day = "Weekday";
//   }
//   res.render("list", { kindofDay: day });

//2nd part
// switch(currentDay){
//     case 0:{
//         day="Sunday";
//         break;
//     }
//     case 1:{
//         day="Mon";
//         break;
//     }
//     case 2:{
//         day="Tuesday";
//         break;
//     }
//     case 3:{
//         day="WEd";
//         break;
//     }
//     case 4:{
//         day="Thurday";
//         break;
//     }
//     case 5:{
//         day="Friday";
//         break;
//     }
//     case 6:{
//         day="saturaday";
//         break;
//     }

// }
