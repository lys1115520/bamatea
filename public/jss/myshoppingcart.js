$(function(){	
	////////////////////////////////加载购物车数据/////////////////////////////
	var uid=localStorage.getItem("uid");//获取浏览器的缓存数据
    if(uid!==undefined){
        $.ajax({
            url:"http://127.0.0.1:3000/cart",
            type:"get",
            data:{uid},
            dataType:"json",
			success:function(result){
				//console.log(result)
				var html1="";
                for(var pro of result){
                    html1+=`<div class="pro_list p-l-10" data-pcartid="${pro.cart_productid}">
					<div>
						<input class="chbChild prochbChild" type="checkbox" checked>
					</div>
					<div>
						<img src="${pro.pic}" alt="" width="80px">
					</div>
					<div class="w-200">
						<a href="#">
							${pro.titles}
						</a>
					</div>
					<div>
						<p>属性 ： 主商品 </p>
					</div>
					<div>
						￥<span class="price">${pro.price.toFixed(2)}</span>元
					</div>
					<div class="num-text">
						<div class="proCount">
							<a href="javascript:;">-</a>
							<input type="text" class="newcount" value="${pro.lcount}">
							<a href="javascript:;">+</a>
						</div>
						<p>有货</p>
					</div>
					<div style="color: red">￥<b class="singlemoney">${(pro.lcount*pro.price).toFixed(2)}</b>元</div>
					<div class="p-r-10">
						<a class="delete" href="javascript:;" disabled>删除</a><br>
						<a href="javascript:;">移动到我的关注</a>
					</div>
					</div>`; 
                    //console.log(dp);
                };
				$(".tbody").html(html1);
				 ////////////////////////////////////全选框//////////////////////////////////////
				// 设置两个全选框的属性值与子复选框一致
				var $chbChild=$("input.chbChild");
				let $chbAll=$("input.chbAll");
				var $allMoney=$("#allMoney");
				var $singLemoney=$(".singlemoney");
				//var a=$singLemoney[1].html()*1
				//console.log(a)
				//计算小计功能
				function sglmoney(){
					var $price=$(".price");
					var $newcount=$(".newcount");
					$newcount.each(function(index,item) {
						$(this).parents(".num-text").next().children().html(
							$(this).parents(".num-text").prev().children().html()*$(this).val()
						);
					});
					// for(var i=0;i<$price.length;i++){
					// 	var xiaoji=$price[i].html()*$newcount[i].val();
					//  	$singLemoney[i].html(xiaoji.toFixed(2));
					// }
					// console.log($price)
					 //$price.each(function(index,element){
					 //	 var xiaoji=$(this).html()*$newcount[index].html();
					 //	 $singLemoney[index].html(xiaoji.toFixed(2));

					 //	console.log($newcount[1])
					//});
				}
				sglmoney();
				//计算小计功能
				//粉装总计代码复用			
				function allmoney(){	
					var $chbChildchecked=$("input.prochbChild");
					//console.log($chbChildchecked[0])
					//console.log($singLemoney[0])
					var sum=0;
					var array=new Array;
					$singLemoney.each(function(index,element){
						if($chbChildchecked[index].checked){
							array.push($(this).html()*1);
						}
						//console.log(index)
					});
					//console.log(array)
					for(var p of array){
						sum+=p;
					}
					$allMoney.html(sum.toFixed(2));
				}
				allmoney();
				//
				$chbAll.click(function(){ 
					$chbChild.prop('checked',$(this).prop('checked'));
					$chbAll.prop('checked',$(this).prop('checked'));
					allmoney();
				})
				//子复选框点击判断其他子复选框是否全部选中 如果全选中修改全选框为选中否则全选框不选中
				$chbChild.click(function(){
					console.log(111);	
					var len=$(".chbChild:checked").length;
					if(len==$chbChild.length){
						$chbAll.prop('checked',true);
						allmoney();
					}else{
						$chbAll.prop('checked',false);
						allmoney();
					};
				});
				//数量加减功能
				var $CountBtns=$(".proCount a");
				$CountBtns.click(function(){
					var $pcount=$(this).parent().children(["input"])
					//console.log($pcount) 
					if($(this).html()=="+"){
						//console.log($(this))
						$pcount.val($pcount.val()*1+1)
						sglmoney();
						allmoney();
						//$pcount.val($pcount.val()*1+1)
					}else if($(this).html()=="-"){
						if($pcount.val()>1){
							$pcount.val($pcount.val()-1)
							sglmoney();
							allmoney();
						}
					}
				})  
				//数量加减功能
				
				///////////////////////////

			},
		});

    }else{
		alert("您还未登陆请先登录");
		$(window).attr('location','./login.html');
	};
	
});



////////////////////////////////////删除按钮/////////////////////////////////////////
//获取删除按钮点击删除所在的div
let $deleteA=$("a.delete");
$deleteA.attr("disabled",true);
$deleteA.css("pointer-events","none");
var $chbChild=$("input.chbChild");
//for(var chb of $chbChild.keys()){}

///////////////////////////////////////////////////////
$("a.delete").click(function(){
	var $a=$(this);
	$(".confirmBack").show();
	$(".confirmBox").show();
	// $a.parent().parent().remove();
});
$(".deleteNo").click(function(){
	$(".confirmBack").hide();
	$(".confirmBox").hide();
});
$(".deleteYes").click(function(){
	$(".chbChild:checked")
	.parent().parent().remove();
	$(".confirmBack").hide();
	$(".confirmBox").hide();
});













