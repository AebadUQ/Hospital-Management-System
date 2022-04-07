const express = require('express');
const router = express.Router();

const mysql = require('mysql');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'project'
});


router.get("/getPatient",(req,res)=>{
    const insert = "select * from patient";
    
    db.query(insert,(err,result)=>{
        res.send(result);
    });
});
router.get("/Dlist",(req,res)=>{
    const insert = "select drug_id,d_name from drugs";
    
    db.query(insert,(err,result)=>{
        res.send(result);
    });
});
router.get("/DoctorId",(req,res)=>{
    const insert = "select d_id from doctor";
    
    db.query(insert,(err,result)=>{
        res.send(result);
    });
});
router.get("/getBill",(req,res)=>{
    var array = req.query.array;
    const getPrice = "select * from drugs where d_name =  " + mysql.escape(array)   ;

    db.query(getPrice,(err,result)=>{
        res.send(result);
    })
});
router.get("/getRoom",(req,res)=>{
    const Room = "select room_id,status from room where status= 'A' ";

    db.query(Room,(err,result)=>{
        res.send(result);
    })
})
router.post("/Booking",(req,res)=>{
    const rid = req.body.rid;
    const id  = req.body.id;
    // console.log(rid,id)
    const book  = "update room set status = 'N',pat_id = " + mysql.escape(id) + " where room_id = " + mysql.escape(rid);

    db.query(book,(err,result)=>{

    })
 })
router.post("/RoomType",(req,res)=>{
    const type = req.body.type;
    // console.log(type);
    const row = "insert into room (room_type,status) value (?,?);";
    db.query(row,[type,'A'],(err,result)=>{
    })
})
router.get("/getDoctor",(req,res)=>{
    const insert = "select * from doctor";
    
    db.query(insert,(err,result)=>{
        res.send(result);
    });
});
router.get("/getDrug",(req,res)=>{
    const insert = "select * from drugs";
    
    db.query(insert,(err,result)=>{
        res.send(result);
    });
});

router.get("/DoctorGetPatient",(req,res)=>{

    const pid = "select pid from patient";
    db.query(pid,(err,result)=>{
        res.send(result);
    })
})
router.get("/DoctorGetPatientDetail",(req,res)=>{

    const id = req.query.id;
    
    const pid = "select * from patient where pid = " + mysql.escape(id)   ;
    db.query(pid,(err,result)=>{
        res.send(result);
    })
})
router.get("/",(req,res)=>{
    res.send("Backend started!")
})
router.get("/Roomlist",(req,res)=>{
    const sll = "select * from room ";
    db.query(sll,(err,result)=>{
        res.send(result)
        // console.log(result)
    })
})
router.get("/Showbill",(req,res)=>{
    const sll = "select * from bill where num_days is not null and doctor_charges is not null and drug_charges is not null";
    db.query(sll,(err,result)=>{
        res.send(result)
        // console.log(result);
    })
})
router.get("/Getlab",(req,res)=>{
    const sll = "select * from labreport";
    db.query(sll,(err,result)=>{
        res.send(result)
    })
})
router.post("/Patient",(req,res)=>{

    const name = req.body.Name;
    const date = req.body.Date;
    const address = req.body.Address;
    const sex = req.body.Sex;
    const contact = req.body.Contact;
    const insert = "insert into patient (name,date_admitted,address,sex,contact) values (?,?,?,?,?);"
    db.query(insert,[name,date,address,sex,contact] , (err,result)=>{
        const getPid = "select pid from patient where contact= " + mysql.escape(contact); 
        db.query(getPid,(err,result)=>{
            result=JSON.parse(JSON.stringify(result[0]))
            const p = result.pid;
            const Fillbill = "insert into bill (pid) values (?);"
            db.query(Fillbill ,[p],(err,resultt)=>{
                console.log("Done Billing")
            })
        })
    }
    )

})
router.post("/Doctor",(req,res)=>{

    const name = req.body.Name;
    const dept = req.body.Department;
    const insert = "insert into doctor (d_name,dept) values (?,?);"
    db.query(insert,[name,dept] , (err,result)=>{
    })
})
router.post("/RoomUpdate",(req,res)=>{

    const id = req.body.id;
    console.log(id);
    const insert = "update room set status = 'A' , pat_id = NULL where pat_id = " + mysql.escape(id) ;
    db.query(insert, (err,result)=>{
        // console.log("room")
    })
})
router.post("/Numdays",(req,res)=>{

    const id = req.body.id;
    const insert = "update bill set num_days = (select datediff(current_date(),date_admitted) from  project.patient where pid= "+mysql.escape(id) + ") where pid = " + mysql.escape(id) ;
    db.query(insert, (err,result)=>{
    })
})
router.post("/Genlab",(req,res)=>{

    const id = req.body.id;
    const d = req.body.d;
    const dia = req.body.dia;
    var date = new Date();
    // console.log(id,d,dia)
    const insert = "insert into labreport (p_id,diagnosis,date,doc_id) values (?,?,?,?);"

    db.query(insert,[id,dia,date,d] ,(err,result)=>{
        console.log("wroking")
    })
})
router.post("/Filldrugprice",(req,res)=>{

    const id = req.body.id;
    const doc = req.body.doc;
    const dp = req.body.dp;
    const total = req.body.total;
    
    const insert = "update bill set doctor_charges =  " + mysql.escape(doc) + ", drug_charges = " + mysql.escape(dp) + ", total = " + mysql.escape(total) + " where pid = " + mysql.escape(id); 
    db.query(insert,(err,result)=>{
        // console.log("working")
    })
})
router.post("/Drug",(req,res)=>{
    const id = req.body.id;
    const name = req.body.Name;
    const price = req.body.Price;
    const insert = "insert into drugs (drug_id,d_name,price) values (?,?,?);"
    db.query(insert,[id,name,price] , (err,result)=>{
    })
})

module.exports = router;
