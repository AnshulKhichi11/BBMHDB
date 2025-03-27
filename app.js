const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Appointment = require("./models/appointment");
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");
const { error } = require("console");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//session
app.use(
    session({
      secret: "yourSecretKey",
      resave: false,
      saveUninitialized: true,
    })
  );
  
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BangerDB');
}

app.get("/",(req,res) =>{
    res.render("index.ejs");
})

app.get("/blogs", (req,res) =>{
    res.render("blogs.ejs");
})

app.get("/news", (req,res) =>{
    res.render("news.ejs");
})

app.get("/aboutBBMH", (req,res) =>{
    res.render("about.ejs");
})

app.get("/doctors", (req,res) =>{
    res.render("doctors.ejs");
});

app.get("/empanelments", (req,res) =>{
    res.render("empalenments.ejs");
});

app.get("/specialities", (req,res) =>{
    res.render("specialities.ejs");
});


app.get("/ent", (req,res) =>{
    res.render("ent.ejs");
});

app.get("/Gynecology", (req,res) =>{
    res.render("Gynecology.ejs");
});

app.get("/Gastrology", (req,res) =>{
    res.render("Gastrology.ejs");
});


app.get("/Neurosurgery", (req,res) =>{
    res.render("Neurosurgery.ejs");
});

app.get("/JointReplacement", (req,res) =>{
    res.render("JointReplacement.ejs");
});

app.get("/OrthoPedic", (req,res) =>{
    res.render("OrthoPedic.ejs");
});

app.get("/Plasticsurgery", (req,res) =>{
    res.render("Plasticsurgery.ejs");
});

app.get("/SportsInjuries", (req,res) =>{
    res.render("SportsInjuries.ejs");
});

app.get("/Urology", (req,res) =>{
    res.render("Urology.ejs");
});

app.get("/appointment", (req,res) =>{
    try{
        res.render("appointment.ejs");
    }
    catch(error){
        console.log(error);
    }
    
});



app.post("/appointments", async (req, res) => {
  try {
      const newAppointment = new Appointment(req.body.appointment);
      await newAppointment.save();

      res.render("rating.ejs" , {newAppointment});
  } catch (err) {
      console.error(err);
      res.status(500).send("Error saving appointment");
  }
});

app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.render("appointments.ejs", { appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).send("Error fetching appointments");
  }
});


app.post("/appointments/:id/rating", async (req, res) => {
  try {
      const { id } = req.params;
      const { rating } = req.body; 

      // Update the appointment with the new rating
      await Appointment.findByIdAndUpdate(id, { rating });
      req.flash("success", "Rating saved successfully!");
      res.redirect("/appointments"); 
  } catch (err) {
      console.error("Error saving rating:", err);
      req.flash("error", "Failed to save rating.");
      res.redirect("/appointments");
  }
});


  app.delete("/appointments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Appointment.deleteOne({ _id: id });
      req.flash("success", "Appointment deleted successfully!");
      res.redirect("/appointments");
    } catch (err) {
      console.error("Error deleting appointment:", err);
      req.flash("error", "Failed to delete appointment.");
      res.redirect("/appointments");
    }
  });

const port = 3000;
app.listen(port , (req , res) =>{
    console.log(`app working at ${port}`);
})