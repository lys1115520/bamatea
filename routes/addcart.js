const express=require("express")
const router=express.Router();
const pool=require("../pool")

//app.use("/details",Details)
//服务端接口地址http://localhost:3000/details
//客户端请求时:
//http://localhost:3000/details?lid=1
router.get("/",(req,res)=>{
  var lid=req.query.lid;
  var uid=req.query.uid;
  var pic=req.query.pic;
  var titles=req.query.titles;
  var price=req.query.price;
  var lcount=req.query.lcount;
    var sql1=`select * from bm_cart where lid=?`;
    pool.query(sql1,[lid],(err,result)=>{
        if(err) console.log(err);
          
        if(result.length>0){
            res.send(result)
            console.log(result); 
        }else{
            var sql2=`INSERT INTO bm_cart VALUES (null,?,?,?,?,?,?)`;
            pool.query(sql2,[lid,uid,titles,price,pic,lcount],(err,result)=>{
                if(err)console.log(err);
                console.log(result.affectedRows);//.affectedRows
                res.send(result)
            });
        }
    })
    //
})

module.exports=router;
