$(function(){
    var lid=location.search.split("=")[1];
    if(lid!==undefined){
        $.ajax({
            url:"http://127.0.0.1:3000/details",
            type:"get",
            data:{lid},
            dataType:"json",
            success:function(result){  
                //console.log(result);
                var{product,pics,dtlpics}=result;
                var{titles,price,lcount,cname}=product;
                $(".p-title").html(titles);
                $("#p-cname").html(cname);
                $("#p-price").html(`￥${price.toFixed(2)}元`);
                //商品详情页
                var html2="";
                for(var dp of dtlpics){
                    html2+=`<img src="${dp.psrc}" alt="">`; 
                    //console.log(dp);
                };
                $(".product_imgs").html(html2);
                //放大镜小图片
                var html="";
                for(var p of pics){
                    html+=`<li><img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}"width="50px" alt=""></li>`;
                };
                var $ul=$("#ulImgs").html(html).css("width",pics.length*58);
                //图片旁边的左右键
                var moved=0;
                var $btnLeft=$("#btn-left");
                var $btnRight=$("#btn-right");
                //console.log(pics.length);
                if(pics.length<=6){
                    $btnRight.prop('disabled',true);};
                $btnRight.click(function(){
                    var $this=$(this);
                    if($this.is(":not(.disabled)")){
                        moved++;
                        $ul.css("margin-left",-58*moved);
                        $btnLeft.removeClass("disabled");
                        if(moved==pics.length-4){
                            $this.addClass("disabled");
                        }
                    }
                });    
                $btnLeft.click(function(){
                    var $this=$(this);
                    if($this.is(":not(.disabled)")){
                      moved--;
                      $ul.css("margin-left",-62*moved);
                      $btnRight.removeClass("disabled");
                      if(moved==0){
                          $this.addClass("disabled");
                      }
                  }
                });
                // 切换图片利用冒泡事件代理ul绑定鼠标进入事件 
                var $mImg=$("#m-img");
                var $divLg=$("#bigImg");
                 $divLg.css("background-image","url("+pics[0].lg+")");
                $mImg.attr("src",pics[0].md);
                $ul.on(
                    "mouseenter",
                    "li>img",
                    function(){
                        var $img=$(this);
                        var src=$img.attr("data-md");
                        $mImg.attr({src});
                        var src=$img.attr("data-lg");
                        $divLg.css("background-image","url("+src+")");
                    }
                );
                //鼠标进入中图片显示半透明遮罩层
                var $mask=$("#mask");
                var $superMask=$("#supper_mousetrap");
                var maskSize=176;
                $superMask.mouseenter(function(){
                    $mask.css("display","block");
                    $divLg.css("display","block");
                })
                .mouseleave(function(){
                    $mask.css("display","none");
                    $divLg.css("display","none");
                })
                .mousemove(function(e){
                    var left=e.offsetX-maskSize/2;
                    var top=e.offsetY-maskSize/2;
                    if(left<0){
                        left=0;
                      }else if(left>176){
                        left=176;
                      }
                      if(top<0){
                        top=0;
                      }else if(top>176){
                        top=176;
                      }
                      $mask.css({left,top});
                      $divLg.css("background-position",`${-left*2}px ${-top*2}px`)
                });
            //数量加减功能
            var $CountBtns=$("#proCount span");
            var $pcount=$("#lcount");
        
            $CountBtns.click(function(){
                //var lcount=$pcount.val(); 
                if($(this).html()=="+"){
                    $pcount.val($pcount.val()*1+1)
                }else if($(this).html()=="-"){
                    if($pcount.val()>=1){ 
                        $pcount.val($pcount.val()-1)
                    }
                };
            })  
            //数量加减功能
            //添加购物车功能
            var $addcart=$("#addcart");
            var uid=localStorage.getItem("uid");//获取浏览器的缓存数据
            var pic=pics[0].sm;
            var lcount=$pcount.val();
            $addcart.click(function(){
                if(uid!=null){
                //console.log(price.toFixed(2));
                //console.log(lcount);
                $.ajax({
                    url:"http://127.0.0.1:3000/addcart",
                    type:"get",
                    data:{lid,uid,pic,titles,price,lcount},
                    dataType:"json",
                    success:function(result){
                        //console.log(result)
                        if(result.length>0){
                            alert("购物车已加入该商品")
                        }else{
                            //console.log(result)
                            alert("成功加入购物车");
                        }
                    },  
                });
                }else{
                    alert("请先登录");
                }
            });    
            //添加购物车功能
            
            //点击购买功能
            var $gocart=$("#gocart");
            $gocart.click(function(){
                if(uid!=null){
                //console.log(price.toFixed(2));
                //console.log(lcount);
                $.ajax({
                    url:"http://127.0.0.1:3000/addcart",
                    type:"get",
                    data:{lid,uid,pic,titles,price,lcount},
                    dataType:"json",
                    success:function(result){
                        //console.log(result)
                        if(result.length>0){
                            //alert("购物车已加入该商品")
                            $(window).attr('location','myshoppingcart.html');
                        }else{
                            //console.log(result)
                            $(window).attr('location','myshoppingcart.html');
                            //alert("成功加入购物车");
                        }
                    },  
                });
                }else{
                    alert("请先登录");
                }
            });    
            //点击购买功能

            }
        });
    }else{
        console.log("请输入id")
    }
    

    //添加购物车功能
    
    //添加购物车功能
});
